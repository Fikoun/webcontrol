var socket = io.connect(`http://localhost:8080`);

function handleBrowse(url) {
	socket.emit(`browse`,{
		url: url
	});
}

socket.on(`screen`,function (o) {
	console.log(o);
	screenshot.setAttribute( 'src', 'data:image/png;base64,'+o);
});

function handleScreen() {
	socket.emit(`screen`);
}
