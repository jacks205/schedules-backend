/**
* Term.js
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

    start: {
      type: 'date',
      // Validation rule functions allow you to validate values against other attributes
      before: function() {
        return this.end;
      },
      required: true
    },

    end: {
      type: 'date',
      after: function() {
        return this.start;
      },
      required: true
    }

  }
};

