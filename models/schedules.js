const mongoose = require('mongoose');
const { async } = require('rxjs');
const config = require('../config/database');
const pjs = require('../processing/private');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');


const url = 'mongodb://localhost:27017';
const dbName = 'lab5web';

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
    },
    isPublic: {
        type: Boolean,
        required: true
    },
    feedback: {
        type: Array
    },
    created: {
        type: String,
        required: true
    },
    modified: {
        type: String
    },
    description: {
        type: String
    }
});
const Schedule = module.exports = mongoose.model('schedules', SchedulesSchema);

module.exports.addSchedule = (newSchedule, name, creator, callback) => {
    //add limit to creations here
    let created = false;
    Schedule.find({ scheduleName: name, creator: creator }).then((data) => {
        if (data.length == 0) {
            newSchedule.save(callback);
            created = true;
        } else {
            created = false;
        }

    }).then(() => {
        //return created;

    })
}
module.exports.deleteCourse = (scheduleName, subject, course, creator, modified) => {
    //add modified data
    Schedule.update({ creator: creator, scheduleName: scheduleName }, { $pull: { courses: { subject: subject, course: course } } }, { $set: { modified: modified } })
}
module.exports.changeName = (creator, name) => {
    Schedule.update({ scheduleName: name, creator: creator }, { $set: { scheduleName: name } });
}
module.exports.updateDescription = (scheduleName, username, description, modified) => {
    Schedule.update({ scheduleName: scheduleName, creator: username }, { $set: { description: description, modified: modified } }).then(
        console.log('updated')

    )
}

module.exports.enumerateSchedules = () => {


    let results;

    // mongoose.model('schedules').find().where({ isPublic: true }).exec((err, docs) => {
    //     return results

    // })
    mongoose.model('schedules').find().where({ isPublic: true }).exec((err, docs) => {
        return "RET"

    })
}

module.exports.addToSchedule = (name, creator, subjectCode, courseCode, modified) => {
    if (name && creator && subjectCode && courseCode) {
        if (pjs.courseExists(subjectCode, courseCode)) {
            //True logic
            Schedule.updateOne({ "scheduleName": name, "creator": creator }, { $addToSet: { 'courses': { subject: subjectCode, course: courseCode } }, modified: modified }, (err, success) => {
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