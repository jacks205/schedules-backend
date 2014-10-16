module.exports = {
  schema: true,
  attributes: {
    name: {
      type: 'string',
      required: true
    },
    school:{
      model: 'School'
    },
    rating:{
      type: 'integer'
    },
    rmpUrl:{
      type: 'string'
    },
    sections:{
      collection: 'section',
      via: 'professor'
    }
  },

  beforeCreate: function(values, callback){
    //Find of
    Professor.findOne()
    .where({ name: values.name })
    .then(function(prof){
      if(prof) throw 'Error.Professor.AlreadyExists';
      callback();
    })
    .catch(function(err){
      console.log(err);
      callback(err);
    });

  }
}