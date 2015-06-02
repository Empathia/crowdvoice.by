require(__dirname + '/../lib/passport/LocalStrategy.js');
require(__dirname + '/../lib/passport/TokenStrategy.js');

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
      application.router.route('/session').get(this.tokenAuth);
      application.router.route('/logout').get(this.logout);
    },

    /* Render login form for user
     * @method: login
     */
    login : function (req, res) {
      console.log(req.user);
      res.render('sessions/login.html', {layout : 'login'});
    },

    tokenAuth : function tokenAuth(req, res, next) {
      passport.authenticate('token', function(err, user, info) {
        if (err) {
          return next(err);
        }

        if (!user) {
          req.flash('error', 'Invalid Email/Username or Password!');
          return res.redirect('/login');
        }

        var newUser = new User(user);

        user.token = null;

        user.save(function(err, result) {
          if (err) {
            return next(err);
          }

          req.logIn(user, function (err) {
            if (err) { return next(err); }

            req.flash('success', 'Welcome to CrowdVoice.by.';
            return res.redirect('/');
          });
        })
      })
    },

    /* Create session if authentication is correct
     * @method: create
     */
    create : function (req, res, next) {

      passport.authenticate('local', function (err, user, info) {
        if (err) {
          return next(err);
        }

        if (!user) {
          req.flash('error', 'Invalid Email/Username or Password!');
          return res.redirect('/login');
        }

        if (user.token !== null) {
          req.flash('error', 'You need to activate your Account first');
        }

        req.logIn(user, function (err) {
          if (err) { return next(err); }

          req.flash('success', 'Welcome to CrowdVoice.by.';
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
