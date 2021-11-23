

exports.install = function() {
	ROUTE('GET /');
	ROUTE('SOCKET /', socket);
	ROUTE('FILE /j-*.html',cdn);
};
function cdn(req,res){
	res.file(PATH.public('cdn/'+req.url));
}
function socket() {
	var self = this;
	var messages = [];
	var interval;
	self.autodestroy(function() {
		clearInterval(interval);
	});

	self.on('open', function(client) {
		// do something
		self.send({ date: new Date(),firstname : 'Louis', lastname : 'Bertson', message: 'Karibu' });
	});

	self.on('close', function(client) {
		// do something
	});

	self.on('message', function(client, message) {
		console.log('Message:', message);
	});
		
	

}