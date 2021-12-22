const { F } = require("total4");

NEWSCHEMA('User',function(schema) {
	schema.define('id', 'UID');
	schema.define('name', 'String(50)');
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
			if(get_user.expired){
				$.invalid('error','Code expired');
				return;
			}
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
			!tmp.linker && (tmp.linker = U.GUID(10));
			var index = MAIN.users.findIndex(n => n.id !== tmp.id && n.linker === tmp.linker);
			index !== -1 && (tmp.linker += U.GUID(3));
			$.cookie(CONF.cookie, ENCRYPT(tmp.id + '|' + $.ip + '|' + new Date().getTime()), '1 month');
			MAIN.users.quicksort('name');
			MAIN.refresh && MAIN.refresh();
			OPERATION('users.save', NOOP);
			//delelte otp data;
			var index = MAIN.newusers.findIndex('phone', tmp.phone);
				delete MAIN.newusers[index];
				console.log(MAIN.newusers);
			$.callback(SUCCESS(true));
		} else {
			tmp = model;
			tmp.id = id;
			tmp.dtcreated = F.datetime;
			tmp.unread = {};
			tmp.passcode = '';
			tmp.status = {};
			tmp.picture = '/img/bugatti.jpg';
			tmp.recent = {};
			tmp.contacts = {};
			tmp.channels = {};
			tmp.lastmessages = {};
			tmp.online = false;
			tmp.linker = model.name.slug();
			tmp.sa = model.sa;
			tmp.theme = 'dark';
			MAIN.users.push(tmp);
			!tmp.linker && (tmp.linker = U.GUID(10));
			var index = MAIN.users.findIndex(n => n.id !== tmp.id && n.linker === tmp.linker);
			index !== -1 && (tmp.linker += U.GUID(3));
			$.cookie(CONF.cookie, ENCRYPT(tmp.id + '|' + $.ip + '|' + new Date().getTime()), '1 month');
			MAIN.users.quicksort('name');
			MAIN.refresh && MAIN.refresh();
			OPERATION('users.save', NOOP);
			//delelte otp data;
			var index = MAIN.newusers.findIndex('phone', tmp.phone);
			delete MAIN.newusers[index];
			console.log(MAIN.newusers);
			$.callback(SUCCESS(true));
			
		}
		
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
			var index = MAIN.newusers.findIndex('phone', model.phone);
			delete MAIN.newusers[index];
			var new_otp = U.random_number(6);
		    user.otp = new_otp;
			user.ticks  = new Date().getTime();
			//resend otp confirmation code
			$.callback(user);
		}
		FUNC.appuser(model.phone,function (id) {  
			if(id === 0){
				$.invalid('exist','Ce numéro est déja un compte');
				return;
			}
			var otp = U.random_number(6);
			var new_user ={name : model.name, phone : model.phone,otp : otp,ticks : new Date().getTime()};
			MAIN.newusers.push(new_user);
			console.log(MAIN.newusers);
			$.callback(new_user);
		});
        
	});

	schema.addWorkflow('otp2',function($,model){
		var user = MAIN.logusers.findItem('phone', model.phone);
		if(user){
			var index = MAIN.logusers.findIndex('phone', model.phone);
			delete MAIN.logusers[index];
			var new_otp = U.random_number(6);
		    user.otp = new_otp;
		    user.ticks = new Date().getTime();
			user.expired = false;

			//resend otp confirmation code
			$.callback(user);
		}
		FUNC.appuser2(model.phone,function (id) {  
			if(id === 0){
				$.invalid('exist','Ce numéro n\'est pas un compte');
				return;
			}
			var otp = U.random_number(6);
			var new_user ={name : model.name,expired : false, phone : model.phone,otp : otp,ticks : new Date().getTime()};
			MAIN.logusers.push(new_user);
			console.log(MAIN.logusers);
			$.callback(new_user);
		});
        
	});

});