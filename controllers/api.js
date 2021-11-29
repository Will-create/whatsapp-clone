const db = MAIN.openDB;
const db2 = MAIN.openDB2;

exports.install = function(){
    ROUTE('GET /api/profile/',profile);
    ROUTE('GET /opendb/',db_connect);
    ROUTE('+POST      /api/v1/messages/new/    *Messages --> insert');
    ROUTE('+GET      /api/v1/messages/sync/    *Messages --> query');
     
}
const BASE64 = { width: 0, height: 0 };

exports.install = function() {

    ROUTE('-POST /api/login/ *Login --> exec');

		// Common
	ROUTE('+GET /logoff/', logoff);

		// Uploads
	ROUTE('/api/upload/',upload, 1024 * 5); // 5 MB
	ROUTE('/api/upload/photo/',   upload_photo,1024 * 5); // 5MB
	ROUTE('/api/upload/base64/',  upload_base64, 1024 * 5); // 5 MB

		// Users
	ROUTE('/api/account/',        json_save,     ['*Account', 'post']);

		// Channels (SA)
	ROUTE('/api/channels/',       json_save,     ['*Channel', 'post']);
	ROUTE('/api/channels/{id}/',  json_remove,   ['*Channel', 'delete']);
	ROUTE('/api/blacklist/',      json_blacklist,['post']);

		// Messages
	ROUTE('/api/messages/{id}/',  json_query,    ['*Message']);
	ROUTE('/api/files/{id}/',     json_files,    ['*Message']);

		// Favorites
	ROUTE('/api/favorites/',      json_query,    ['*Favorite']);
	ROUTE('/api/favorites/',      json_save,     ['*Favorite', 'post']);
	ROUTE('/api/favorites/{id}/', json_remove,   ['*Favorite', 'delete']);

		// Tasks
	ROUTE('/api/tasks/',          json_query,    ['*Task']);
	ROUTE('/api/tasks/',          json_save,     ['*Task', 'post']);
	ROUTE('/api/tasks/{id}/',     json_exec,     ['*Task']);

		// Users (SA)
	ROUTE('/api/users/',          json_query,    ['*User']);
	ROUTE('/api/users/',          json_save,     ['*User', 'post']);
	ROUTE('/api/users/{id}/',     json_read,     ['*User']);
	ROUTE('/api/users/{id}/',     json_remove,   ['*User', 'delete']);

	F.file('/download/', file_read);
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

function db_connect(){
    var self = this;
    db2.rpc({db : "users", type : "find",filter : "true"},function(err, res){
        if(err) 
            console.log(err);
        self.json(res);
    })
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

function logoff() {
	this.cookie(CONF.cookie, '', '-1 day');
	this.redirect('/');
}
