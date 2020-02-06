const express = require("express");
const router = express.Router();
const fs = require('fs');
const Post = require("../../models/Post.model");
const Comment = require("../../models/Comment.model");
const User = require("../../models/User.model");
const uniqueFilename = require('unique-filename');
const auth = require("./auth");
const Email = require("./email");
const Like = require("../../models/Like.model");

router.route("/upload").post(async function(req, res) {
    let user = await auth.validateToken(req.body.token);

    if (user.valid === false) {
		res.send({status: "Invalid token."});
        return;
	}
	
    const randomFile = uniqueFilename("./store", user.userId);

    fs.writeFile(randomFile, req.body.data, err => {
        if (err !== null) {
			console.log(err);
		}
    });

    Post.create({
        media: randomFile.split("/")[1],
        userId: user.userId
    }, (err, post) => {
		if (post !== null) {
			res.send({status: "ok", postId: post._id});
		} else {
			console.log(err);
			res.send({status: "There was an error submitting your post."});
		}
	});
});

router.route("/getpost").post(async function(req, res) {
	let post = await Post.findOne({_id: req.body.id});

	if (post === null) {
		res.send({ status: "ko" });
	} else {
		let uri = fs.readFileSync("./store/" + post.media);
		res.send({ media: uri.toString(), status: "ok" });
	}
});

router.route("/addcomment").post(async function(req, res) {
	let user = await auth.validateToken(req.body.token);
	let post = await Post.findOne({_id: req.body.postId});
	let owner = await User.findOne({_id: post.userId});
	user = await User.findOne({_id: user.userId});

	if (user.valid === false) {
		res.send({status: "Invalid token."});
        return;
	}

	if (post === null || owner === null) {
		res.send({status: "Invalid post id."});
		return;
	}

	Comment.create({
		userId: user._id,
		message: req.body.message,
		postId: req.body.postId,
	}, (err, comment) => {
		if (comment !== null) {
			res.send({status: "ok", comment: comment._id});
			Email.sendCommentMail(owner, user, post);
		} else {
			console.log(err);
			res.send({status: "There was an error submitting your comment."});
		}
	});
});

router.route("/getcomments").post(async function(req, res) {
	let comments = await Comment.find({postId: req.body.id});

	for (var i = 0; i < comments.length; i++) {
		let user = await User.findOne({_id: comments[i].userId});
		let comment = comments[i];
		comment._doc.username = user.username;
		comments[i] = comment;
	}

	res.send(comments);
});

router.route("/getUserPosts").post(async function(req, res) {
	const body = req.body;

	let posts = await Post.find({userId: body.id, created: {$lt: body.last}}).sort('-created').limit(8);
	
	res.send(posts);
});

router.route("/getAllPosts").post(async function(req, res) {
	const body = req.body;

	let posts = await Post.find({created: {$lt: body.last}}).sort('-created').limit(8);

	res.send(posts);
});

router.route("/getPostOwner").post(async function(req, res) {
	let post = await Post.findOne({_id: req.body.id});
	
	if (post === null) {
		res.send({ status: "ko" });
		return;
	}

	let user = await User.findOne({_id: post.userId});

	if (user === null) {
		res.send({status: "ko"});
	} else {
		res.send({status: "ok", name: user.username, id: user._id});
	}
});

router.route("/likePost").post(async function(req, res) {
	let tok = await auth.validateToken(req.body.token);

	if (!tok.valid) {
		res.send({statis: "ko", msg: "Invalid or expired token."});
		return;
	}

	let like = await Like.create({
		postId: req.body.postId,
		userId: tok.userId
	});
	
	if (like) {
		res.send({status: "ok"});
	} else {
		res.send({status: "ko", msg: "Failed to like post."});
	}
});

router.route("/unlikePost").post(async function(req, res) {
	let tok = await auth.validateToken(req.body.token);

	if (!tok.valid) {
		res.send({statis: "ko", msg: "Invalid or expired token."});
		return;
	}

	let like = await Like.deleteOne({
		postId: req.body.postId,
		userId: tok.userId
	});
	
	res.send({status: "ok"});
});

router.route("/checkLike").post(async function(req, res) {
	let tok = await auth.validateToken(req.body.token);

	if (tok.valid === false) {
		res.send({status: "ko", msg: "Invalid or expired token."});
        return;
	}

	let like = await Like.findOne({userId: tok.userId, postId: req.body.postId});

	res.send({status: "ok", liked: like !== null});
})

router.route("/deletePost").post(async function(req, res) {
	let tok = await auth.validateToken(req.body.token);

	let post = await Post.findOne({_id: req.body.postId});

	if (tok.valid === false) {
		res.send({status: "ko", msg: "Invalid or expired token."});
        return;
	}

	if (!tok.userId.equals(post.userId)) {
		res.send({status: "ko", msg: "Authenticated user does not own this post!"});
        return;
	}

	Post.deleteOne({_id: post._id}, (res) => {
		if (res) {
			console.log(res);
		}
	});

	res.send({status: "ok", msg: "Post deleted."});
});

router.route("/getLikeCount").post(async function(req, res) {
	let count = await Like.countDocuments({postId: req.body.postId});

	res.send({status: "ok", likes: count});
});

module.exports = router;