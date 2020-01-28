import React, { useEffect, useState } from "react";
import { getComments, addComment } from "../actions/ContentAction";
import { useCookies } from "react-cookie";
import Comment from "./Comment";

function CommentBox(props) {
	const [ commentInput, setCommentInput ] = useState('');
	const [ cookie ] = useCookies("token");
	const [ comments, setComments ] = useState([]);

	useEffect(() => {
		getComments(props.postId).then((res) => {
			let tmp = res.data.map((comment, i) => 
				<Comment key={i} userId={comment.userId} username={comment.username} date={comment.created} msg={comment.message}/>
			);
			setComments(tmp);
		});
	}, [props.postId]);

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
			console.log(res);
		});
	}

	return (
		<div className="CommentBoxContainer">
			{ cookie.token !== undefined ? <form>
				<textarea name="comment" placeholder="Enter comment here." value={commentInput} onChange={onChange}/>
				<button onClick={sendComment}>Comment</button>
			</form> : null}
			{comments}
			comment {props.postId}
		</div>
	);
}

export default CommentBox;