var User = Class('User').inherits(Argon.KnexModel)({

  validations : {
    username: [
      'required',
      {
        rule: function (val) {
          return db('Users').where('username', '=', val).then(function(resp) {
            if (resp.length > 0) throw new Checkit.FieldError('This username is already in use.')
          });
        },
        message: 'This username is already in use.'
      }
    ],
    email: [
      'email', 'required',
      {
        rule: function (val, params, context) {
          return db('Users').where('email', '=', val).then(function(resp) {
            if (resp.length > 0) throw new Checkit.FieldError('The email address is already in use.');
          });
        },
        message: 'This email address is already in use.'
      }
    ],
    password: [
      'minLength:8'
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

  /* Here the best case scenario is to verify that the model is valid by executing isValid, but since
   * we cannot use it because because Argon does not trigger 'beforeSave' asynchronously,
   * then we have to replicate the validation: password.length >= 8 */
  if (model.password && model.password.length >= 8) {
    model.encryptedPassword = bcrypt.hashSync(model.password, bcrypt.genSaltSync(10), null);
    delete model.password;
  }
});

module.exports = User;
