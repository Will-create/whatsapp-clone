
exports.install = function() {
	ROUTE('+GET /*');
	ROUTE('-GET /*',login);
	ROUTE('FILE /j-*.html',cdn);
};
function cdn(req,res){
	res.file(PATH.public('cdn/'+req.url));
}
function login(){
	var self = this;
	self.view('login');
}