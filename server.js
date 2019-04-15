const io = require("socket.io")();

// io.on("connection", client => {
// 	// here you can start emitting events to the client
// });

io.on("connection", function(socket) {
	socket.on("chat message", function(msg) {
		io.emit("chat message", msg);
	});
});

const port = 8000;
io.listen(port);
console.log("listening on port ", port);
