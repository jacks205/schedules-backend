module.exports = {
  read: function(req, res){
    var sectionId = req.param('id');
        //If requesting a specific section with id
        if (sectionId) {
            findOneSectionWithId(sectionId, function(err, textbook) {
              if(textbook)
                res.send(textbook);
              else
                res.json({ error: 'Error.Section.NotFound' });
            });
        } else {
            //No sectionId was given
            findAllSections(function(err, sections) {
              if(err) res.json({ error: err });
                res.send(sections);
            })
        }
  }

}

//Finds and populates
function findOneSectionWithId(sectionId, callback) {
    Section.findOne()
    .where({
        id: sectionId
    })
    .populate('textbooks')
    .populate('course')
    .populate('professor')
    .exec(function(err, section) {
        callback(err, section);
    });
}
//Returns all
function findAllSections(callback) {
    Section.find()
    .populate('textbooks')
    .populate('course')
    .populate('professor')
    .exec(function(err, sections) {
        callback(err, sections);
    })
}