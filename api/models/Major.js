module.exports = {
  schema: true,
  attributes: {
    name: {
      type: 'string',
      required: true
    },
    abbreviation: {
      type: 'string',
      required: true
    }
  },

  beforeCreate: function(values, callback){
    //Find if major already exists
    Major.findOne()
    .where({ name: values.name })
    .then(function(major){
      if(major) throw 'Error.Major.AlreadyExists';
      callback();
    })
    .catch(function(err){
      console.log(err);
      callback(err);
    });

  },

  beforeUpdate: function(values, callback){
    console.log(values);
  }
}

