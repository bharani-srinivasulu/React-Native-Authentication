var mongoose = require('mongoose');

var UserRecords = mongoose.Schema({
    email_id: String,
    password: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('UserRecords', UserRecords);
