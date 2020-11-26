const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bodyparser = require('body-parser')
const config = require('../config/database');
const User = require('../models/user');

const router = express.Router()

router.use(bodyparser.urlencoded({ extended: true }));
router.use(bodyparser.json());


//Implement routing for authenticated users here
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password, //Password is exposed here
        isFlagged: req.body.isFlagged
    });
    User.addUser(newUser, (err, user) => {
        if (err) res.json({ success: false, message: "failed to register user" })
            //Some logic must be added here if user is already registered
        else res.json({ success: true, message: "user registered successfully" })
    })
})

router.post('/auth', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.getUserByEmail(email, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({ success: false, msg: 'User not found' })

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign({ user }, config.secret, { expiresIn: 60000 });
                res.json({
                    success: true,
                    token: 'jwt ' + token,
                    user: {
                        id: user.user_id,
                        name: user.name,
                        username: user.username,
                        email: user.email,
                        flagged: user.isFlagged
                    }
                });
            } else return res.json({ success: false, msg: "Wrong password" });
        });

    });
});

router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => res.json({ user: req.user }));


//Create more routes here
module.exports = router;