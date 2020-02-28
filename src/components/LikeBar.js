import React, { useState, useEffect } from "react";
import { likePost, unlikePost, checkLike, getLikeCount } from "../actions/ContentAction";
import { useCookies } from "react-cookie";
import ThumbUp from '@material-ui/icons/ThumbUp';
import "./LikeBar.css";

function LikeBar(props) {
	const [ cookies ] = useCookies("token", "userId");
	const [ liked, setLiked ] = useState(false);
	const [ likeCount, setLikeCount ] = useState(0);

	useEffect(() => {
		checkLike({token: cookies.token, postId: props.postId}).then(res => {
			if (res.data.status === "ok") {
				setLiked(res.data.liked);
			}
		});

		getLikeCount({postId: props.postId}).then(res => {
			if (res.data.status === "ok") {
				setLikeCount(res.data.likes);
			}
		});
	}, [props.postId, cookies.token]);

	function like(e) {
		var data = {
			token: cookies.token,
			postId: props.postId
		}

		likePost(data).then(res => {
			setLiked(true);
			setLikeCount(likeCount + 1)
		})
	}

	function unlike(e) {
		var data = {
			token: cookies.token,
			postId: props.postId
		}

		unlikePost(data).then(res => {
			setLiked(false);
			setLikeCount(likeCount - 1)
		})
	}

	let likeButton;

	if (liked) {
		likeButton = <button className="LikeButton" onClick={unlike}>Unlike</button>;
	} else {
		likeButton = <button className="LikeButton" onClick={like}>Like</button>;
	}

	console.log(props.isOwner);

	return (
		<div className="LikeBar">
			<p className="LikeText">{`${likeCount}`}</p><ThumbUp/>
			{props.isOwner === null || props.isOwner === true || cookies.userId === undefined ? null : likeButton}
		</div>
	)
}

export default LikeBar;