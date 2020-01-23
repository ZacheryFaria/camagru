import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
	return (
		<div>
			<p style={{textAlign:"center"}}>
				<Link to="/">404 not found</Link>
			</p>
		</div>
	);
}

export default NotFoundPage;