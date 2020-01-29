import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { getUserPosts } from "../actions/ContentAction";
import GalleryBlock from "./GalleryBlock";
import "./Gallery.css";

function Gallery(props) {
	const [ cookies ] = useCookies(["token", "userId"]);
	const [ blocks, setBlocks ] = useState([]);

	let userId = props.match.params.id;
	let page = props.match.params.page;

	if (userId === undefined) {
		if (cookies.userId === undefined) {
			// user not found
		} else {
			userId = cookies.userId;
		}
	}

	page = page === undefined ? 0 : page;

	useEffect(() => {
		console.log(userId);
		console.log(page);
		getUserPosts({id: userId, page: page}).then((res) => {
			console.log(res.data);
			let tmp = res.data.map((e, i) => <GalleryBlock key={i} postId={e._id}/>);
			console.log(tmp);
			setBlocks(tmp);
		});
	}, [props.id, props.page]);


	return (
		<div className="GalleryContainer">
			{blocks}
		</div>
	);
}

export default Gallery;