module.exports = {
  read: function(req, res){
    var textbookId = req.param('id');
        //If requesting a specific texbook with id
        if (textbookId) {
            findOneTextbookWithId(textbookId, function(err, textbook) {
              if(textbook)
                res.send(textbook);
              else
                res.json({ error: 'Error.Textbook.NotFound' });
            });
        } else {
            //No textbookId was given
            findAllTextbooks(function(err, texbooks) {
              if(err) res.json({ error: err });
                res.send(texbooks);
            })
        }
  }

}

//Finds and populates
function findOneTextbookWithId(textbookId, callback) {
    Textbook.findOne()
    .where({
        id: textbookId
    })
    .populate('sections')
    .exec(function(err, texbook) {
        callback(err, texbook);
    });
}
//Returns all
function findAllTextbooks(callback) {
    Textbook.find()
    .populate('sections')
    .exec(function(err, texbooks) {
        callback(err, texbooks);
    })
}