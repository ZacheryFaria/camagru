const mongoose = require('mongoose');

const Comment = mongoose.model('Comment', {
    created: {type: Date, default: Date.now},
	userId: {type: mongoose.Types.ObjectId, ref: "User"},
	message: {type: String, required: true},
	postId: {type: mongoose.Types.ObjectId, ref: "Post"},
});

module.exports = Comment;