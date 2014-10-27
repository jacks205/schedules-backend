module.exports = {
  schema: true,
  attributes:{
    role:{
      type: 'string',
      enum: ['student', 'professor', 'admin', 'guest'],
      defaultsTo: 'guest'
    }
  },

  beforeCreate: function(values, callback){
    Role.findOne()
    .where({ role: values.role })
    .then(function(role){
      if(role) throw 'Error.Role.AlreadyExists'; //simple check on the name to see if role name exists already
      callback();
    })
    .catch(function(err){
      console.log(err);
      callback(err);
    });

  }
}