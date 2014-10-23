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
  },

  // beforeUpdate: function(values, callback){
  //   console.log(this);
  //   try{
      // if(values.sections){
      //   var sections =  values.sections;
      //   sections.forEach(function(element){
      //     findOneSectionWithId(element, function(err, section){
      //       if(err) throw err;
      //       if(!section) throw 'Error.Section.NotFound';
      //     })
      //   });
      // }
      // if(values.major){
      //   var major = values.major;
      //   findOneMajorWithId(major, function(err, major){
      //     if(err) throw err;
      //     if(!major) throw 'Error.Major.NotFound';
      //   });
      // }
      // if(values.school){
      //   var school = values.school;
      //   findOneSchoolWithId(school, function(err, school){
      //     if(err) throw err;
      //     if(!school) throw 'Error.School.NotFound';
      //   });
      // }
  //   }catch(err){
  //     callback(err)
  //   }
  // },

  beforeUpdate: function(values, callback){
    try{
      console.log(values);
      Course.findOne({ id: 0})
      .then(function(){
        if(values.sections){
          var sections =  values.sections;
          sections.forEach(function(element){
            console.log(element);
            findOneSectionWithId(element, function(err, section){
              console.log(section);
              if(err) throw err;
              if(!section) throw 'Error.Section.NotFound';
              return;
            });
          });
        }else return;
      })
      .then(function(){
        if(values.major){
          var major = values.major;
          findOneMajorWithId(major, function(err, major){
            if(err) throw err;
            if(!major) throw 'Error.Major.NotFound';
            return;
          });
        }else return;
      })
      .then(function(){
        if(values.school){
          var school = values.school;
          findOneSchoolWithId(school, function(err, school){
            if(err) throw err;
            if(!school) throw 'Error.School.NotFound';
            return;
          });
        }else return;
      })
      .then(function(){
        callback();
      })
      .catch(function(err){
        callback(err);
      });
    }catch(err){
      callback(err);
    }
  }
};



function findOneSectionWithId(sectionId, callback){
  Section.findOne()
  .where( { id: sectionId })
  .exec(function(err, section){
    callback(err, section);
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
