/**
* Courses.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {


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
      model: 'Major',
      required: true
    },

    level: {
      type: 'integer',
      required: true
    },

    credits:{
      type: 'integer',
      required: true
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
    }

  },

  beforeCreate: function(values, callback){
    //Check if course already exists
    //Find if school exists
    //Find if major exists
    console.log(values);
    Course.findOne()
    .where({ courseId: values.courseId })
    .then(function(course){
      if(course) throw 'Error.Course.AlreadyExists';
      else{
        School.findOne()
        .where({ id: values.school })
        .then(function(school){
          console.log(school);
          if(!school) callback('Error.School.NotFound'); //beacuse throws in nested promises don't get caught by outer catch method
        });
      }
    })
    .then(function(){
      Major.findOne()
      .where({ id: values.major })
      .then(function(major){
        if(!major) callback('Error.Major.NotFound');
        callback();
      });
    })
    .catch(function(err){
      // console.log(err);
      callback(err);
    });


  }
};

