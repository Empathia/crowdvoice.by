var User = Class('User').inherits(Argon.KnexModel)({

  validations : {
    username: [
      'required',
      {
        rule: function(val) {
          if (val.search(/\s/) !== -1) {
            throw new Checkit.FieldError('Username cannot contain spaces.');
          };
        },
        message : 'Username cannot contain spaces.'
      },
      {
        rule: function (val) {
          val = val.toLowerCase().trim()
          var query = db('Users').where('username', '=', val);

          if (this.target.id) {
            query.andWhere('id', '!=', this.target.id);
          }
          return query.then(function(resp) {
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
          var query = db('Users').where('email', '=', val);
          if (this.target.id) {
            query.andWhere('id', '!=', this.target.id);
          }
          return query.then(function(resp) {
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
    username: null,
    password: null,
    token:    null,

    init : function init(config) {
      Argon.KnexModel.prototype.init.call(this, config);

      var model = this;

      this.bind('beforeCreate', function(data) {
        model.token = bcrypt.hashSync(CONFIG.sessionSecret + Date.now(), bcrypt.genSaltSync(12), null);
      });

      this.bind('beforeSave', function (event) {
        /* Here the best case scenario is to verify that the model is valid by executing isValid, but since
         * we cannot use it because because Argon does not trigger 'beforeSave' asynchronously,
         * then we have to replicate the validation: password.length >= 8 */
        if (model.password && model.password.length >= 8) {
          model.encryptedPassword = bcrypt.hashSync(model.password, bcrypt.genSaltSync(10), null);
          delete model.password;
        }
      });
    },


    /* Returns the user's associated entity
     * @method entity
     */
    entity : function entity (done) {
      Entity.find({id: this.entityId}, function (err, result) {
        result = result[0];

        result.id = hashids.encode(result.id);

        done(err, result);
      });
    },

    /* Returns the model raw data. It also filters the sensitive data.
     * @method toJson
     */
    toJson: function toJson () {
      var json = {},
        model = this,
        filtered = [
          'errors', 'eventListeners', '_csrf', 'encryptedPassword', 'deleted'
        ];

      Object.keys(this).forEach(function (property) {
        if (filtered.indexOf(property) === -1) {
          json[property] = model[property];
        }
      });

      return json;
    }
  }
});






module.exports = User;
