const mongoose = require('mongoose');

const EmailVerify = mongoose.model('EmailVerify', {
    expires: {type: Date, default: (Date.now() + 24*60*60*1000)},
    userId: {type: mongoose.Types.ObjectId, ref: "User"},
});

module.exports = EmailVerify;