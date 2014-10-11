/**
* Schools.js
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
    courses:{
      collection: 'course',
      via: 'school'
    },
    professors:{
      collection: 'professor',
      via: 'school'
    },
    students:{
      collection: 'user',
      via: 'school'
    }

  }
};

