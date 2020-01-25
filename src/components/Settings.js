import React, { Component } from "react";
import "./Settings.css";
import {getUserDetails} from "../actions/AuthActions"
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from "prop-types";

class Settings extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            photo: '',
            username: '',
            email: '',
            notifications: true,
        }
    }

    componentDidMount = async () => {
        const { cookies } = this.props;

        let token = cookies.get("token");
        let res = await getUserDetails({token: token});

        if (res.data.status === "ko") {
            this.props.history.push("/");
        } else {
            this.setState({
                email: res.data.email,
                username: res.data.username,
                photo: res.data.photo,
                notifications: res.data.notifications
            });
        }
    };

    render() {
        return (
            <div className="SettingsContainer">
                <input className="SettingsText" value={this.state.username}/>
                <input className="SettingsText" type="email" value={this.state.email}/>
                <input className="SettingsNotification" type="checkbox" value={this.state.notifications}/>
            </div>
        )
    }
}

export default withCookies(Settings);