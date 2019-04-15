import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:8000");

{
	/* <script> */
}
$(function() {
	var socket = io();
	$("form").submit(function(e) {
		e.preventDefault(); // prevents page reloading
		socket.emit("chat message", $("#m").val());
		$("#m").val("");
		return false;
	});
	socket.on("chat message", function(msg) {
		$("#messages").append($("<li>").text(msg));
	});
});
// </script>
