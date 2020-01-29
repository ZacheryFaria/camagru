import React, { useEffect } from "react";
import { getPost } from "../actions/ContentAction";

function GalleryBlock(props) {
	useEffect(() => {
		getPost(props.postId).then(res => {
			let img = document.getElementById(props.postId);
			img.src = res.data.media;
		});
	}, [props.postId]);

	return (
		<div className="GalleryBlockContainer">
			<a href={"/post/" + props.postId}>
			<img alt='' className="GalleryCanvas" id={props.postId}/>
			</a>
		</div>
	)
}

export default GalleryBlock;