var UsersController = Class('UsersController').inherits(RestfulController)({
  prototype : {
    _initRouter : function() {
      // Call constructor router
      RestfulController.prototype._initRouter.apply(this, arguments);

      application.router.route('/signup').get(this.new);
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
          var entity = new Entity({
            type: 'person',
            name: req.body['name'],
            lastname: req.body['lastname'],
            profileName: req.body['profileName'],
            isAnonymous: req.body['isAnonymous'] === "true" ? true : false
          });

          entity.save(function(err, result) {
            if (err) {
              res.render('users/new.html', {errors: err});
              return;
            }

            var user = new User({
              entityId: entity.id,
              username: req.body['username'],
              email: req.body['email'],
              password: req.body['password']
            });

            user.save(function (err) {
              if (err) {
                entity.destroy(function () {});
                req.flash('error', 'There was an error creating the user.');
                res.render('users/new.html', {errors: err});
              } else {
                UserMailer.new(user, entity, function(err, mailerResult) {
                  if (err) {
                    req.flash('error', 'There was an error sending the activation email.');
                    return res.redirect('/');
                  }

                  req.flash('success', 'Check your email to activate your account.');
                  res.redirect('/');
                })

              }
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
    }
  }
});

module.exports = new UsersController();
