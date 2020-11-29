const mongoose = require('mongoose')
const config = require('../config/database');
const pjs = require('../processing/private');
const { db } = require('./user');
const User = require('./user')
const SchedulesSchema = mongoose.Schema({
    scheduleName: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    courses: {
        type: Array
    }
});
const Schedule = module.exports = mongoose.model('schedules', SchedulesSchema);

module.exports.addSchedule = (newSchedule, callback) => {
    newSchedule.save(callback);
}

module.exports.addToSchedule = (name, creator, subjectCode, courseCode) => {
    if (name && creator && subjectCode && courseCode) {
        if (pjs.courseExists(subjectCode, courseCode)) {
            //True logic
            Schedule.updateOne({ "scheduleName": name, "creator": creator }, { $addToSet: { 'courses': { subject: subjectCode, course: courseCode } } }, (err, success) => {
                if (err) {
                    return false
                } else {
                    return true
                }
            })

            //Schedule.find({ name: name, creator: creator }).courseCode.push('Here')
            console.log('Added')
                //console.log(Schedule.length)
            return true;
        } else {
            //console.log('Herefds')

            return false;

        }
    } else {
        return false
    }
}