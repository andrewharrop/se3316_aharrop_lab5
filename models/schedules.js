const mongoose = require('mongoose')
const config = require('../config/database')

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
const Schedule = module.exports = mongoose.model('Schedule', SchedulesSchema);

module.exports.addSchedule = (newSchedule, callback) => {

    newSchedule.save(callback);
}