/**
 * CoursesController
 *
 * @description :: Server-side logic for managing courses
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
module.exports = {
    read: function(req, res) {
        var courseId = req.param('id');
        //If requesting a specific course with id
        if (courseId) {
            findOneCourseWithId(courseId, function(err, course) {
              if(course)
                res.send(course);
              else
                res.json({ error: 'Error.Course.NotFound' });
            });
        } else {
            //No courseId was given
            findAllCourses(function(err, courses) {
              if(err) res.json({ error: err });
                res.send(courses);
            })
        }
    }
};

//Finds an populates course with given courseId
function findOneCourseWithId(courseId, callback) {
    Course.findOne()
    .where({
        id: courseId
    })
    .populate('school')
    .populate('sections')
    .populate('prereqs')
    .populate('requiredFor')
    .exec(function(err, course) {
        callback(err, course);
    });
}
//Returns all courses (For now it returns all courses in db, but should be changed in the future)
function findAllCourses(callback) {
    Course.find()
    .populate('school')
    .populate('sections')
    .populate('prereqs')
    .populate('requiredFor')
    .exec(function(err, courses) {
        callback(err, courses);
    })
}