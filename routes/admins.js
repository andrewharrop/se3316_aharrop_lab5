const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bodyparser = require('body-parser')
const config = require('../config/database');
const Admin = require('../models/admin');
const { raw } = require('body-parser');

const router = express.Router()

router.use(bodyparser.urlencoded({ extended: true }));
router.use(bodyparser.json());



//Implement routing for authenticated users here
router.post('/register', (req, res, next) => {
    let newAdmin = new Admin({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password, //Password is exposed here
    });
    Admin.addAdmin(newAdmin, (err, admin) => {
        if (err) res.json({ success: false, message: "failed to register user" })
            //Some logic must be added here if user is already registered
        else res.json({ success: true, message: "user registered successfully" })
    })
})



//Admin login portal
router.post('/auth', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    Admin.getAdminByEmail(email, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({ success: false, msg: 'User not found' })

        Admin.comparePassword(password, user.password, (err, isMatch) => {
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
//Admin level routing
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => res.json({ user: req.user }));

module.exports = router