import React, { Component } from "react";
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from "prop-types";
import { ping } from "../actions/AuthActions"

class LandingPage extends Component {

	static propTypes = {
		cookies: instanceOf(Cookies).isRequired
	}

	componentDidMount = async () => {
		const { cookies } = this.props;

		let token = cookies.get("token");
		let res = await ping({token: token});
		if (res.data.status === "ko") {
			this.props.history.push("/login");
		} else {
			this.props.history.push("/camera");
		}
	};

	render() {
		const { cookies } = this.props;
		return (
			<div className="landing">
				{cookies.get("token") }
			</div>
		);
	}
}

export default withCookies(LandingPage);