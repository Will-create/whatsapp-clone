COMPONENT('chat',function(self){self.singleton();self.readonly();self.nocompile&&self.nocompile();self.template=Tangular.compile(`<div data-id="{{ id}}" class="single_chat">
	<div class="image_container">
		<img src="{{ img}}">
		</div>
	<div class="content_container">
		<div class="content_container_inner">
			<p class="user_name"> <name>{{ username}}</name> <span> {{ last_update}}</span> </p>
			<p class="chat_content">{{ last_message}}<span>{{ message_count}}</span> </p>
   </div>
	</div>
</div>`);self.items={};self.make=function(){self.aclass('messages_section');self.event('click','.single_chat',function(){});};self.append=function(id,img,last_message,username,last_update,message_count){var obj={id:id,img:img,last_message:last_message,username:username,last_update:last_update,message_count:message_count};self.items[obj.id]=obj;self.element.append(self.template(obj))}});COMPONENT('chatbody',function(self){self.singleton();self.readonly();self.nocompile&&self.nocompile();self.template=Tangular.compile(`<p data-id="{{ id}}"  class="chat_message {{if incoming == true}} chat_receiver {{ fi}} ">
	<span class="chat_messageAuthor">{{author}}</span>
	{{body | raw}}
	<span class="chat_messageBodyMetaTimeStamp">{{timestamp}}</span>
	</p>`);self.items={};self.make=function(){self.aclass('chat_body');self.event('click','.ui-chat',function(){var el=$(this);var id=+el.attr('data-id');});};self.append=function(id,author,body,timestamp,incoming){var obj={id:id,author:author,body:body,timestamp:timestamp,incoming:incoming};self.items[obj.id]=obj;self.element.append(self.template(obj))}});