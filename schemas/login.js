NEWSCHEMA('Login',function(schema) {

	schema.define('phone', 'Phone', true);
	schema.define('passcode', 'String(6)', true);

	schema.addWorkflow('exec', function($,model) {
        console.log('Model :',model);
		var user = MAIN.users.findItem('phone', model.phone);
		
		if(!user){
			$.invalid('error','Compte inexistant!');
			return ;
		}
		var code = MAIN.logusers.findItem('phone',model.phone);
		if(code.expired){
			$.invalid('error','Code expiré');
			return;
		}
		code = code.otp;
        console.log('Code :',code);
		if(model.passcode !== code){
			$.invalid('error','Code de confirmation incorrect');
			return;
		}
		if (user.blocked){
			$.invalid('error-user-blocked');
			return ;
		}

		$.cookie(CONF.cookie, ENCRYPT(user.id + '|' + $.ip + '|' + F.datetime.getTime()), '1 month');
		var index = MAIN.logusers.findIndex('phone', user.phone);
		delete MAIN.logusers[index];
	
	    //NOSQL('users').counter.hit('all').hit(user.id);
		$.user = user;
		$.callback(SUCCESS(true));
	});
});