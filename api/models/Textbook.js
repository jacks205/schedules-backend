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

  },

  beforeCreate: function(values, callback){
    //Find if textbook already exists
    Textbook.findOne()
    .where({ isbn: values.isbn })
    .then(function(textbook){
      if(textbook) throw 'Error.Textbook.AlreadyExists';
      callback();
    })
    .catch(function(err){
      console.log(err);
      callback(err);
    });

  }
}