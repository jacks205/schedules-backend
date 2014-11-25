/**
* Schedule.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  schema: true,

  attributes: {
    name: {
      type: 'string'
    },
    courses: {
      collection: 'course',
      required: true
    },
    sections: {
      collection: 'section',
      required: true
    },
    // user: { //Will be changed to User object
    //   collection: 'user',
    //   via: 'schedules'
    // }
  },

  beforeCreate: function(values, callback){
    callback();
  }
};

