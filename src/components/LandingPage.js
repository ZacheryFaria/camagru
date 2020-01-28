import React, { useEffect } from "react";
import { useCookies } from 'react-cookie';

function LandingPage(props) {
	const [ cookies ] = useCookies("token");

	useEffect(() => {
		let token = cookies.token;
		if (token !== undefined) {
			props.history.push("/camera");
		} else {
			props.history.push("/login");
		}
	}, [cookies.token, props.history]);

	return (
		<div className="landing">
			{ cookies.token }
		</div>
	);
}

export default LandingPage;