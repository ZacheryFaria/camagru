const express = require("express");
const router = express.Router();
const fs = require('fs');
const Post = require("../../models/Post.model");
const Comment = require("../../models/Comment.model");
const User = require("../../models/User.model");
const uniqueFilename = require('unique-filename');
const auth = require("./auth");

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

	if (user.valid === false) {
		res.send({status: "Invalid token."});
        return;
	}

	Comment.create({
		userId: user.userId,
		message: req.body.message,
		postId: req.body.postId,
	}, (err, comment) => {
		if (comment !== null) {
			res.send({status: "ok", comment: comment._id});
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

module.exports = router;