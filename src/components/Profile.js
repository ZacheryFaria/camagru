import React, { useEffect, useState, useRef } from "react";
import { useCookies } from "react-cookie";
import { getUserPosts } from "../actions/ContentAction";
import GalleryBlock from "./GalleryBlock";
import "./Gallery.css";

function Profile(props) {
	const [ cookies ] = useCookies(["token", "userId"]);
	const [ blocks, setBlocks ] = useState([]);
	const [ bottom, setBottom ] = useState(true);
	const page = useRef(0);

	let userId = props.match.params.id;

	useEffect(() => {
		window.scrollTo(0, 0);
		document.addEventListener("scroll", trackScrolling);
		return () => {
			document.removeEventListener("scroll", trackScrolling);
		};
	}, []);

	function trackScrolling() {
		if (document.body.scrollHeight - window.scrollY <= window.innerHeight) {
			setBottom(true);
		}
	}

	if (userId === undefined) {
		if (cookies.userId === undefined) {
			// user not found
		} else {
			userId = cookies.userId;
		}
	}

	useEffect(() => {
		if (!bottom) {
			return;
		}
		setBottom(false);
		getUserPosts({id: userId, page: page.current}).then((res) => {
			let tmp = res.data.map((e) => <GalleryBlock key={e._id} postId={e._id}/>);
			tmp = blocks.concat(tmp);
			setBlocks(tmp);
		});
		page.current += 1;
	}, [bottom, blocks, userId]);


	return (
		<div className="GalleryContainer">
			{blocks}
		</div>
	);
}

export default Profile;