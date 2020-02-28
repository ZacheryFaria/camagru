import React, { useEffect, useState } from "react";
import CommentBox from "./CommentBox";
import GalleryBlock from "./GalleryBlock";
import { getPostOwner, deletePost } from "../actions/ContentAction";
import { useCookies } from "react-cookie";
import LikeBar from "./LikeBar";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

function Post(props) {
	let id = props.match.params.id;
	let [ cookies ] = useCookies("userId", "token");
	let [ username, setUsername ] = useState('');
	let [ userId, setUserId ] = useState('');
	let [ isOwner, setIsOwner ] = useState(null);

	useEffect(() => {
		getPostOwner({id: id}).then(res => {
			if (res.data.status !== "ko") {
				setUsername(res.data.name);
				setUserId(res.data.id);
				setIsOwner(res.data.id === cookies.userId);
			} else {
				props.history.push("/404Notfound");
			}
		});
	}, [id, props.history, cookies.userId])

	function removePostConfirmed() {
		deletePost({token: cookies.token, postId: id}).then(res => {
			props.history.push("/gallery");
		});
	}

	function removePost(e) {
		const options = {
			title: 'Are you sure?',
			message: 'Are you sure you wish to remove this post? This action cannot be undone.',
			buttons: [
				{
					label: 'Yes',
					onClick: () => removePostConfirmed()
				},
				{
					label: 'No',
				}
			],
		};
		confirmAlert(options);
	}

	return (
		<div className="PostContainer">
			<a href={"/profile/" + userId} className="CommentUsername"><strong>{username}</strong></a>
			<GalleryBlock className="PostCanvas" postId={id} />
			<LikeBar postId={id} isOwner={isOwner}/>
			{isOwner ? <button className="DeleteButton" onClick={removePost}>Delete Post</button> : null}
			<CommentBox postId={id}/>
		</div>
	)
}

export default Post;