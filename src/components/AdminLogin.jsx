import React, { Component } from 'react';
import { Link } from 'react-router'

class Login extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
			userInfo: {}
		}
	}

	updateUserName(e){
		this.setState({
			username	: e.target.value
		})
	}
	updatePassword(e){
		this.setState({
			password	: e.target.value
		})
	}

	getUserData(){
		console.log("HERE")
		var url = 'http://localhost:3000/api/webLogin';
		var config = {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: this.state.username,
				password: this.state.password
			})
		}
		return fetch(url, config)
			.then((data)=>{return data.json()})
			.then((result)=>{
				console.log("RESULT", result); 
				this.setState({
					userInfo: result
				});
			});
	}

	render() {
		return (

		<div>
			<div><h1>Crysis</h1></div>
			<div className="LoginForm">
					<div>
					<label>Username</label>
					<div><input type="text" placeholder="Username" onChange={this.updateUserName.bind(this)}/>{this.state.username}</div>
					</div>
					<div>
						<label>Password</label>
						<div><input type="text" placeholder="Password" onChange={this.updatePassword.bind(this)}/>{this.state.password}</div>
					</div>
					<div>
						
						<Link to ="/AdminHome"><button onClick={this.getUserData.bind(this)}>Login</button></Link>
						<button type="button"> New Organization </button>
					</div>
			</div>
		</div>
		)
	}
}

export default Login;