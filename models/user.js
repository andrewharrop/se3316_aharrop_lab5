const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config/database')
const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isFlagged: {
        type: Boolean,
        required: true
    }
})

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = (id, callback) => {
    User.findOne(id, callback)
}
module.exports.getUserByEmail = (email, callback) => {
    const query = { email: email };
    return User.findOne(query, callback);
};
module.exports.getUserByUsername = (username, callback) => {
    const query = { username: username };
    return User.findOne(query, callback);

};
module.exports.addUser = (newUser, callback) => {
    //Need to make sure user does not already exist in table
    let userNotExists = true;

    if (userNotExists) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                newUser.password = hash;
                newUser.save(callback);
            });
        });
    } else {
        //User already exists logic
    };
};

module.exports.comparePassword = (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
};