/**
 * SchoolsController
 *
 * @description :: Server-side logic for managing schools
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  read: function(req, res){
    var schoolId = req.param('id');
        //If requesting a specific school with id
        if (schoolId) {
            findOneSchoolWithId(schoolId, function(err, school) {
              if(school)
                res.send(school);
              else
                res.json({ error: 'Error.School.NotFound' });
            });
        } else {
            //No schoolId was given
            findAllSchools(function(err, schools) {
              if(err) res.json({ error: err });
                res.send(schools);
            })
        }
  }

};

//Finds and populates school with given courseId
function findOneSchoolWithId(schoolId, callback) {
    School.findOne()
    .where({
        id: schoolId
    })
    .populate('professors')
    .populate('courses')
    .populate('students')
    .exec(function(err, school) {
        callback(err, school);
    });
}
//Returns all schools (returns all schools and attributes populated)
function findAllSchools(callback) {
    School.find()
    .populate('professors')
    .populate('courses')
    .populate('students')
    .exec(function(err, schools) {
        callback(err, schools);
    })
}
