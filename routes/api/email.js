const nodemailer = require("nodemailer");
const fs = require("fs");
const EmailVerify = require("../../models/EmailVerify.model");
const PasswordReset = require("../../models/PasswordReset.model");

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

async function sendCommentMail(owner, sender, post) {
	let url = `http://localhost:3000/post/${post._id}`;
	if (owner.receiveEmails) {
		if (owner.email !== sender.email) {
			sendEmail(owner.email, "Somebody commented on your post!", `${sender.username} commented on your post! ${url}`);
		}
	}
}

async function sendPasswordReset(user) {
	let tok = await PasswordReset.create({userId: user._id});

	let url = `http://localhost:3000/passwordreset/${tok._id}`;

	sendEmail(user.email, "Password reset link.", `Use this link to reset your password ${url}`);
}

module.exports.sendEmail = sendEmail;
module.exports.sendConfirmationMail = sendConfirmationMail;
module.exports.sendCommentMail = sendCommentMail;
module.exports.sendPasswordReset = sendPasswordReset;