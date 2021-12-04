FUNC.SESSION = {};


FUNC.SESSION.get = function(id){
    MAIN.openDB2.rpc({db : 'sessions',type : 'inmemory_read',id : id},function(err,res){
        if(err)
            return undefined;
        else 
            return res;
    })
}

FUNC.SESSION.set = function(id,data){
    MAIN.openDB2.rpc({db : 'sessions',type : 'inmemory_save',id : id,data : data, expire : '6 months'},function(err,res){
        if(err)
            console.log(err);
        else 
            return res;
    })
}

FUNC.SESSION.remove = function(id){
    MAIN.openDB2.rpc({db : 'sessions',type : 'inmemory_remove',id : id},function(err,res){
        if(err)
            console.log(err);
        else 
            return res;
    });
}
FUNC.SESSION.all = function(){
    MAIN.openDB2.rpc({db : 'sessions',type : 'inmemory_find'},function(err,res){
        if(err)
            return undefined;
        else 
            return res;
    })
}