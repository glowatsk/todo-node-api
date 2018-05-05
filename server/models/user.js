
var mongoose = require('mongoose');

//create new user mongoose model
var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }});

module.exports = {User};