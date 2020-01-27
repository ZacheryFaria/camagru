const express = require("express");
const router = express.Router();
const fs = require('fs');
const mongoose = require('mongoose');
const Schema = require("mongoose");
const uniqueFilename = require('unique-filename')


const Post = mongoose.model('Post', {
    created: {type: Date, default: Date.now},
    media: {type: String},
    userId: {type: mongoose.Types.ObjectId, ref: "User"},
    likes: [{type: Schema.Types.ObjectId, default: '[]'}],
});

function validateToken(token) {
    if (token === "good_token") {
        return {
            valid: true,
            userId: "user"
        }
    } else {
        return {
            valid: false
        }
    }
}

router.route("/upload").post(function(req, res) {
    let user = validateToken(req.body.token);

    if (user.valid === false) {
        return;
    }
    console.log(req.body);

    const randomFile = uniqueFilename("./store", "user");

    fs.writeFile(randomFile, req.body.data, err => {
        console.log(err);
    });

    console.log(randomFile.split("\\")[1]);

    var post = new Post({
        media: randomFile.split("\\")[1],
        userId: user.userId
    });

    console.log(post);


    res.send();
});

module.exports = router;