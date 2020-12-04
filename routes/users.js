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
const user = require('../models/user');
const nev = require('email-verification')(mongoose);
const Feedback = require('../models/courseFeedback');
//const { feedbackSanitize, descriptionSanitize } = require('../processing/sanitizer');
const pProc = require('../processing/public');
const { query } = require('express');
const { count } = require('console');
const SanitizeGeneral = require('../processing/sanitizer').generalSanitize;
const SanitizeFeedback = require('../processing/sanitizer').SanitizeFeedback;
const SanitizeDescription = require('../processing/sanitizer').SanitizeDescription;
// nev.configure({

// })

//Alternate login strategy. ToDo
FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
        clientID: 219387623136934,
        clientSecret: 'be4f994d1e25be7ae2d5e34bb31f5283',
        callbackURL: "/"
    },
    function(accessToken, refreshToken, profile, done) {

        console.log(profile)
        return done(null, profile);
        // });
    }));


//app id: 219387623136934
//app secret: be4f994d1e25be7ae2d5e34bb31f5283
var url = 'mongodb://localhost:27017/lab5web';

//Express setup
router.use(bodyparser.urlencoded({ extended: true }));
router.use(bodyparser.json());

let regStatus = true;


//Implement routing for authenticated users here

//Register logic


//router.post()

router.post('/flagunflag', (req, res) => {
    console.log('here')
    isPublic = req.body.public;
    name = req.body.name;
    creator = req.body.creator;
    Schedule.update({ scheduleName: name, creator: creator }, { $set: { isPublic: isPublic } }).then(data => {
        res.json({ status: "success" })
    })
})
router.post('/register', (req, res, next) => {
        name = SanitizeGeneral(req.body.name);
        email = req.body.email;
        username = SanitizeGeneral(req.body.username);
        password = req.body.password;
        password2 = req.body.password2

        let sdata;
        if (username && name) {
            User.find({ $or: [{ username: username }, { email: email }] }).then((data) => {
                //Executes if no user exists with userame/email entered
                if (data.length == 0) {
                    //make sure all fields full
                    if (name && email && username && password && password2) {
                        const re = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
                        //Email regex
                        if (re.test(email)) {
                            //Passwords match
                            if (password == password2) {
                                //Password is long enough
                                if (password.length > 5) {
                                    //Passed all tests, create user
                                    let newUser = new User({
                                        name: req.body.name,
                                        email: req.body.email,
                                        username: req.body.username,
                                        password: req.body.password,
                                        isFlagged: false
                                    });
                                    //Add user
                                    User.addUser(newUser, (err, user) => {
                                        if (err) res.json({ success: false, message: "failed to register user" })
                                        else res.json({ success: true, message: "user registered successfully" })
                                    });
                                    //Logic based on failure of various tests
                                } else {
                                    res.json({ success: false, message: "please enter a password that is at least 6 charachters" });
                                    res.end();
                                }
                            } else {
                                res.json({ success: false, message: "please enter passwords that match" });
                                res.end();
                            }

                        } else {
                            res.json({ success: false, message: "please enter a valid email" });
                            res.end();
                        }
                    } else {
                        res.json({ success: false, message: "please fill out all fields" });
                        res.end();
                    }
                } else {
                    res.json({ success: false, message: "That email or username is already registered!" })
                }
            })
        } else {
            res.json({ success: false, message: "The data you entered is invalid" });
            res.end();
        }

        //Old
        // let newUser = new User({
        //     name: req.body.name,
        //     email: req.body.email,
        //     username: req.body.username,
        //     password: req.body.password, //Password is exposed here
        //     isFlagged: false
        // });
        //Logic can be added here if the username or email have already been taken
        //console.log(mongoose.model("User").find({ "username": req.body.username }).count())
        //mongoose.model("User").findOne()






    })
    //Update password logic
router.post('/updatepassword', (req, res, next) => {
    //username, email for verification
    let email = req.body.email; //both candidate keys
    let username = req.body.username
    let newPassword = req.body.password;
    //Make sure password is long enough
    if (newPassword.length > 5) {
        //True logic
        User.changePassword(username, email, newPassword);
        res.json({ status: true, message: 'Password updated' })
        res.end()
    } else {
        //False logic
        res.json({ status: false, message: 'Password not updated' })
        res.end()
    }

})
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }))
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {

        scope: ['email']
    }));

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
//Send profile to user, fix jwt config
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({ user: req.user })
});

//Detete schedule logig
router.post('/deleteschedule', /*passport.authenticate('jwt', { session: false }),*/ (req, res, next) => {
    name = req.body.name;
    let user2 = req.body.username
    description = req.body.description
        //console.log(user, name)
        //Check if it exists, delete if it does
    Schedule.findOneAndDelete({ scheduleName: name, creator: user2 }, (err) => {
            if (err) res.json({ status: true, message: "Error deleting schedule" });
            else res.json({ status: true, message: "If a schedule exists under that name, it was deleted" })
            res.end()
        }) //where({scheduleName:name, creator:user})
});

//create schedule logic
router.post('/createschedule', (req, res, next) => {
    const scheduleName = SanitizeGeneral(req.body.name);
    const creator = req.body.creator
    const description = descriptionSanitize(req.body.description)
    let date = new Date();
    let created = date.getFullYear().toString() + '-' + date.getMonth().toString() + '-' + date.getDate().toString()

    //let courses = req.body.courses
    //Add creatopn data
    if (scheduleName && creator) {
        let newSchedule = new Schedule({
            scheduleName: scheduleName,
            courses: [],
            feedback: [],
            creator: creator,
            isPublic: false,
            created: created,
            modified: created,
            description: description

        })
        Schedule.find({ scheduleName: scheduleName, creator: creator }).then((data) => {
            if (data.length == 0) {
                Schedule.find({ creator: creator }).then(data2 => {
                    if (data2.length < 21) {
                        (Schedule.addSchedule(newSchedule, scheduleName, creator, (err, success) => { if (err) { console.log(err) } }))
                        res.json({ message: 'Schedule created successfully' })
                        res.end()
                    } else {
                        res.json({ message: 'You already have too many schedules' })
                        res.end()
                    }
                })


            } else {
                res.json({ message: "Schedule was unsuccedful, you already have one named that" })
                res.end()

            }
        })





    } else {
        res.json({ message: "Schedule was unsuccedful, it needs a name" })

    }
    //console.log(JSON(sessionStorage.getItem('user')).name)
});
router.post('/getfullcourse', (req, res) => {
    //No real user input here
    subject = req.body.subject;
    course = req.body.course;
    res.json({ result: pProc.getFull(subject, course) });

})
router.post('/deletecourse', (req, res, next) => {
    let creator = req.body.creator;
    let course = req.body.coursecode;
    let subject = req.body.subjectcode.toLowerCase();
    let scname = req.body.name;
    let date = new Date();

    let modified = date.getFullYear().toString() + '-' + date.getMonth().toString() + '-' + date.getDate().toString()
        // Schedule.deleteCourse(scname, subject, course, creator, modified);
    Schedule.updateOne({ creator: creator, scheduleName: scname }, { $pull: { courses: { subject: subject, course: course } } }).then(data => {
        Schedule.updateOne({ creator: creator, scheduleName: scname }, { $set: { modified: modified } }).then(data => {
            res.json({ status: "If a course under those descriptions was in the schedule, it has been deleted" })
        })
    })
})
router.post('/changeschedulename', (req, res) => {
    const creator = req.body.creator;
    const name = req.body.name;
})
router.post('/addtoschedule', (req, res, next) => {
    const scheduleName = req.body.name;
    const subjectCode = req.body.subject
    const courseCode = req.body.course;
    const username = req.body.username;
    let date = new Date();

    let modified = date.getFullYear().toString() + '-' + date.getMonth().toString() + '-' + date.getDate().toString()
        //*Add modification data

    let status = Schedule.addToSchedule(scheduleName, username, subjectCode, courseCode, modified)
    if (status) {
        res.json({ message: 'The course has been added to the schedule' });
    } else {
        res.json({ message: 'There was an issue adding the course to the schedule' });
    };
    res.end();
});

router.post('/getuserschedule', (req, res) => {
    const username = req.body.username;
    Schedule.find({ creator: username }).then(data => {
        res.json({ schedules: data });
    })
})

router.post('/updatescheduledescription', (req, res, next) => {
    const scheduleName = req.body.name;
    const creator = req.body.creator;
    const description = descriptionSanitize(req.body.description);
    let date = new Date();
    let modified = date.getFullYear().toString() + '-' + date.getMonth().toString() + '-' + date.getDate().toString();
    console.log(scheduleName, creator, description, modified)
    Schedule.updateDescription(scheduleName, creator, description, modified)
    res.json({ message: "Updated" })
    res.end()

})
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
    //Not in use
    // router.post('/schedulefeedback', (req, res) => {
    //     scheduleName = req.body.scdname;
    //     creator = req.body.username;

// })

router.post('/coursefeedback', (req, res) => {
    creator = req.body.creator
    feedback = feedbackSanitize(req.body.feedback)
    course = req.body.course
    subject = req.body.subject
    Feedback.addFeedback(subject, course, creator, feedback)
})
router.post('/searchschedules', (req, res) => {
    name = req.body.name;
    creator = req.body.creator;
    console.log(name, creator)

    Schedule.find({ scheduleName: name, creator: creator }).then(data => {
        if (data.length != 0) {
            res.json({ status: true });
        } else {
            res.json({ status: false });
        }
    })
})
router.post('/changename', (req, res) => {
    newname = SanitizeGeneral(req.body.newname);
    creator = req.body.creator;
    name = req.body.name
    let date = new Date();
    let created = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString() + '-' + date.getDate().toString()
    if (newname) {
        Schedule.updateOne({ scheduleName: name, creator: creator }, { $set: { scheduleName: newname, modified: created } }).then(data => {
            res.json({ status: true })
        })
    } else {
        res.json({ status: false })
    }
})


//Create more routes here
module.exports = router;