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
    // sections:{
    //   collection: 'section',
    //   via: 'professor'
    // }
  }
}