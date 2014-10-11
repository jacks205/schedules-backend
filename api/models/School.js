/**
 * Schools.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
module.exports = {
    types: {
        isProfessor: function(professorId) {},
        isCourse: function(courseId) {},
        isUser: function(userId) {}
    },
    attributes: {
        name: {
            type: 'string',
            required: true
        },
        courses: {
            collection: 'course',
            via: 'school',
            isCourse: true
        },
        professors: {
            collection: 'professor',
            via: 'school',
            isProfessor: true
        },
        students: {
            collection: 'user',
            via: 'school',
            isUser: true
        }
    }
};