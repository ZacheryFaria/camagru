const express = require("express");
const router = express.Router();

router.route("/login").post(function(req, res) {
	const body = req.body;

	// real logic plz
	if (body.username === "good" && body.password === "good") {
		res.send({status: "ok", token: "good_token"});
	} else {
		res.send({status: "ko", token: "bad_token"});
	}
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