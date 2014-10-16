module.exports = {
  read: function(req, res){
    var roleId = req.param('id');
        //If requesting a specific role with id
        if (roleId) {
            findOneRoleWithId(roleId, function(err, role) {
              if(role)
                res.send(role);
              else
                res.json({ error: 'Error.Role.NotFound' });
            });
        } else {
            //No roleId was given
            findAllRoles(function(err, roles) {
              if(err) res.json({ error: err });
                res.send(roles);
            })
        }
  }

}

//Finds and populates
function findOneRoleWithId(roleId, callback) {
    Role.findOne()
    .where({
        id: roleId
    })
    .exec(function(err, role) {
        callback(err, role);
    });
}
//Returns all
function findAllRoles(callback) {
    Role.find()
    .exec(function(err, roles) {
        callback(err, roles);
    })
}