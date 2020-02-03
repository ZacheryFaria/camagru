import React, { useEffect, useState } from "react";
import { resendEmail } from "../actions/AuthActions";

function EmailResend(props) {
	let [ status, setStatus ] = useState('');
	let email = props.match.params.email;

	useEffect(() => {
		resendEmail({email: email});
		setStatus(`A new verification email has been sent to ${email}`);
		props.history.push("/");
	}, [])

	return (
		<div>
			{status}
		</div>
	);
}

export default EmailResend;