const mongoose = require('mongoose');

const Like = mongoose.model('Like', {
    postId: {type: mongoose.Types.ObjectId, ref: "Post"},
    userId: {type: mongoose.Types.ObjectId, ref: "User"},
});

module.exports = Like;