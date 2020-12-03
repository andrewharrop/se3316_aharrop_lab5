const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config/database');
const passport = require('passport');
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
//module.exports.changeFlagged = (username)

module.exports.changePassword = (username, email, password) => {
    User.find({ username: username, email: email }).then(data => {
        if (data.length > 0) {
            let hashed; //same as normal hashing
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    hashed = hash
                    User.update({ username: username, email: email }, { $set: { password: hashed } }).then((data) => {
                        console.log(`Password update for ${username}`)
                    })

                });
            });
        }
    })
}

//Compare passwords
module.exports.comparePassword = (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
};

//Flag user logic
module.exports.setFlagged = (username, flagged) => {
    if (typeof(flagged) == Boolean) {
        User.find({ username: username }).then(data => {
            if (data.length == 1) {
                User.update({ username: username }, { $set: { isFlagged: flagged } }).then(data => {
                    return true;
                })
                return false;
            }
        })
    }
}