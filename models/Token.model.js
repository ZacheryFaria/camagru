const mongoose = require('mongoose');

const Token = mongoose.model('Token', {
    expires: {type: Date, default: (Date.now() + 24*60*60*1000)},
    userId: {type: mongoose.Types.ObjectId, ref: "User"},
});

module.exports = Token;