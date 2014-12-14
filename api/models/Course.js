/**
* Courses.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  schema: true,

  attributes: {
    name:{
      type: 'string',
      required: true
    },

    courseId: {
      type: 'string',
      required: true
    },

    description: {
      type: 'string'
    },

    major: {
      model: 'Major'
    },

    level: {
      type: 'integer'
    },

    credits:{
      type: 'integer'
    },

    sections: {
      collection: 'section',
      via: 'course'
    },

    school: {
      model: 'School',
      required: true
    },

    majorOnly:{
      type: 'boolean'
    },

    offered:{
      type: 'string'
    },

    prereqs:{
      collection: 'course',
      via: 'requiredFor'
    },

    requiredFor:{
      collection: 'course',
      via: 'prereqs',
      dominant: true
    },

    hardness:{
      type:'integer'
    },
    rating:{
      type:'integer'
    },

  },

  beforeCreate: function(values, callback){
    //Check if course already exists
    //Find if school exists
    //Find if major exists
    console.log(values);
    Course.findOne()
    .where({ courseId: values.courseId, school: values.school })
    .then(function(course){
      if(course) throw 'Error.Course.AlreadyExists';
      else{
        School.findOne()
        .where({ id: values.school })
        .then(function(school){
          console.log(school);
          if(!school) callback('Error.School.NotFound'); //beacuse throws in nested promises don't get caught by outer catch method
          callback();
        });
      }
    })
    // .then(function(){
    //   Major.findOne()
    //   .where({ id: values.major })
    //   .then(function(major){
    //     if(!major) callback('Error.Major.NotFound');
    //     callback();
    //   });
    // })
    .catch(function(err){
      // console.log(err);
      callback(err);
    });
  },


  beforeUpdate: function(values, callback){
    Course.findOne({ id: 0})
    .then(function(){
      if(values.sections){
        callback('Error.Course.IncorrectModel');
      }
    })
    .then(function(){
      if(values.major){
        console.log('Major');
        var major = values.major;
        findOneMajorWithId(major, function(err, major){
          if(err) callback(err);
          if(!major) callback('Error.Major.NotFound');
          return;
        });
      }
    })
    .then(function(){
      if(values.school){
        console.log('School');
        var school = values.school;
        findOneSchoolWithId(school, function(err, school){
          if(err) callback(err);
          if(!school) callback('Error.School.NotFound');
          return;
        });
      }
    })
    .then(function(){
      console.log('Callback');
      callback();
    })
    .catch(function(err){
      callback(err);
    });
  }
};



function findOneSectionWithId(sectionId, callback){
  Section.findOne()
  .where( { id: sectionId })
  .exec(function(err, section){
    callback(err, section);
  });
}

//Finds major with id
function findOneMajorWithId(majorId, callback) {
    Major.findOne()
    .where({
        id: majorId
    })
    .exec(function(err, major) {
        callback(err, major);
    });
}

//Finds and populates school with given courseId and doesn't populate
function findOneSchoolWithId(schoolId, callback) {
    School.findOne()
    .where({
        id: schoolId
    })
    .exec(function(err, school) {
        callback(err, school);
    });
}
