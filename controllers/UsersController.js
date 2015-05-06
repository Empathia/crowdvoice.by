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

    show : function show(req, res) {
      User.findById(req.params.id, function(err, user) {
        res.render('users/show.html', {layout : 'application', user : user[0]});
      })
    },

    new : function(req, res) {
      res.render('users/new.html');
    },

    create : function create(req, res) {
      var user = new User(req.body);

      user.save(function(err, result) {
        if (err) {
          logger.error(err);

          return res.render('shared/500.html', {layout : false, error : err})
        }

        return res.redirect('/user/' + user.id);
      });
    },

    edit : function edit(req, res) {
      res.render('users/edit.html', {layout : false});
    },

    update : function update(req, res) {
      res.redirect('/user/id');
    },

    destroy : function destroy(req, res) {
      res.redirect('/users');
    }
  }
});

module.exports = new UsersController();
