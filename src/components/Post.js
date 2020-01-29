import React from "react";
import CommentBox from "./CommentBox";
import GalleryBlock from "./GalleryBlock";

function Post(props) {
	let id = props.match.params.id;

	return (
		<div className="PostContainer">
			<GalleryBlock className="PostCanvas" postId={id} />
			<CommentBox postId={id}/>
		</div>
	)
}

export default Post;