/**
* Users.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    firstName: {
      type: 'string',
      required: true
    },

    lastName: {
      type: 'string',
      required: true,
    },
    email: {

      // Special types are allowed, they are used in validations and
      // set as a string when passed to an adapter
      type: 'email',

      required: true
    },

    // You can also define instance methods here
    fullName: function() {
      return this.firstName + ' ' + this.lastName
    }

  }
};

