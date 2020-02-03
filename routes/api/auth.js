const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcrypt");
const Token = require("../../models/Token.model");
const User = require("../../models/User.model");
const EmailVerify = require("../../models/EmailVerify.model");
const nodemailer = require("nodemailer");
const fs = require("fs");

async function createToken(user) {
	let tok = await Token.create({
		userId: user._id
	});
	return tok._id;
}

var emailSecret = fs.readFileSync("./secret_email.txt");
var email = 'zfariacamagru@gmail.com';

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: email,
		pass: "Camagru.1"
	}
});

function sendEmail(destination, subject, body) {
	var options = {
		from: email,
		to: destination,
		subject: subject,
		text: body
	};

	return transporter.sendMail(options);
}

/*
 * sendConfirmatinMail will create a new confirmation link for an email,
 * then send the corresponding email. 
 */
async function sendConfirmationMail(user) {
	let email = user.email;
	
	let link = await EmailVerify.create({userId: user._id});
	if (link !== null) {
		let url = "http://localhost:3000/verify/" + link._id;
		sendEmail(email, "Welcome to camagru!", `Verify your email with ${url}`);
	}
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
	let email = req.body.email;

	console.log(email);

	User.findOne({'email' : email}, async function(err, user) {
		if (user === null) {
			res.send({status: "1", msg: "Invalid email or password."});
			return;
		}
		if (!user.isValidated) {
			res.send({status: "2", msg: "Email not yet validated!"});
			return;
		}
		let result = await bcrypt.compare(req.body.password, user.password);
		if (result) {
			let tok = await createToken(user);
			res.send({status: "ok", token: tok, userId: user._id});
		} else {
			res.send({status: "1", msg: "Invalid email or password."});
		}
	});
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

	let valid = await validateToken(body.token);

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

router.route("/resendvalidationemail").post(async function(req, res) {
	let user = await User.findOne({email: RegExp(req.body.email)});

	if (user !== null) {
		sendConfirmationMail(user);
	}

	res.send({status: "ok"});
});

router.route("/validateemail").post(async function(req, res) {
	let tok = await EmailVerify.findOne({_id: req.body.id});

	if (tok === null) {
		res.send({status: "ko", msg: "Invalid token."});
		return;
	}

	if (Date.now() > tok.expires) {
		res.send({status: "ko", msg: "Token expired."});
		return;
	}

	let user = await User.findOne({_id: tok.userId});

	user.isValidated = true;
	user.save();

	tok.expires = 0;
	tok.save();

	let logToken = await createToken(user);

	res.send({status: "ok", token: logToken, userId: user._id});
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
					sendConfirmationMail(user);
				}
			});
		}
	});
});

router.route("/getUserDetails").post(async function(req, res) {
	const body = req.body;

	let token = await validateToken(req.body.token);

	if (!token.valid) {
		res.send({status: "ko"});
		return;
	}

	let user = await User.findOne({_id: token.userId});
	user._doc.status = "ok";

	// let res = {
	// 	photo: "https://cdn.intra.42.fr/users/zfaria.jpg",
	// 	email: "good@email.com",
	// 	username: "good",
	// 	notifications: true,
	// 	status: "ok"
	// }

	res.send(user);
});

module.exports = router;
module.exports.validateToken = validateToken;
