NEWSCHEMA('Login',function(schema) {

	schema.define('phone', 'Phone', true);
	// schema.define('password', 'String(30)', true);

	schema.addWorkflow('exec', function($) {
        var model = $.body;

		var user = MAIN.users.findItem('phone', model.phone);
		if (user) {
			if (user.blocked)
				$.invalid('error-user-blocked');
			else {
				$.cookie(CONF.cookie, ENCRYPT(user.id + '|' + $.ip + '|' + F.datetime.getTime()), '1 month');
				NOSQL('users').counter.hit('all').hit(user.id);
			}
		} else
			$.callback({value : "otp"});
		$.callback(SUCCESS(true));
	});
});