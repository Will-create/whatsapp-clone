
exports.install = function() {
	ROUTE('+GET /*',home);
	ROUTE('-GET /*',login);
	ROUTE('GET /test/',test);
	ROUTE('FILE /j-*.html',cdn);
};
function cdn(req,res){
	res.file(PATH.public('cdn/'+req.url));
}
function login(){
	var self = this;
	self.view('login');
}

function home(){
	var self = this;
	self.view('index');
}

async function test (){
	var self  = this;
	var data = {id : 'jjdjdjdjkdkdkdkdjdjd', name : "LOuis", email : "louisbertson@gmail.com"};
	var res = await FUNC.SESSION.set(self.query.id,data);
	self.json(res);
}