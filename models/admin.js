const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config/database')
const AdminSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const Admin = module.exports = mongoose.model('Admin', AdminSchema);

module.exports.getAdminById = (id, callback) => {
    Admin.findOne(id, callback)
}
module.exports.getAdminByEmail = (email, callback) => {
    const query = { email: email };
    Admin.findOne(query, callback);
};

//This stays commented out unless we need to add another admin
module.exports.addAdmin = (newAdmin, callback) => {
    //Need to make sure user does not already exist in table
    let adminNotExists = true;

    if (adminNotExists) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newAdmin.password, salt, (err, hash) => {
                newAdmin.password = hash;
                newAdmin.save(callback);
            });
        });
    } else {
        //User already exists logic
    };
};

module.exports.comparePassword = (candidatePassword, hash, callback) => {
    bcrypt.compare(canSdidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
};