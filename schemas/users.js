NEWSCHEMA('User',function(schema) {

	schema.define('id', 'UID');
	schema.define('name', 'String(50)', true);
	schema.define('phone', 'Phone', true);
	schema.define('status', 'Object');
	schema.define('passcode', 'String(50)');
	schema.define('picture', 'String(30)');
	schema.define('channels', 'Object');
	schema.define('contacts', 'Object');
	schema.define('blocked', Boolean);
	schema.define('notifications', Boolean);
	schema.define('sa', Boolean);

	schema.setSave(function($,model) {
		var get_user = MAIN.newusers.findItem('phone',model.phone);
        if(get_user){
			var otp = get_user.otp;
			console.log(otp);
			console.log(model);
			if(otp !== model.passcode){
				$.invalid('error','Code de Confirmation incorrect');
			}else{
				var tmp;
		if(model.id) {
			tmp = MAIN.users.findItem('id', model.id);
			tmp.name = model.name;
			tmp.phone = model.phone;
			tmp.picture = model.picture;
			tmp.blocked = model.blocked;
			var linker = model.name.slug(); // beacause of unicodes (e.g. Chinese chars)
			linker && (tmp.linker = linker);
			tmp.channels = model.channels;
			tmp.passcode = model.passcode;
			tmp.contacts = model.contacts;
			tmp.status = model.status;
			tmp.notifications = model.notifications;
			tmp.channels && MAIN.channels.forEach(n => tmp.unread[n.id] && (delete tmp.unread[n.id]));
			tmp.sa = model.sa;
		} else {
			tmp = model;
			tmp.id = UID();
			tmp.dtcreated = F.datetime;
			tmp.unread = {};
			tmp.passcode = '';
			tmp.status = {};
			tmp.picture = '/img/bugatti.jpg';
			tmp.recent = {};
			tmp.contacts = {};
			tmp.lastmessages = {};
			tmp.online = false;
			tmp.linker = model.name.slug();
			tmp.sa = model.sa;
			tmp.theme = 'dark';
			MAIN.users.push(tmp);
		}

		!tmp.linker && (tmp.linker = U.GUID(10));
		var index = MAIN.users.findIndex(n => n.id !== tmp.id && n.linker === tmp.linker);
		index !== -1 && (tmp.linker += U.GUID(3));
		MAIN.users.quicksort('name');
		MAIN.refresh && MAIN.refresh();
		OPERATION('users.save', NOOP);
		$.callback(SUCCESS(true));
		}
		}else{
			
		}
	});

    
	schema.setGet(function(error, model, options, callback, controller) {
		if (!controller.user.sa) {
			error.push('error-user-privileges');
			return callback();
		}
		var item = F.global.users.findItem('id', controller.id);
		!item && error.push('error-user-404');
		callback(item);
	});
	schema.setRemove(function(error, options, callback, controller) {
		if (!controller.user.sa) {
			error.push('error-user-privileges');
			return callback();
		}
		F.global.users = F.global.users.remove('id', controller.id);
		F.global.refresh && F.global.refresh();
		OPERATION('users.save', NOOP);
		callback(SUCCESS(true));
	});

	schema.addWorkflow('otp',function($,model){
		var user = MAIN.newusers.findItem('phone', model.phone);
		if(user){
			var new_otp = U.random_number(6);
		    user.otp = new_otp;
			//resend otp confirmation code
			$.callback(user);
		}
        var otp = U.random_number(6);
		var new_user ={name : model.name, phone : model.phone,otp : otp};
		MAIN.newusers.push(new_user);
		console.log(MAIN.newusers);
		$.callback(new_user);
	});

});