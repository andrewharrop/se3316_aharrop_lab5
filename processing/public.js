const subjectData = require('../resources/Lab5-subject-data.json');
const timetableData = require('../resources/Lab3-timetable-data.json');

module.exports.unauthSearch = (query, course) => {
    let found = null;
    //console.log(typeof course)
    // try {
    //     course = parseInt(course)
    // } catch (err) {

    // }
    // console.log(course)
    //console.log(typeof course)
    //if (/[a-zA-Z]/.test(course.charAt(course.length - 1))) {
    //   course = course.toUpperCase()

    // } else {
    //   course = parseInt(course);
    course = course.toString().toUpperCase()
        //console.log(course)
        //console.log(course)

    if (query && course) {
        Object.keys(subjectData).forEach((key) => {
            if (query.toUpperCase() == key) {
                found = subjectData[key];
            }


        })
    } else {
        return "Invalid Query"
    }
    if (found) {

        let res;
        for (let x = 0; x < timetableData.length; x++) {
            if (course == (timetableData[x]['catalog_nbr']).toString().toUpperCase()) {
                if (timetableData[x].subject == query.toUpperCase()) {

                    res = [timetableData[x]['subject'], timetableData[x]['catalog_nbr'], timetableData[x]['className'],
                        timetableData[x]['course_info'][0]['class_section'], timetableData[x]['course_info'][0]['ssr_component']
                    ]
                    return res
                }


            }
            if (res) {
                return res;
            }

        }
        //else return "No entry found for the query provided"
    }
    // return "No results match the query provided"
    //Try second query here:
    else {
        return "No entry found for the query provided"
    }


}