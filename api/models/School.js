/**
 * Schools.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
module.exports = {

    attributes: {
        name: {
            type: 'string',
            required: true
        },
        courses: {
            collection: 'course',
            via: 'school'
        },
        professors: {
            collection: 'professor',
            via: 'school'
        },
        students: {
            collection: 'user',
            via: 'school'
        }
    },

  beforeCreate: function(values, callback){
    School.findOne()
    .where({ name: values.name })
    .then(function(school){
      if(school) throw 'Error.School.AlreadyExists'; //simple check on the name to see if school name exists already
      callback();
    })
    .catch(function(err){
      console.log(err);
      callback(err);
    });

  }
};