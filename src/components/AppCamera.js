import React, { Component } from "react";
import "./Login.css";
import {ping} from "../actions/AuthActions"
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from "prop-types";

class AppCamera extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    }

    constructor(props) {
        super(props);
    }

    componentDidMount = async () => {
        let { cookies } = this.props;

        let token = {token: cookies.get("token")};
        let res = await ping(token);
        if (res.data.status === "ko") {
            this.props.history.push("/login");
        }
    };

    render() {
        return (
            <div>
                caera
            </div>
        )
    }
}

export default withCookies(AppCamera);