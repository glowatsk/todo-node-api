const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

// create a new user schema

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
})

// Creating a new user object to not return the password just picks the ID and the email
UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({ _id: user._id.toHexString(), access}, 'abc123').toString();

    user.tokens = user.tokens.concat([{ access, token }]);

    return user.save().then(() => {
        return token;
    });
};

UserSchema.methods.removeToken = function (token) {
    var user = this;

    return user.update({
        $pull:{
            tokens: {token}
        }
    });
};

UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;

    // Try / Catch block to verify the token
    try {
        decoded = jwt.verify(token, 'abc123');
    } catch (e) {
        return Promise.reject();
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });

};

<<<<<<< HEAD
UserSchema.statics.findByCredentials = function (email, password) {
    var User = this;

    User.findOne({email})
};

=======

UserSchema.statistics.findByCredentials = function (email, password) {
    var User = this;

    return User.findOne({email}).then((user) => {
        if (!user) {
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    resolve(user);
                } else {
                    reject();
                }
            });
        });
    });
}
>>>>>>> b5ca10dcf5e680ee5ac3767ac288094b2c4e70a2
//Mongo middleware runs before items hit the database

UserSchema.pre('save', function (next) {
    var user = this;

    if (user.isModified('password')) {
        //Generate a salt with bcrypt
        bcrypt.genSalt(10, (err, salt) => {
            //Hash using the generate salt
            bcrypt.hash(user.password, salt, (err, hash) => {
                //Set user.password to hash value
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

//create new user mongoose model
var User = mongoose.model('User', UserSchema);

module.exports = { User };