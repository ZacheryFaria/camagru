import React, { Component } from "react";
import "./Login.css";
import { register, ping } from "../actions/AuthActions"
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from "prop-types";
import {Link} from "react-router-dom";

class Register extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            password2: '',
            email: '',
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

        if (this.state.password !== this.state.password2) {
            alert("passwords must match!");
            return;
        }

        let response = await register(this.state);

        if (response.data.status === "ok") {
            this.props.history.push("/registercomplete");
        } else {
            this.setState({status: response.data.status});
            console.log("bad registration...");
            console.log(response.data);
        }
    };

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    render() {
        return (
            <div className="LoginContainer">
                <form  className="Login" onSubmit={this.submit}>
                    <Link to="/login"><strong>Already have an account? Login here!</strong></Link>
                    <input className="LoginInput" type="email" name="email" value={this.state.email} onChange={this.onChange} placeholder="Enter Email" required/>
                    <input className="LoginInput" type="text" name="username" minLength="6" maxLength="16" value={this.state.username} onChange={this.onChange} placeholder="Enter Username" required/>
                    <input className="LoginInput" type="password" name="password" value={this.state.password} onChange={this.onChange} placeholder="Password" required/>
                    <input className="LoginInput" type="password" name="password2" value={this.state.password2} onChange={this.onChange} placeholder="Re-enter Password" required/>
                    <label>{this.state.password !== this.state.password2 ? "Passwords must match!" : null}</label>
                    <label>{this.state.status}</label>
                    <button className="LoginButton">Register</button>
                </form>
            </div>
        )
    }
}

export default withCookies(Register);