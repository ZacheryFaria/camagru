import React, { useEffect, useState } from "react";
import CommentBox from "./CommentBox";
import GalleryBlock from "./GalleryBlock";
import { getPostOwner } from "../actions/ContentAction";

function Post(props) {
	let id = props.match.params.id;
	let [ username, setUsername ] = useState('');
	let [ userId, setUserId ] = useState('');

	useEffect(() => {
		getPostOwner({id: id}).then(res => {
			if (res.data.status !== "ko") {
				setUsername(res.data.name);
				setUserId(res.data.id);
			} else {
				props.history.push("/404Notfound");
			}
		});
	}, [id, props.history])

	return (
		<div className="PostContainer">
			<a href={"/profile/" + userId} className="CommentUsername"><strong>{username}</strong></a>
			<GalleryBlock className="PostCanvas" postId={id} />
			<CommentBox postId={id}/>
		</div>
	)
}

export default Post;