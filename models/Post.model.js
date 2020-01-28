const mongoose = require('mongoose');
const Schema = require("mongoose");

const Post = mongoose.model('Post', {
    created: {type: Date, default: Date.now},
    media: {type: String},
    userId: {type: mongoose.Types.ObjectId, ref: "User"},
    likes: [{type: Schema.Types.ObjectId, default: '[]'}],
});

module.exports = Post;