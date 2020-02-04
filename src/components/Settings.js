import React, { useState, useEffect } from "react";
import "./Settings.css";
import {getUserDetails} from "../actions/AuthActions"
import { useCookies } from 'react-cookie';

function Settings(props) {
	const [ username, setUsername ] = useState('');
	const [ receiveEmails, setReceiveEmails ] = useState(false);
	const [ cookies, setCookie, removeCookie ] = useCookies("token");

	useEffect(() => {
		getUserDetails({token: cookies.token}).then(res => {
			if (res.data.status === "ok") {
				setUsername(res.data.username);
				setReceiveEmails(res.data.receiveEmails);
			} else {
				props.history.push("/");
			}
		});
	}, []);

	function submit(e) {
		e.preventDefault();
	}

	return (
		<div className="SettingsContainer">
			<form className="Settings" onSubmit={submit}>
				<div className="SettingOption">
					<label htmlFor="username">Username:</label>
					<input id="username" className="SettingsInput" value={username} minLength="6" maxLength="16"
						onChange={e => setUsername(e.target.value)}
					/>
				</div>
				<div className="SettingOption">
					<label htmlFor="email">Receive Emails</label>
					<input id="email" type="checkbox" checked={receiveEmails}
						onChange={e => setReceiveEmails(!receiveEmails)}
					/>
				</div>
				<button className="SettingsButton">Submit</button>
			</form>
		</div>
	);
}

export default Settings;