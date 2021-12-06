NEWSCHEMA('Login',function(schema) {

	schema.define('phone', 'Phone', true);
	schema.define('passcode', 'String(6)', true);

	schema.addWorkflow('exec', function($,model) {
        console.log('Model :',model);
		
		var code = MAIN.logusers.findItem('phone',model.phone);
		code = code.otp;
        console.log('Code :',code);
		if(model.passcode != code){
			$.invalid('error','Code de confirmation incorrect');
			return;
		}
		var user = MAIN.users.findItem('phone', model.phone);
		if (user) {
			if (user.blocked)
				$.invalid('error-user-blocked');
			else {
				$.cookie(CONF.cookie, ENCRYPT(user.id + '|' + $.ip + '|' + F.datetime.getTime()), '1 month');
				var index = MAIN.logusers.findIndex('phone', user.phone);
				delete MAIN.logusers[index];
				console.log(MAIN.logusers);
				NOSQL('users').counter.hit('all').hit(user.id);
				$.callback(SUCCESS(true));
			}
		} else
			$.callback({value : "otp"});
		$.callback(SUCCESS(true));
	});
});