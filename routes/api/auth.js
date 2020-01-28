const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcrypt");
const Token = require("../../models/Token.model");
const User = require("../../models/User.model");


async function createToken(user) {
	let tok = await Token.create({
		userId: user._id
	});
	return tok._id;
}

async function validateToken(token) {
	let tok = await Token.findOne({_id: token});

	if (tok === null) {
		return { valid: false };
	} else {
		return ({
			valid: tok.expires > Date.now(),
			userId: tok.userId
		})
	}
}

router.route("/login").post(async function(req, res) {
	const body = req.body;

	let email = req.body.email;

	User.findOne({'email' : new RegExp(email)}, async function(err, user) {
		if (user === null) {
			res.send({status: "Invalid email or password."});
			return;
		}
		let result = await bcrypt.compare(req.body.password, user.password);
		if (result) {
			let tok = await createToken(user);
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
router.route("/ping").post(async function(req, res) {
	const body = req.body;

	let valid = validateToken(req.body.token);

	res.send({status: valid.valid ? "ok" : "ko" });
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
module.exports.validateToken = validateToken;
