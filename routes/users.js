const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bodyparser = require('body-parser')
const config = require('../config/database');
const User = require('../models/user');
const mongoose = require('mongoose');
const Schedule = require('../models/schedules');
const router = express.Router()
const mongo = require('mongodb');
const assert = require('assert');
const e = require('express');
var url = 'mongodb://localhost:27017/lab5web';

router.use(bodyparser.urlencoded({ extended: true }));
router.use(bodyparser.json());

let regStatus = true;

//Implement routing for authenticated users here
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password, //Password is exposed here
        isFlagged: false
    });
    //Logic can be added here if the username or email have already been taken
    //console.log(mongoose.model("User").find({ "username": req.body.username }).count())
    //mongoose.model("User").findOne()



    if (req.body.password != req.body.password2) {
        res.json({ success: false, message: "Passwords do not match" })
        res.end();
        return; //Make sure passwords match
    }
    User.addUser(newUser, (err, user) => {
        if (err) res.json({ success: false, message: "failed to register user" })
            //Some logic must be added here if user is already registered
        else res.json({ success: true, message: "user registered successfully" })
    })

})

router.post('/auth', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.find({ email: email }).then(data => {
        if (data[0].isFlagged == false) {
            User.getUserByEmail(email, (err, user) => {
                if (err) throw err;
                if (!user) return res.json({ success: false, message: 'User not found' })

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
                            },
                            message: "Success"
                        });

                    } else return res.json({ success: false, message: "Wrong password" });
                });

            });
        } else {
            res.json({ success: false, message: "User account is flagged, please contact an administrator" })
        }
    })



});

router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {

    res.json({ user: req.user })
});
router.post('/deleteschedule', /*passport.authenticate('jwt', { session: false }),*/ (req, res, next) => {
    name = req.body.name;
    user = req.body.username
    console.log(user, name)
    Schedule.findOneAndDelete({ scheduleName: name, creator: user }, (err) => {
            if (err) res.json({ status: true, message: "Error deleting schedule" });
            else res.json({ status: true, message: "If a schedule exists under that name, it was deleted" })
            res.end()
        }) //where({scheduleName:name, creator:user})
})
router.post('/createschedule', (req, res, next) => {
    const scheduleName = req.body.name;
    const creator = req.body.creator
        //let courses = req.body.courses

    if (scheduleName && creator) {
        let newSchedule = new Schedule({
            scheduleName: scheduleName,
            courses: [],
            feedback: [],
            creator: creator,
            isPublic: true,
        })
        Schedule.addSchedule(newSchedule, (err, success) => {
            if (err) {
                console.log(err)
            } else {
                console.log('should')
            }
        })
        res.json({ message: "Schedule  was succseeful" })

        //res.json({ message: 'Schedule created successfully' })
    } else {
        res.json({ message: "Schedule  was unsuccedful" })
    }
    res.end()
        //console.log(JSON(sessionStorage.getItem('user')).name)
});

router.post('/addtoschedule', (req, res, next) => {
    const scheduleName = req.body.name;
    const subjectCode = req.body.subject;
    const courseCode = req.body.course;
    const username = req.body.username;
    let status = Schedule.addToSchedule(scheduleName, username, subjectCode, courseCode)
    if (status) {
        res.json({ message: 'The course has been added to the schedule' });
    } else {
        res.json({ message: 'There was an issue adding the course to the schedule' });
    };
    res.end();
});

router.get('/publicschdedules', (req, res) => {
    // var resultArray = [];
    // mongo.connect(url, function(err, db) {
    //     assert.strictEqual(null, err);
    //     var curser = db.collection('schedules').find();
    //     curser.forEach(function(doc, err) {
    //             assert.strictEqual(null, err);
    //             resultArray.push(doc);
    //         },
    //         function() {
    //             res.json({ data: resultArray })
    //         }
    //     )
    // })
    Schedule.find({ isPublic: true }).then((data) => {
        res.json(data)
    })

    //console.log(results)
    //res.json({ result: results })
    //res.end()
})

router.get('myschdedules', (req, res) => {
    name = req.body.username;
    Schedule.find({ creator: username }).then((data) => {
        res.json(data);
    })
})
router.post('/schedulefeedback', (req, res) => {
    scheduleName = req.body.scdname;
    creator = req.body.username;

})


//Create more routes here
module.exports = router;