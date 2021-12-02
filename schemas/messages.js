
NEWSCHEMA('Messages',function(schema){
    schema.define('message','String',true);
    schema.define('name', 'String',true);
    schema.define('timestamp','Date');
    schema.define('receiver', 'String');

    schema.setQuery(function($){
        MAIN.openDB2.rpc({ db : 'messages', type : 'find', filter : true, take : 50 },function(err,response){
            if(err){ console.log(err)}
            $.callback(response);
        });
    })
    schema.setInsert(function($,model){
        model.id = UID();
        model.timestamp = NOW;
        console.log(model);
        model.receiver && (model.receiver != 'O' )? model.receiver = false : model.receiver = true;
        MAIN.openDB2.rpc({db : "messages", type : "insert", data : model},function(err,res){
            $.callback(res);
        })
    })
    schema.setQuery(function(error, options, callback, controller) {
		var id;
		if (controller.id.startsWith('user')) {
			id = controller.id.substring(4);
			controller.id = 'user' + F.global.merge(id, controller.user.id);
		} else
			id = controller.id.substring(7);

		// channel
		if (controller.id[0] === 'c' && controller.user.channels && !controller.user.channels[id]) {
			error.push('error-user-privileges');
			return callback();
		}
		controller.user.unread[id] && (delete controller.user.unread[id]);

		if (controller.query.q) {
			NOSQL(controller.id + '-backup').find().search('search', controller.query.q.keywords(true, true)).page((controller.query.page || 1) - 1, controller.query.max || 15).callback(function(err, response) {
				var output = SINGLETON('messages.query');
				output.items = response;
				output.stats = undefined;
				callback(output);
			});
			return;
		}

		var db = NOSQL(controller.id);
		var count = db.meta('likes');

		if (!controller.query.max)
			controller.query.max = 15;

		var filter = db.find();
		filter.or();
		filter.where('dateexpired', undefined);
		filter.where('dateexpired', '>', F.datetime);
		filter.end();
		filter.sort('datecreated', true);
		filter.page((controller.query.page || 1) - 1, controller.query.max + count);
		filter.callback(function(err, response) {

			// Sets the first message as read message
			if (controller.query.page === 1 && id && response.length)
				controller.user.lastmessages[id] = response[0].id;

			db.counter.monthly('all', function(err, counter) {
				var output = SINGLETON('messages.query');
				output.items = response;
				output.stats = counter;
				callback(output);
			});
		});
	});

	schema.addWorkflow('files', function(error, model, options, callback, controller) {

		var id;
		if (controller.id.startsWith('user')) {
			id = controller.id.substring(4);
			controller.id = 'user' + F.global.merge(id, controller.user.id);
		} else
			id = controller.id.substring(7);
		// channel
		if (controller.id[0] === 'c' && controller.user.channels && !controller.user.channels[id]) {
			error.push('error-user-privileges');
			return callback();
		}

		NOSQL(controller.id + '-files').find().page((controller.query.page || 1) - 1, controller.query.max || 15).sort('datecreated', true).callback(callback);
	});

})       