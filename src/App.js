import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import io from "socket.io-client";

const socket = io("http://localhost:8000");

// on sum=bmit send input
// recieve chat event - show message

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: [],
			input: " "
		};
	}

	componentDidMount() {
		socket.on("chat message", msg => {
			this.setState(
				state => ({
					messages: [...state.messages, msg]
				}),
				() => {
					window.scrollTo(0, document.body.scrollHeight);
				}
			);
		});
	}
	handleChange = event => {
		const { value } = event.target;
		this.setState(() => ({
			input: value
		}));
	};

	handleSubmit = event => {
		event.preventDefault();
		socket.emit("chat message", this.state.input);
		this.setState(() => ({
			input: ""
		}));
	};
	render() {
		return (
			<div className="App">
				<ul id="messages">
					{this.state.messages.map((message, idx) => (
						<li key={idx}>{message}</li>
					))}

					<form onSubmit={this.handleSubmit} action="">
						<input
							value={this.state.input}
							// id="m"
							// autocomplete="off"
							onChange={this.handleChange}
						/>
						<button>Send</button>
					</form>
				</ul>
			</div>
		);
	}
}

export default App;
