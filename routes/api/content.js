const express = require("express");
const router = express.Router();
const fs = require('fs');
const mongoose = require('mongoose');
const Schema = require("mongoose");

secret = fs.readFileSync("./secret.txt");

mongoose.connect("mongodb+srv://shortener:" + secret + "@42cluster-un8uy.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true})
    .then(() => console.log("Connected to mongo!"));

const Post = mongoose.model('Post', {
    created: {type: Date, default: Date.now},
    media: {type: String},
    userId: {type: mongoose.Types.ObjectId, ref: "User"},
    likes: [{type: Schema.Types.ObjectId, default: '[]'}],
});

function validateToken(token) {
    return token === "good_token";
}

router.route("/upload").post(function(req, res) {
    if (validateToken(req.body.token)) {
        console.log(req.body);
        res.send();
    }
    res.send({status: "ko"});
});

module.exports = router;