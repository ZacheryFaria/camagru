import React, { Component } from "react";
import "./Login.css";
import {login, ping} from "../actions/AuthActions"
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from "prop-types";
import {Link} from "react-router-dom";

class Login extends Component {
	static propTypes = {
		cookies: instanceOf(Cookies).isRequired
	}

	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
			status: null,
		}
	}

	componentDidMount = async () => {
		const { cookies } = this.props;

		let token = cookies.get("token");
		let res = await ping({token: token});
		if (res.data.status === "ok") {
			this.props.history.push("/");
		}
	};

	submit = async (e) => {
		e.preventDefault();

		const { cookies } = this.props;

		let response = await login(this.state);
		console.log(response);

		if (response.data.status === "ok") {
			cookies.set("token", response.data.token, { path: '/' });
			this.props.history.push("/");
			console.log(response.data);
		} else {
			this.setState({status: response.data.status});
		}
	};

	onChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
	}

	render() {
		return (
			<div className="LoginContainer">
				<form  className="Login" onSubmit={this.submit}>
					<Link to="/register"><strong>Don't have an account? Register Here</strong></Link>
					<input className="LoginInput" type="text" name="username" value={this.state.username} onChange={this.onChange} placeholder="Enter Username" required/>
					<input className="LoginInput" type="password" name="password" value={this.state.password} onChange={this.onChange} placeholder="Password" required/>
					<button className="LoginButton">Login</button>
					<label><strong>{this.state.status}</strong></label>
				</form>
			</div>
		)
	}
}

export default withCookies(Login);