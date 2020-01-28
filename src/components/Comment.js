import React from "react";
import "./Comment.css";

function Comment(props) {

	return (
		<div className="CommentContainer">
			<a href={"/profile/" + props.userId} className="CommentUsername"><strong>{props.username}</strong></a>
			<label className="CommentMessage">{props.msg}</label>
		</div>
	);
}

export default Comment;