module.exports = {
    schema: true,

    types: {
      isProfessor: function(professorId){

      },
      isTextbook: function(textbookId){

      },
      isCourse: function(courseId){

      }
    },

    attributes: {
        sectionId: {
            type: 'string',
            required: true
        },
        professor:{
          model: 'Professor',
          isProfessor: true
        },
        meets: {
            type: 'string',
            required: true
        },
        duration: {
            type: 'integer',
        },
        start: {
            type: 'time'
        },
        end: {
            type: 'time'
        },
        capacity: {
            type: 'integer'
        },
        available: {
            type: 'integer'
        },
        waitlist: {
            type: 'integer'
        },
        textbooks: {
            collection: 'textbook',
            via: 'sections',
            isTextbook: true
        },
        course:{
          model: 'Course',
          isCourse: true
        }
    }
}