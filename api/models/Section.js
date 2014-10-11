module.exports = {

  sectionId: {
    type: 'string',
    required: true
  },

  // professor:{
  //   model: 'Professor'
  // },

  meets:{
    type: 'string',
    required: true
  },

  duration:{
    type: 'integer',
  },

  start:{
    type: 'time'
  },

  end:{
    type: 'time'
  },

  capacity:{
    type: 'integer'
  },

  available:{
    type:'integer'
  },
  waitlist:{
    type:'integer'
  },
  // texbooks:{
  //   collection: 'textbook',
  //   via: 'sections'
  // },
  // course:{
  //   model: 'Course'
  // }

}