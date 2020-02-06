import React, { useEffect, useState } from "react";
import { validateEmail } from "../actions/AuthActions";
import { useCookies } from "react-cookie";

function Verify(props) {
	let id = props.match.params.id;
	let [ status, setStatus ] = useState('');
	let [ cookies, setCookie ] = useCookies("token", "userId");

	useEffect(() => {
		validateEmail({id: id}).then((res) => {
			if (res.data.status === "ko") {
				setStatus(res.data.msg);
			} else {
				setCookie("token", res.data.token, { path: '/', expires: new Date(Date.now() + 23*60*60*1000) });
				setCookie("userId", res.data.userId, { path: '/', expires: new Date(Date.now() + 23*60*60*1000) });
				props.history.push("/");
			}
		});
	}, [id, props.history, setCookie]);

	return (
		<div>{status} {cookies.userId}</div>
	);
}

export default Verify;
