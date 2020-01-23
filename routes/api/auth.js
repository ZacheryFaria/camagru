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

module.exports = router;