
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
})       