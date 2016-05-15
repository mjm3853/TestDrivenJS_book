var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportlocal = require("passport-local");

var UserDetail = new Schema({
    username: String,
    name: String,
    password: String,
    email: String
}, {
    collection: 'users'
});

var UserDetails = mongoose.model('users', UserDetail);

module.exports = UserDetails;