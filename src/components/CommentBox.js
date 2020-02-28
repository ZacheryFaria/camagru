import React, { useEffect, useState } from "react";
import { getComments, addComment } from "../actions/ContentAction";
import { useCookies } from "react-cookie";
import Comment from "./Comment";

function CommentBox(props) {
	const [ commentInput, setCommentInput ] = useState('');
	const [ cookie ] = useCookies("token");
	const [ comments, setComments ] = useState([]);
	const [ sentComment, setSentComment ] = useState(true);

	useEffect(() => {
		if (!sentComment)
			return;
		setSentComment(false);
		getComments(props.postId).then((res) => {
			let tmp = res.data.map((comment, i) => 
				<Comment key={i} userId={comment.userId} username={comment.username} date={comment.created} msg={comment.message}/>
			);
			setComments(tmp);
		});
	}, [props.postId, sentComment]);

	function onChange(e) {
		setCommentInput(e.target.value);
	}

	function sendComment(e) {
		e.preventDefault();

		setCommentInput('');

		let msg = {
			token: cookie.token,
			message: commentInput,
			postId: props.postId
		};
		addComment(msg).then(res => {
			setSentComment(true);
		});
	}

	return (
		<div className="CommentBoxContainer">
			{ cookie.token !== undefined ? <form className="CommentBoxForm">
				<textarea className="CommentBox" name="comment" placeholder="Enter comment here." value={commentInput} onChange={onChange}/>
				<button className="LoginButton" onClick={sendComment}>Comment</button>
			</form> : null}
			{comments}
		</div>
	);
}

export default CommentBox;