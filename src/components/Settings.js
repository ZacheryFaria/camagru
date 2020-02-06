import React, { useState, useEffect } from "react";
import "./Settings.css";
import { getUserDetails, changePassword, updateUserDetails } from "../actions/AuthActions"
import { useCookies } from 'react-cookie';

function Settings(props) {
	const [ username, setUsername ] = useState('');
	const [ receiveEmails, setReceiveEmails ] = useState(false);
	const [ showPassword, setShowPassword ] = useState(false);
	const [ oldPassword, setOldPassword ]= useState('');
	const [ newPassword, setNewPassword ]= useState('');
	const [ newPasswordC, setNewPasswordC ]= useState('');
	const [ status, setStatus ] = useState('');
	const [ cookies ] = useCookies("token");

	useEffect(() => {
		getUserDetails({token: cookies.token}).then(res => {
			if (res.data.status === "ok") {
				setUsername(res.data.username);
				setReceiveEmails(res.data.receiveEmails);
			} else {
				props.history.push("/");
			}
		});
	}, [props.history, cookies.token]);

	function submit(e) {
		e.preventDefault();

		const data = {
			token: cookies.token,
			username: username,
			receiveEmails: receiveEmails
		}

		updateUserDetails(data).then(res => {
			setStatus(res.data.body);
		});
	}

	function submitPassword(e) {
		e.preventDefault();

		if (newPassword !== newPasswordC || oldPassword === '' || newPassword === '') {
			return;
		}

		const data = {
			token: cookies.token,
			currentPassword: oldPassword,
			newPassword: newPassword
		}

		changePassword(data).then(res => {
			setStatus(res.data.msg);
		});

		setShowPassword(false);
	}
	
	useEffect(() => {
		if (newPasswordC !== newPassword) {
			setStatus('Passwords must match!');
		} else {
			setStatus('');
		}
	}, [newPassword, newPasswordC]);

	useEffect(() => {
		setOldPassword('');
		setNewPassword('');
		setNewPasswordC('');
	}, [showPassword])

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
				<button className="SettingsButton">Update Settings</button>
			</form>
			<div className="PasswordContainer">
				<label>{status}</label>
				<a href="#root" onClick={e => setShowPassword(!showPassword)}>Change Password</a>
				{!showPassword ? null :
				<form className="PasswordForm" onSubmit={submitPassword}>
					<input type="password" className="SettingsInput" placeholder="Current Password"
						value={oldPassword} onChange={e => setOldPassword(e.target.value)}
					/>
					<input type="password" className="SettingsInput" minLength="6" placeholder="New Password"
						value={newPassword} onChange={e => setNewPassword(e.target.value)}
					/>
					<input type="password" className="SettingsInput" minLength="6" placeholder="Confirm New Password"
						value={newPasswordC} onChange={e => setNewPasswordC(e.target.value)}
					/>
					<button className="SettingsButton">Change Password</button>
				</form>
				}
			</div>
		</div>
	);
}

export default Settings;