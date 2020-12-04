const subjectData = require('../resources/Lab5-subject-data.json');
const timetableData = require('../resources/Lab3-timetable-data.json');

module.exports.getFull = (subject, course) => {
    try {
        let setter = false;
        course = course.toString().toUpperCase()
        for (let i = 0; i < timetableData.length; i++) {
            if (!setter) {
                if (timetableData[i].subject == subject.toUpperCase() && timetableData.catalog_nbr.toString().toUpperCase() == course) {
                    setter = true

                    return timetableData[i];
                }
            } else {
                break;
            }

        }
        return false;
    } catch {
        return false
    }

}

module.exports.unauthSearch = (query, course) => {
    let found = null;
    //Add sanitization
    //Consistent format
    course = course.toString().toUpperCase()

    //Make sure user entered something
    if (query && course) {
        Object.keys(subjectData).forEach((key) => { //make sure that there is a course that matched query
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

                    res = [timetableData[x]]
                    return res //Look for matching course/subject in timetable
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