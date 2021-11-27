
NEWSCHEMA('Messages',function(schema){
    schema.define('message','String',true);
    schema.define('name', 'String',true);
    schema.define('timestamp','Date');
    schema.define('receiver', 'String');
    schema.setInsert(function($,model){
        model.id = UID();
        model.timestamp = NOW;
        // model.receiver = model.receiver == "O" ? false : true;
        MAIN.openDB2.rpc({db : "messages", type : "insert", data : model},function(err,res){
            $.callback(res);
        })
    })
})