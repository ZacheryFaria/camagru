import React, { useEffect, useState } from "react";
import { sendPasswordLink } from "../actions/AuthActions";

function PasswordResend(props) {
	let [ status, setStatus ] = useState('');
	let email = props.match.params.email;

	useEffect(() => {
		sendPasswordLink({email: email}).then(res => console.log(res));
		setStatus(`A password reset link has been sent to ${email}`);
		//props.history.push("/");
	}, [email])

	return (
		<div>
			{status}
		</div>
	);
}

export default PasswordResend;