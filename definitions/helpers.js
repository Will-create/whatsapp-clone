MAIN.merge = function(a, b) {
	return (a + b).split('').sort().join('');
};
PREF.settings =  {color : '#7e76ef'};
FUNC.appuser = function(phone,callback){
	//remove 
	NOSQL('users').one().where('phone',phone).callback(function(err,user){
		if(user){
			callback(0);
		}else{
			var id = UID()
			callback(id);
		}
	})
}
FUNC.appuser2 = function(phone,callback){
	//remove 
	NOSQL('users').one().where('phone',phone).callback(function(err,user){
		if(user){
			callback(1);
		}else{
			
			callback(0);
		}
	})
}
