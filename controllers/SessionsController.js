require(__dirname + '/../lib/passport/LocalStrategy.js');

var SessionsController = Class('SessionsController')({
  prototype : {
    init : function () {
      this._initRouter();
      return this;
    },

    /* Register session routes
     * @method _initRouter
     */
    _initRouter : function () {
      application.router.route('/login').get(this.login);
      application.router.route('/session').post(this.create);
      application.router.route('/logout').get(this.logout);
    },

    /* Render login form for user
     * @method: login
     */
    login : function (req, res) {
      console.log(req.user);
      res.render('sessions/login.html', {});
    },

    /* Create session if authentication is correct
     * @method: create
     */
    create : function (req, res, next) {
      passport.authenticate('local', function (err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.redirect('/login'); }

        console.log('logging in');
        req.logIn(user, function (err) {
          if (err) { return next(err); }
          return res.redirect('/');
        });
      })(req, res, next);
    },

    /* Destroy user session
     * @method logout
     */
    logout : function (req, res) {
      req.logout();
      return res.redirect('/');
    },
  }
});

module.exports = new SessionsController();
