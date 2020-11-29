const schedules = require("../models/schedules");

const subjectData = require('../resources/Lab5-subject-data.json');
const timetableData = require('../resources/Lab3-timetable-data.json');

module.exports.courseExists = (query, course) => {
    let found = null;
    //console.log('hereff')
    course = course.toString().toUpperCase();
    //console.log(course)
    if (query && course) {
        Object.keys(subjectData).forEach((key) => {
            if (query.toUpperCase() == key) {
                found = subjectData[key];
            }
        })
    } else {
        return false;
    }
    if (found) {
        let res;
        for (let x = 0; x < timetableData.length; x++) {
            if (course == (timetableData[x]['catalog_nbr']).toString().toUpperCase() && timetableData[x].subject.toString() == query) {


                //console.log('here')
                //res = [timetableData[x]['subject'], timetableData[x]['catalog_nbr'], timetableData[x]['className'],
                //    timetableData[x]['course_info'][0]['class_section'], timetableData[x]['course_info'][0]['ssr_component']
                //]
                return true



            }


        }
    } else {
        return false;
    }

}