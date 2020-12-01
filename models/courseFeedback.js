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
const Feedback = module.exports = mongoose.model("feebback", CourseFeedback)

module.exports.addFeedback = (subject, course, creator, feedback) => {
    //make sure combonation exists
    Feedback.find({ subject: subject, course: course }).then((data) => {
        if (data.length == 0) {
            feedbackS = new CourseFeedback({
                subject: subject,
                course: course,
                feedback: [{ creator: creator, feedback: feedback }]
            })
            feedbackS.save()
        } else {
            Feedback.update({ subject: subject, course: course }, { $addToSet: { feedback: { creator: creator, feedback: feedback } } })
        }
    })
}