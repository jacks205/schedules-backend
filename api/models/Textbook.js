module.exports = {
  schema: true,
  attributes: {
    isbn:{
      type: 'string',
      required: true
    },
    title: {
      type: 'string',
      required: true
    },
    authors: {
      type: 'array',
      required: true
    },
    publisher: {
      type: 'string'
    },

    sections:{
      collection: 'section',
      via: 'textbooks',
      dominant: true
    },

    onlineCode:{
      type: 'boolean'
    },

    prices:{
      type:'array'
    }

  }
}