module.exports = {
  read: function(req, res){
    var majorId = req.param('id');
        //If requesting a specific major with id
        if (majorId) {
            findOneMajorWithId(majorId, function(err, major) {
              if(major)
                res.send(major);
              else
                res.json({ error: 'Error.Major.NotFound' });
            });
        } else {
            //No majorId was given
            findAllMajors(function(err, majors) {
              if(err) res.json({ error: err });
                res.send(majors);
            })
        }
  }

}

//Finds major with id
function findOneMajorWithId(majorId, callback) {
    Major.findOne()
    .where({
        id: majorId
    })
    .exec(function(err, major) {
        callback(err, major);
    });
}
//Returns all
function findAllMajors(callback) {
    Major.find()
    .exec(function(err, majors) {
        callback(err, majors);
    })
}