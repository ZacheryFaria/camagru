const mongoose = require('mongoose');

const PasswordReset = mongoose.model('PasswordReset', {
    expires: {type: Date, default: (Date.now() + 24*60*60*1000)},
    userId: {type: mongoose.Types.ObjectId, ref: "User"},
});

module.exports = PasswordReset;