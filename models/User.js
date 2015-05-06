var User = Class('User').inherits(Argon.KnexModel)({

  validations : {
    email: [
      'email', 'required',
      {
        rule: function (val, params, context) {
          return db('Users').where('email', '=', val).then(function(resp) {
            if (resp.length > 0) throw new Checkit.FieldError('The email address is already in use.');
          });
        }
      }
    ]
  },

  storage : (new Argon.Storage.Knex({
    tableName : 'Users'
  })),

  prototype : {

  }
});

User.bind('beforeSave', function (event) {
  var model = event.data.model;

  if (model.password) {
    model.encryptedPassword = bcrypt.hashSync(model.password, bcrypt.genSaltSync(10), null);
    delete model.password;
  }
});

module.exports = User;
