import React, { Component } from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  Form
} from 'reactstrap';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from "prop-types";
import { logout } from "../actions/AuthActions"
import { withRouter } from "react-router-dom";

class AppNav extends Component {
	static propTypes = {
		cookies: instanceOf(Cookies).isRequired
	};

	constructor(props) {
		super(props);

		this.state = {
			loggedIn: false
		}
	}

	onLogout = (e) => {
		e.preventDefault();

		const { cookies } = this.props;

		logout(cookies.get("token"));
		cookies.remove("token");
		this.props.history.push("/");
	}

	onLogin = (e) => {
		e.preventDefault();

		this.props.history.push("/login");
	}

	render() {
		const { cookies } = this.props;

		let token = cookies.get("token");

		let LogButton;
		if (token !== undefined) {
			LogButton = (
				<Form onSubmit={this.onLogout}>
					<Button>Logout</Button>
				</Form>
			);
		} else {
			LogButton = (
				<Form onSubmit={this.onLogin}>
					<Button>Login</Button>
				</Form>
			);
		}

		return (
			<Navbar color="dark" dark expand="md">
			<NavbarBrand href="/">camagru</NavbarBrand>
			<Nav className="mr-auto" navbar>
				<NavItem>
					<NavLink href="/camera">Camera</NavLink>
				</NavItem>
				<NavItem>
					{token !== undefined ? <NavLink href="/gallery">Gallery</NavLink> : null}
				</NavItem>
				<NavItem>
					<NavLink href="/feed">Feed</NavLink>
				</NavItem>
				<NavItem>
					{token !== undefined ? <NavLink href="/profile">Profile</NavLink> : null}
				</NavItem>
				<NavItem>
					{token !== undefined ? <NavLink href="/settings">Settings</NavLink> : null}
				</NavItem>
			</Nav>
			{LogButton}
			</Navbar>
		);
	}
}

export default withCookies(withRouter(AppNav));