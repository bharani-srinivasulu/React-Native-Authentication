var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    id: Number,
    title: String,
    content: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
