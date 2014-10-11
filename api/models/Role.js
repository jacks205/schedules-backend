module.exports = {
  attributes:{
    role:{
      type: 'string',
      enum: ['student', 'professor', 'admin', 'guest'],
      defaultsTo: 'guest'
    }
  }
}