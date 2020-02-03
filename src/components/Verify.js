import React, { useEffect, useState } from "react";
import { validateEmail } from "../actions/AuthActions";
import { useCookies } from "react-cookie";

function Verify(props) {
	let id = props.match.params.id;
	let [ status, setStatus ] = useState('');
	let [ cookies, setCookie, removeCookie ] = useCookies("token", "userId");

	useEffect(() => {
		validateEmail({id: id}).then((res) => {
			console.log(res);
			if (res.data.status === "ko") {
				setStatus(res.data.msg);
			} else {
				setCookie("token", res.data.token, { path: '/', expires: new Date(Date.now() + 23*60*60*1000) });
				setCookie("userId", res.data.userId, { path: '/', expires: new Date(Date.now() + 23*60*60*1000) });
				props.history.push("/");
			}
		});
	}, []);

	return (
		<div>{status}</div>
	);
}

export default Verify;
