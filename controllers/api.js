const BASE64 = { width: 0, height: 0 };
exports.install = function() {
    ROUTE('-POST     /api/login/ *Login --> exec');
		// Common
	ROUTE('+GET      /logoff/', logoff);
		// Uploads
	ROUTE('FILE      /api/upload/',upload, 1024 * 5); // 5 MB
	ROUTE('FILE      /api/upload/photo/',   upload_photo,1024 * 5); // 5MB
	ROUTE('FILE      /api/upload/base64/',  upload_base64, 1024 * 5); // 5 MB
	ROUTE('FILE      /download/', file_read);
		// Users
	ROUTE('POST      /api/account/        *Account     --> save');
	// Channels (SA)
	ROUTE('POST      /api/channels/        		*Channel     --> save');
	ROUTE('DELETE    /api/channels/{id}/        *Channel     --> remove');
	ROUTE('POST      /api/blacklist/', json_blacklist);
		// Messages
	ROUTE('GET       /api/messages/{id}/ *Message --> query');
	ROUTE('GET       /api/files/{id}/    *Message --> files' );

		// Favorites
	ROUTE('GET       /api/favorites/          *Favorite  --> query');
	ROUTE('POST      /api/favorites/          *Favorite  --> save');
	ROUTE('DELETE    /api/favorites/{id}/     *Favorite  --> remove');

		// Tasks
	ROUTE('GET       /api/tasks/         *Task  --> query');
	ROUTE('POST      /api/tasks/         *Task   --> save');
	ROUTE('GET       /api/tasks/{id}/     *Task  --> exec');

		// Users (SA)
	ROUTE('GET      /api/users/        *User     --> query');
	ROUTE('-POST     /api/users/        *User     --> save');
	ROUTE('-POST     /api/users/otp/    *User     --> otp');
	ROUTE('GET      /api/users/{id}/   *User     --> read');
	ROUTE('DELETE   /api/users/{id}/   *User     --> remove');
};

function profile(){
    var self = this;
    var profile = {
        "id" : 1, 
        "firstname" : "Louis",
        "lastname" : "Bertson",
        "email" : "louisbertson@gmail.com",
        "image" : "/img/bugatti.jpg"
    }
    self.json(profile);
};

function file_read(req, res) {

	var id = req.split[1].replace('.' + req.extension, '');
	res.noCompress = true;

	F.exists(req, res, function(next, filename) {
		NOSQL('files').counter.hit('read');
		NOSQL('files').binary.read(id, function(err, stream, header) {

			if (err) {
				next();
				return res.throw404();
			}

			var writer = require('fs').createWriteStream(filename);

			CLEANUP(writer, function() {
				res.file(filename, req.extension === 'js' || req.extension === 'css' || req.extension === 'jpg' || req.extension === 'jpeg' || req.extension === 'png' || req.extension === 'gif' ? undefined : header.name);
				next();
			});

			stream.pipe(writer);
		});
	});
}


function upload() {

	var self = this;
	var id = [];

	self.files.wait(function(file, next) {
		file.read(function(err, data) {

			// Store current file into the HDD
			file.extension = U.getExtension(file.filename);
			var filename = NOSQL('files').binary.insert(file.filename, data) + '.' + file.extension;
			id.push({ url: '/download/' + filename, filename: file.filename, width: file.width, height: file.height });
			NOSQL('files').counter.hit('write');
			// Next file
			setTimeout(next, 100);
		});

	}, () => self.json(id));
}

function upload_base64() {
	var self = this;

	if (!self.body.file) {
		self.json(null);
		return;
	}

	var type = self.body.file.base64ContentType();
	var ext;

	switch (type) {
		case 'image/png':
			ext = '.png';
			break;
		case 'image/jpeg':
			ext = '.jpg';
			break;
		case 'image/gif':
			ext = '.gif';
			break;
		default:
			self.json(null);
			return;
	}

	var data = self.body.file.base64ToBuffer();
	BASE64.filename = 'clipboard' + ext;
	BASE64.url = '/download/' + NOSQL('files').binary.insert(BASE64.filename, data) + ext;
	NOSQL('files').counter.hit('write');
	self.json(BASE64);
}

function upload_photo() {
	var self = this;
	var file = self.files[0];

	if (file.isImage()) {
		var id = Date.now().toString();
		file.image().make(function(builder) {
			builder.resizeAlign(150, 150, 'center');
			builder.quality(95);
			builder.save(PATH.public('/photos/{0}.jpg'.format(id)), () => self.json(id));
		});
	} else
		self.invalid().push('error-user-photo');
}
function json_blacklist() {
	var self = this;
	if (self.body instanceof Array) {
		self.user.blacklist = {};
		for (var i = 0, length = self.body.length; i < length; i++) {
			var id = self.body[i];
			if (id.isUID()) {
				self.user.blacklist[id] = true;
				self.user.unread[id] && (delete self.user.unread[id]);
			}
		}
		OPERATION('users.save', NOOP);
	}
	self.json(SUCCESS(true));
}
function logoff() {
	this.cookie(CONF.cookie, '', '-1 day');
	this.redirect('/');
}
