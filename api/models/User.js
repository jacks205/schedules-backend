var User = {
  // Enforce model schema in the case of schemaless databases
  schema: true,

  types: {

  },

  attributes: {
    username  : { type: 'string', required: true, unique: true },
    email     : { type: 'email',  required: true, unique: true },
    firstName : { type: 'string', required: true },
    lastName  : { type: 'string', required: true },
    school    : { model: 'School', required: true, isSchool: true },
    role      : { model: 'Role', required: true },
    passports : { collection: 'Passport', via: 'user' }
  }
};

module.exports = User;
