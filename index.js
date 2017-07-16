var express = require(`express`);
var socket = require(`socket.io`);
var webdriver = require(`./webdriver`);
webdriver.platform = "phantomjs";

var app = express();
var server = app.listen(8080,function () {
	console.log(`\x1b[32m\x1b[1m\x1b[5m___Server is running____ \x1b[0m`);
}); 

app.use(express.static(`client`)); 

var io = socket(server);



var sockets = [];
io.on(`connection`, function (socket) {
	console.log(`\x1b[1m\x1b[37m\x1b[40m Client `+socket.id+` connected \x1b[0m`);

	socket.driver = webdriver.start();
	socket.on(`browse`,function (c) {
		this.driver.get(c.url); 
		console.log(`\x1b[41m\x1b[2m Now on \x1b[4m`+ c.url+"\x1b[0m");
	});

	socket.on(`disconnect`,function (c) {
		console.log(`\x1b[1m\x1b[37m\x1b[40m Client `+this.id+` disconnect \x1b[0m`);
	});
	socket.on(`screen`,function (c) 
	{
		this.o = this.driver.takeScreenshot();
		console.log(`\x1b[1m\x1b[37m\x1b[40m Taking screenshot... \x1b[0m`);
		this.timeoutFunc = function (t) {
			if(t.o.state_ == `fulfilled`){

				console.log(`\x1b[32m\x1b[1m ---Image loaded and send--- \x1b[0m`);
				t.emit(`screen`,t.o.value_);
				return;
			}else{
				setTimeout(t.timeoutFunc,1,t);
			}
		};
		setTimeout(this.timeoutFunc,1,this);
	});
	sockets.push(socket); 
}); 
// driver.takeScreenshot().then(function(image, err) {require('fs').writeFile('out.png', image, 'base64', function(err) {console.log(err); }); } ); 