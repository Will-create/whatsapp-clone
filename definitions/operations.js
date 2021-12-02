
NEWOPERATION('users.save',function($){
    $.callback(SUCCESS(true));
    setTimeout2('users.save', function() {
        MAIN.openDB2.rpc({ db : "users", type : "find", filter : "true"},function(err,res){
        MAIN.users = res;
        })
	}, 500, 20);
})
PREF.settings =  {color : 'blueviolet'};