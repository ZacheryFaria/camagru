import React, { useState } from "react";
import { getPost } from "../actions/ContentAction";
import CommentBox from "./CommentBox";

function Post(props) {
	let id = props.match.params.id;

	useState(() => {
		getPost(id).then(res => {
			if (res.data.status === "ko") {
				props.history.push("/404");
			} else {
				let img = document.getElementById("img");
				img.src = res.data.media;
			}
		});
	}, []);

	return (
		<div className="PostContainer">
			<img alt='' className="PostCanvas" id="img"/>
			<CommentBox postId={id}/>
		</div>
	)
}

export default Post;