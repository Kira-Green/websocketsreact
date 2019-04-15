import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import io from "socket.io-client";

const socket = io("http://localhost:8000");

const AppHook = props => {
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		socket.on("chat message", msg => {
			setMessages([...messages, msg], []);
		});
	});

	const handleChange = event => {
		setInput(event.target.value);
	};

	const handleSubmit = event => {
		event.preventDefault();
		socket.emit("chat message", input);
		setInput("");
	};

	return (
		<div className="App">
			<ul id="messages">
				{messages.map((message, idx) => (
					<li key={idx}>{message}</li>
				))}

				<form onSubmit={handleSubmit} action="">
					<input
						value={input}
						// id="m"
						// autocomplete="off"
						onChange={handleChange}
					/>
					<button>Send</button>
				</form>
			</ul>
		</div>
	);
};

export default AppHook;
