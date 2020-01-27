const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const router = express.Router();
const bcrypt = require("bcrypt");

let UserSchema = new Schema({
	created: {type: Date, default: Date.now},
	username: {type: String, trim: true, minlength: 6, maxlength: 16, match: /^[a-z0-9-_]+$/},
	password: {type: String, required: true, match: /^(?=.*\d).{4,8}/},
	email: {type: String, match:
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/},
	images: [{type: Schema.Types.ObjectId, ref: 'Post', default: '[]'}],
	isValidated: {type: Boolean, default: false},
	receiveEmails: {type: Boolean, default: true},
});

let User = mongoose.model("User", UserSchema);

function createToken(user) {
	return "good_token";
}

router.route("/login").post(function(req, res) {
	const body = req.body;

	let email = req.body.email;

	User.findOne({'email' : new RegExp(email)}, async function(err, user) {
		if (user === null) {
			res.send({status: "Invalid email or password."});
			return;
		}
		let result = await bcrypt.compare(req.body.password, user.password);
		if (result) {
			let tok = createToken(user);
			res.send({status: "ok", token: tok});
		} else {
			res.send({status: "Invalid email or password."});
		}
	});

	// // real logic plz
	// if (body.username === "good" && body.password === "good") {
	// 	res.send({status: "ok", token: "good_token"});
	// } else {
	// 	res.send({status: "ko", token: "bad_token"});
	// }
});

router.route("/logout").post(function(req, res) {
	const body = req.body;

	res.send({status: "ok"});
});

/*
 * Ping returns ok is the supplied Token is still valid.
 * If the token is invalid or otherwise has expired, it will return ko
 */
router.route("/ping").post(function(req, res) {
	const body = req.body;

	if (body.token === "good_token") {
		res.send({status: "ok"});
	} else {
		res.send({status: "ko"});
	}
});

/*
 * This function shall send a password reset link to the user.
 * It will always respond with 200 OK.
 */
router.route("/sendpasswordlink").post(function(req, res) {
	const body = req.body;

	res.send();
});

router.route("/register").post(function(req, res) {
	const body = req.body;

	let email = body.email;

	User.findOne({'email' : new RegExp(email)}, async function(err, user) {
		if (user !== null) {
			res.send({status: "Email already in use."});
		} else {
			let hash = await bcrypt.hash(body.password, 10);
			User.create({
				email: body.email,
				password: hash,
				username: body.username
			}, (err, user) => {
				if (err !== null) {
					res.send({status: "ko"});
				} else {
					res.send({status: "ok"});
					//TODO send email for verification
				}
			});
		}
	});
});

router.route("/getUserDetails").post(function(req, res) {
	const body = req.body;

	if (body.token === "good_token") {
		let res = {
			photo: "https://cdn.intra.42.fr/users/zfaria.jpg",
			email: "good@email.com",
			username: "good",
			notifications: true,
			status: "ok"
		}
	} else {
		res.send({status: "ko"});
	}

	res.send();
});

module.exports = router;