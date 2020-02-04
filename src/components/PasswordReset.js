import React, { useState, useEffect } from "react";
import { resetPasswordLink } from "../actions/AuthActions";

function PasswordReset(props) {
	let [ pass, setPass ] = useState('');
	let [ passC, setPassC ] = useState('');
	let [ status, setStatus ] = useState('');

	let id = props.match.params.id;

	useEffect(() => {
		setStatus('');
	}, [pass])

	function submit(e) {
		e.preventDefault();

		if (pass !== passC) {
			return;
		}

		let msg = {
			id: id,
			password: pass
		};

		resetPasswordLink(msg).then(res => {
			if (res.data.status === "ok") {
				props.history.push("/login");
			} else {
				setStatus(res.data.msg);
			}
		});
	}

	return (
		<div className="LoginContainer">
			<form className="Login" onSubmit={submit}>
				<label><strong>{status}</strong></label>
				<input className="LoginInput" type="password" placeholder="Enter password"
					value={pass} onChange={e => setPass(e.target.value)}/>
				<input className="LoginInput" type="password" placeholder="Confirm password"
					value={passC} onChange={e => setPassC(e.target.value)}/>
				<button className="LoginButton">Reset</button>
				{pass === passC ? null : <label><strong>Passwords must match!</strong></label>}
			</form>
		</div>
	)

}

export default PasswordReset;