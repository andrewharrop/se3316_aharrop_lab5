const mongoose = require('mongoose')

const SchedulesSchema = mongoose.Schema({
    scheduleName: {
        type: String,
        required: true
    },
    creator: {
        type: String
    },
    courses: {
        type: Array
    }
});