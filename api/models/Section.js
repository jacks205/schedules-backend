module.exports = {
    schema: true,

    attributes: {
        sectionNumber: {
            type: 'string'
        },
        professor:{
          model: 'Professor'
        },
        meets: {
            type: 'array',
            required: true
        },
        duration: {
            type: 'integer',
        },
        start: {
            type: 'integer'
        },
        end: {
            type: 'integer'
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
            via: 'sections'
        },
        course:{
          model: 'Course',
          required: true
        }
    },

  beforeCreate: function(values, callback){
    Section.findOne()
    .where({ sectionNumber: values.sectionNumber, course: values.course })
    .then(function(section){
      if(section) throw 'Error.Section.AlreadyExists'; //simple check on the name to see if section name exists already
      else{
        Course.findOne()
        .where({ id: values.course })
        .then(function(course){
          if(!course) callback('Error.Course.NotFound'); //because throws in nested promises don't get caught by outer catch
          callback();
        });
      }
    })
    .catch(function(err){
      console.log(err);
      callback(err);
    });

  }
}