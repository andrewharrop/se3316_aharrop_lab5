const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bodyparser = require('body-parser')
const config = require('../config/database');
const Admin = require('../models/admin');
const User = require('../models/user');
const user = require('../models/user');
const router = express.Router()
const SanitizeGeneral = require('../processing/sanitizer').generalSanitize

router.use(bodyparser.urlencoded({ extended: true }));
router.use(bodyparser.json());



//Implement routing for authenticated users here
router.post('/registeradmin', (req, res) => {
    console.log('here')
    console.log(req.body.cUsername, req.body.cEmail)

    email = req.body.email;
    username = SanitizeGeneral(req.body.username);
    password = req.body.password;
    whoUsername = req.body.cUsername;
    whoEmail = req.body.cEmail;
    if (email && username && password && whoUsername && whoEmail) {
        const re = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if (re.test(email)) {
            if (password.length > 5) {
                Admin.find({ username: whoUsername, email: whoEmail }).then(data => {
                    if (data.length != 0) {
                        Admin.find({ creator: whoUsername }).then(data3 => {
                            if (data3.length <= 1) {
                                Admin.find({ email: email, username: username }).then(data2 => {
                                    if (data2.length == 0) {
                                        let newAdmin = new Admin({
                                            email: email,
                                            username: username,
                                            password: password,
                                            creator: whoUsername
                                        });
                                        Admin.addAdmin(newAdmin, (err, admin) => {
                                            res.json({ status: true, message: "Admin created successfully" })
                                            res.end()
                                            return
                                        })
                                    } else {
                                        res.json({ status: false, message: "User already exists!" })
                                        res.end()
                                        return
                                    }
                                })
                            } else {
                                res.json({ status: false, message: "Current user had created too many admin!" })
                                res.end()
                                return
                            }
                        })


                    } else {
                        res.json({ status: false, message: "Current user does not have correct configuration!" })
                        res.end()
                        return

                    }

                })
            } else {
                res.json({ status: false, message: "Password not long enough" })
                res.end()
                return
            }

        } else {
            res.json({ status: false, message: "Incorrect email format" })
            res.end()
            return

        }
    } else {
        res.json({ status: false, message: "Missing fields" })
        res.end()
        return
    }






})



//Admin login portal
router.post('/auth', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    Admin.getAdminByEmail(email, (err, admin) => {
        if (err) throw err;
        if (!admin) return res.json({ success: false, msg: 'User not found' })

        Admin.comparePassword(password, admin.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign({ admin }, config.secret, { expiresIn: 60000 });
                res.json({
                    success: true,
                    token: 'jwt ' + token,
                    admin: {
                        id: admin.user_id,

                        username: admin.username,
                        email: admin.email,

                    },
                    msg: "Success"
                });
            } else return res.json({ success: false, msg: "Wrong password" });
        });

    });
});
//Retrive list of users
router.get('/listusers', (req, res) => {
        console.log('get')
        User.find({}).then(data => {
                res.json({ data: data })
                res.end()
            }

        )
    })
    //view admin profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => res.json({ user: req.user }));

router.post('/flagchange', (req, res) => {
    username = SanitizeGeneral(req.body.username);

    User.find({ username: username }).then(data => {
        if (data.length == 1) {
            res.json({ status: true });
        } else {
            res.json({ status: false });
        }
        res.end()
    })
});
router.post('/flagchange2', (req, res) => {
    username = req.body.username;
    flagged = req.body.flagged
    User.find({ username: username }).then(data => {
        if (data.length != 0) {
            User.update({ username: username }, { $set: { isFlagged: flagged } }).then(datamore => {
                res.json({ status: true });
                res.end()
            })
        } else {
            res.json({ status: false });
            res.end()
        }
    })


})

module.exports = router