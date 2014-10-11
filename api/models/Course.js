/**
* Courses.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  types:{
    isSchool: function(name){
      School.find()
      .where({ name: name})
      .exec(function(err, schools){
        if(err) return false;
        console.log(name);
        return schools[0].name == name;
      });
    }
  },


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
      required: true,
      isSchool: true
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

  }
};

