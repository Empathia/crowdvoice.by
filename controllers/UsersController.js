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
        if (result.length === 0) { next(); return; }

        user = new User(result[0]);
        res.render('users/show.html', {layout : 'application', user : user.toJson()});
      })
    },

    new : function(req, res) {
      res.render('users/new.html', {errors: null});
    },

    create : function create(req, res, next) {
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
            res.render('users/new.html', {errors: err});
          } else {
            res.redirect('/user/' + user.id);
          }
        });

      });
    },

    edit : function edit(req, res) {
      User.findById(req.params.id, function (err, user) {
        if (err) { next(err); return; }
        if (user.length === 0) { next(); return; }

        res.render('users/edit.html', {layout : 'application', user: user[0]});
      });
    },

    update : function update(req, res, next) {
      User.findById(req.params.id, function (err, result) {
        var user;

        if (err) { next(err); return; }
        if (result.length === 0) { next(); return; }

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
        if (user.length === 0) { next(); return; }

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
