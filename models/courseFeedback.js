const mongoose = require('mongoose');
const { async } = require('rxjs');
const config = require('../config/database');
const pjs = require('../processing/private');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');


const url = 'mongodb://localhost:27017';
const dbName = 'lab5web';

const CourseFeedback = mongoose.Schema({
    subject: {
        type: String
    },
    course: {
        type: String
    },
    feedback: {
        type: Array,
        default: []
    }
});
const Feedback = module.exports = mongoose.model("feedback", CourseFeedback)

module.exports.addFeedback = (subject, course, creator, feedback) => {
    //make sure combonation exists
    if (pjs.courseExists(subject, course)) {
        Feedback.find({ subject: subject, course: course }).then((data) => {
            if (data.length == 0) {
                feedbackS = new Feedback({
                    subject: subject,
                    course: course,
                    feedback: [{ creator: creator, feedback: feedback }]
                })
                feedbackS.save()
            } else {
                console.log('update')
                Feedback.updateOne({ subject: subject, course: course }, { $push: { feedback: { creator: creator, feedback: feedback } } }).then(data => {
                    console.log(data)
                })
            }
        })
    }

}