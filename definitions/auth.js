var DDOS = {};
const SESSION = {};
AUTH(function($) {
	// if (DDOS[$.ip] && DDOS[$.ip] > 5) {
	// 	$.invalid();
	// 	return;
	// }
    var cookie = $.cookie(CONF.cookie);
    if (!cookie){
        $.invalid();
        return;
    }
     var id = DECRYPT(cookie,false);
     id && (id = id.substring(0,id.indexOf('|')));

    if (!id){
        $.invalid()
        return;
    }
    if(SESSION[id] && !SESSION[id].blocked){
        SESSION[id].ticks = NOW;
        $.success(true,SESSION[id]);
    }
    var user = MAIN.users.findItem('id',id);
    if(user && !user.blocked){
        user.ticks = NOW;
        user.dtlogged = NOW;
        OPERATION('users.save',NOOP)
        SESSION[id] = user;
        $.success(true,SESSION[id]);
        return ;
    }

	// if (DDOS[$.ip])
	// 	DDOS[$.ip]++;
	// else
	// 	DDOS[$.ip] = 1;

	$.invalid();

});
ON('service', function(counter) {
	if (counter % 5 !== 0)
		return;
	var ticks = F.datetime.add('-10 minutes');
	Object.keys(SESSION).forEach(function(key) {
		if (SESSION[key].ticks < ticks)
			delete SESSION[key];
	});
});

ON('service', function(counter) {
	// if (counter % 5 !== 0)
	// 	return;
	var ticks = F.datetime.add('-1 minutes');
	Object.keys(MAIN.logusers).forEach(function(key) {
		if (MAIN.logusers[key].ticks < ticks)
        delete MAIN.logusers[key];
        console.log(MAIN.logusers);
	});
});

ON('service', function(counter) {
	if (counter % 5 !== 0)
		return;
	var ticks = F.datetime.add('-10 minutes');
	Object.keys(MAIN.newusers).forEach(function(key) {
		if (MAIN.newusers[key].ticks < ticks)
			delete MAIN.newusers[key];
	});
});