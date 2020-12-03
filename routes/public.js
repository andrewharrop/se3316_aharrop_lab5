const express = require('express');
const bodyparser = require('body-parser')
const config = require('../config/database');
//const { query } = require('express');
const processing = require('../processing/public')
const Schedule = require('../models/schedules');
const Feedback = require('../models/courseFeedback');
const router = express.Router()
router.use(bodyparser.urlencoded({ extended: true }));
router.use(bodyparser.json());

router.post('/unauthsearch', (req, res, next) => {
    const query = req.body.query
    const course = req.body.course
        //console.log(query)
    let ret_ = processing.unauthSearch(query, course)
        //Feedback here, as async
        //if (typeof(ret_) == Object) {}
        //console.log(ret_)
    Feedback.find({ subject: query, course: course }).then(data => {
            console.log(data)
            if (data.length == 0) {
                res.json({ value: ret_ })
            } else {
                res.json({ value: ret_, feedback: data })
                res.end()


            }
        })
        //console.log('HERE')
})
router.get('/schedules', (req, res) => {

    Schedule.find({ isPublic: true }).then(data => {

        res.json({ message: data });
    })
})

module.exports = router