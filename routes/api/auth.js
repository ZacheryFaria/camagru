const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcrypt");
const Token = require("../../models/Token.model");
const User = require("../../models/User.model");
const EmailVerify = require("../../models/EmailVerify.model");
const PasswordReset = require("../../models/PasswordReset.model");
const Email = require("./email");

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

router.route("/logout").post(async function(req, res) {
	let tok = await Token.findOne({_id: req.body.token});

	if (tok) {
		tok.expires = 0;
		tok.save();
	}

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

router.route("/resendvalidationemail").post(async function(req, res) {
	let user = await User.findOne({email: RegExp(req.body.email)});

	if (user !== null) {
		Email.sendConfirmationMail(user);
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
					Email.sendConfirmationMail(user);
				}
			});
		}
	});
});

router.route("/sendPasswordLink").post(async function(req, res) {
	let user = await User.findOne({email: RegExp(req.body.email)});

	if (user !== null) {
		Email.sendPasswordReset(user);
	}
	res.send({status: "ok"});
});

router.route("/resetPasswordLink").post(async function(req, res) {
	let tok = await PasswordReset.findOne({_id: req.body.id});

	if (tok === null || Date.now() > tok.expires) {
		res.send({status: "ko", msg: "Reset link invalid or expired."});
		return;
	}

	// We now make the token expired so it cannot be reused.
	tok.expires = 0;
	tok.save();

	// user should not be null as token is not null
	let user = await User.findOne({_id: tok.userId});

	let hash = await bcrypt.hash(req.body.password, 10);

	user.password = hash;
	user.save();

	res.send({status: "ok"});
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

	res.send(user);
});

router.route("/changePassword").post(async function(req, res) {
	let tok = await validateToken(req.body.token);

	if (!tok.valid) {
		res.send({status: "ko", msg: "Token invalid or expired."});
		return;
	}

	let user = await User.findOne({_id: tok.userId});

	let result = await bcrypt.compare(req.body.currentPassword, user.password);
	
	if (!result) {
		res.send({status: "ko", msg: "Incorrect password."});
	} else {
		let hash = await bcrypt.hash(req.body.newPassword, 10);
		user.password = hash;
		user.save();
		res.send({status: "ok", msg: "Password successfully changed."});
	}
});

router.route("/updateUserDetails").post(async function(req, res) {
	let tok = await validateToken(req.body.token);

	if (!tok.valid) {
		res.send({status: "ko", msg: "Token invalid or expired."});
		return;
	}

	let user = await User.findOne({_id: tok.userId});

	user.username = req.body.username;
	user.receiveEmails = req.body.receiveEmails;
	user.save();

	res.send({status: "ok", msg: "User settings successfully updated."});
});

module.exports = router;
module.exports.validateToken = validateToken;
