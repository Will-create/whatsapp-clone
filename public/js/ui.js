COMPONENT('chat',  function(self) {

	// var autoclosing;
	// var system = false;
	// var N = windo  w.Notification;

	self.singleton();
	self.readonly();
	self.nocompile && self.nocompile();
	self.template = Tangular.compile(`<div class="ui-chat" data-id="{{ id }}">
       <div class="ui-chat-body">
            <div class="ui-chat-bodyLeft">
               <div class="ui-chat-image">
                <img src="{{img}}"/>
            	</div>
            </div>
            <div class="ui-chat-bodyRight">
                <div class="ui-chat-name">{{ name }}</div>
                <div class="ui-chat-message">{{ message | raw }}</div>
            </div>

        </div>
    </div>`);
	
	self.items = {};

	self.make = function() {
		self.aclass('sidebar_chats');
		// self.event('click', '.fa-times-circle', function() {
		// 	var el = $(this).closest('.ui-notification');
		// 	self.close(+el.attr('data-id'));
		// 	clearTimeout(autoclosing);
		// 	autoclosing = null;
		// 	self.autoclose();
		// });

		// self.event('click', 'a,button', function(e) {
		// 	e.stopPropagation();
		// });

		self.event('click', '.ui-chat', function() {
			var el = $(this);
			var id = +el.attr('data-id');
			// var obj = self.items[id];
			// if (!obj || !obj.callback)
			// 	return;
			// obj.callback();
			// self.open(id);
		});

		// if (config.native === true && N) {
		// 	system = N.permission === 'granted';
		// 	!system && N.requestPermission(function (permission) {
		// 		system = permission === 'granted';
		// 	});
		// }
	};

	// self.close = function(id) {
	// 	var obj = self.items[id];
	// 	if (!obj)
	// 		return;
	// 	obj.callback = null;

	// 	if (obj.system) {
	// 		obj.system.onclick = null;
	// 		obj.system.close();
	// 		obj.system = null;
	// 	}
	// 	delete self.items[id];
	// 	var item = self.find('div[data-id="{0}"]'.format(id));
	// 	item.addClass('ui-notification-hide');
	// 	setTimeout(function() {
	// 		item.remove();
	// 	}, 600);
	// };
	self.append = function(id, img, message, name) {
		var obj = { id: id , img: img, message: message, name: name};
		self.items[obj.id] = obj;
		self.element.append(self.template(obj));
	};

	
});
COMPONENT('chatbody',  function(self) {
	// var autoclosing;
	// var system = false;
	// var N = windo  w.Notification;
	self.singleton();
	self.readonly();
	self.nocompile && self.nocompile();
	self.template = Tangular.compile(`<p data-id="{{id}}"  class="chat_message {{if incoming == true }} chat_receiver {{ fi}} ">
	<span class="chat_messageAuthor">{{author}}</span>
	{{body | raw}}
	<span class="chat_messageBodyMetaTimeStamp">{{timestamp}}</span>
	</p>`);
	self.items = {};
	self.make = function() {
		self.aclass('chat_body');
		// self.event('click', '.fa-times-circle', function() {
		// 	var el = $(this).closest('.ui-notification');
		// 	self.close(+el.attr('data-id'));
		// 	clearTimeout(autoclosing);
		// 	autoclosing = null;
		// 	self.autoclose();
		// });
		// self.event('click', 'a,button', function(e) {
		// 	e.stopPropagation();
		// });

		self.event('click', '.ui-chat', function() {
			var el = $(this);
			var id = +el.attr('data-id');
			// var obj = self.items[id];
			// if (!obj || !obj.callback)
			// 	return;
			// obj.callback();
			// self.open(id);
		});

		
		// if (config.native === true && N) {
			// 	system = N.permission === 'granted';
			// 	!system && N.requestPermission(function (permission) {
				// 		system = permission === 'granted';
				// 	});
				// }
	};
			
	// self.setter = function (value){
	// 	console.log(value);
	// 	value.forEach(el => {
	// 		self.template(el);
	// 	});
	// }
	// self.close = function(id) {
	// 	var obj = self.items[id];
	// 	if (!obj)
	// 		return;
	// 	obj.callback = null;

	// 	if (obj.system) {
	// 		obj.system.onclick = null;
	// 		obj.system.close();
	// 		obj.system = null;
	// 	}
	// 	delete self.items[id];
	// 	var item = self.find('div[data-id="{0}"]'.format(id));
	// 	item.addClass('ui-notification-hide');
	// 	setTimeout(function() {
	// 		item.remove();
	// 	}, 600);
	// };
	self.append = function(id, author, body, timestamp,incoming) {
		var obj = { id: id , author: author, body:body,timestamp:timestamp,incoming : incoming};
		self.items[obj.id] = obj;
		self.element.append(self.template(obj));
	};
});