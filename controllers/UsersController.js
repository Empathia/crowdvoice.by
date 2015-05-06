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
      res.render('users/new.html');
    },

    create : function create(req, res, next) {
      var user = new User(req.body);

      user.save(function(err, result) {
        if (err) { next(err); return; }

        return res.redirect('/user/' + user.id);
      });
    },

    edit : function edit(req, res) {
      User.findById(req.params.id, function (err, user) {
        if (err) { next(err); return; }
        if (user.length === 0) { next(); return; }

        res.render('users/edit.html', {layout : false, user: user[0]});
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
