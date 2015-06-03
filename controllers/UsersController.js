require(__dirname + '/../mailers/UserMailer.js');

var UsersController = Class('UsersController').inherits(RestfulController)({
  prototype : {
    _initRouter : function() {
      // Call constructor router
      RestfulController.prototype._initRouter.apply(this, arguments);

      application.router.route('/signup').get(this.new);
      application.router.route('/signup/check-username').post(this.checkUsername);
    },

    index : function index(req, res) {
      User.all(function(err, users) {
        res.render('users/index.html', {layout : 'application', users : users});
      });
    },

    show : function show(req, res, next) {
      User.findById(req.params.id, function(err, result) {
        var user;

        if (err) { next(err); return; }
        if (result.length === 0) { next(new NotFoundError('User Not found')); return; }

        user = new User(result[0]);
        res.render('users/show.html', {layout : 'application', user : user.toJson()});
      })
    },

    new : function(req, res) {
      res.render('users/new.html', {layout : 'login', errors: null});
    },

    create : function create(req, res, next) {
      res.format({
        html : function() {

          var person, user, anonymous;

          async.series([function(done) {
            person = new Entity({
              type: 'person',
              name: req.body['name'],
              lastname: req.body['lastname'],
              profileName: req.body['profileName'],
              isAnonymous: false
            });

            person.save(function(err, result) {
              if (err) {
                return done(err)
              }

              done()
            })
          }, function(done) {
            user = new User({
              entityId: person.id,
              username: req.body['username'],
              email: req.body['email'],
              password: req.body['password']
            });

            user.save(function(err, result) {
              if (err) {
                person.destroy(function(){});
                return done(err);
              }

              done()
            })
          }, function(done) {
            anonymous = new Entity({
              type: 'person',
              name: 'Anonymous',
              lastname: 'anonymous',
              profileName: 'anonymous_' + hashids.encode(person.id),
              isAnonymous: true
            });

            anonymous.save(function(err, result) {
              if (err) {
                person.destroy(function(){});
                user.destroy(function(){});
                return done(err);
              }

              done()
            })

          }, function(done) {
            var ownership = new EntityOwner({
              ownerId : person.id,
              ownedId : anonymous.id
            });

            ownership.save(function(err, result) {
              if (err) {
                person.destroy(function(){});
                user.destroy(function(){});
                anonymous.destroy(function(){});
                return done(err);
              }

              done()
            })
          }], function(err) {
            if (err) {
              req.flash('error', 'There was an error creating the user.');
              res.render('users/new.html', {errors: err});
              return;
            }

            UserMailer.new(user, person, function(err, result) {
              if (err) {
                req.flash('error', 'There was an error sending the activation email.');
                return res.redirect('/');
              }

              req.flash('success', 'Check your email to activate your account.');
              res.redirect('/');
            });

          });
        }
      });
    },

    edit : function edit(req, res) {
      User.findById(req.params.id, function (err, user) {
        if (err) { next(err); return; }
        if (user.length === 0) { next(new NotFoundError('User Not found')); return; }

        res.render('users/edit.html', {layout : 'application', user: user[0]});
      });
    },

    update : function update(req, res, next) {
      User.findById(req.params.id, function (err, result) {
        var user;

        if (err) { next(err); return; }
        if (result.length === 0) { next(new NotFoundError('User Not found')); return; }

        user = new User(result[0]);
        user.setProperties(req.body);

        user.save(function (err, result) {
          if (err) { next(err); return; }
          res.redirect('/user/' + req.params.id);
        });
      });
    },

    destroy : function destroy(req, res) {
      User.findById(req.params.id, function (err, user) {
        if (err) { next(err); return; }
        if (user.length === 0) { next(new NotFoundError('User Not found')); return; }

        // Logic remove only
        user.deleted = true;
        user.save(function (err, result) {
          if (err) { next(err); return; }

          res.redirect('/users');
        });
      });
    },

    checkUsername : function checkUsername(req, res, next) {
      var field = req.body.field;
      var value = req.body.value;

      res.format({
        json : function() {
          if (field === 'username') {
            User.find(["username = lower(trim( ' ' from ?))", [value]], function(err, response) {
              if (err) {
                return next(err)
              }

              if (response.length === 0) {
                return res.json({ username : 'available' });
              }

              return res.json({username : 'unavailable'});
            })
          } else if (field === 'profileName') {
            Entity.find(["profile_name = lower(trim( ' ' from ?))", [value]], function(err, response) {
              if (err) {
                return next(err)
              }

              if (response.length === 0) {
                return res.json({ profileName : 'available' });
              }

              return res.json({profileName : 'unavailable'});
            })
          } else {
            return res.json({error : 'invalid field'});
          }
        }
      });
    }
  }
});

module.exports = new UsersController();
