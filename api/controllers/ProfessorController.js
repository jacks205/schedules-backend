module.exports = {
  read: function(req, res){
    var professorId = req.param('id');
        //If requesting a specific professor with id
        if (professorId) {
            findOneProfessorWithId(professorId, function(err, professor) {
              if(professor)
                res.send(professor);
              else
                res.json({ error: 'Error.Professor.NotFound' });
            });
        } else {
            //No professorId was given
            findAllProfessors(function(err, professors) {
              if(err) res.json({ error: err });
                res.send(professors);
            })
        }
  }

}

//Finds and populates
function findOneProfessorWithId(professorId, callback) {
    Professor.findOne()
    .where({
        id: professorId
    })
    .populate('school')
    .populate('sections')
    .exec(function(err, professor) {
        callback(err, professor);
    });
}
//Returns all
function findAllProfessors(callback) {
    Professor.find()
    .populate('school')
    .populate('sections')
    .exec(function(err, professors) {
        callback(err, professors);
    })
}