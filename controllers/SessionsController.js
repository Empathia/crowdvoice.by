require(__dirname + '/../lib/passport/LocalStrategy.js');
require(__dirname + '/../lib/passport/TokenStrategy.js');
require(__dirname + '/../mailers/UserMailer.js');

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
      application.router.route('/session/forgot-password').get(this.forgotPassword);
      application.router.route('/session').post(this.create);
      application.router.route('/session/reset-password').post(this.resetPassword);
      application.router.route('/session').get(this.tokenAuth);
      application.router.route('/logout').get(this.logout);
    },

    /* Render login form for user
     * @method: login
     */
    login : function (req, res) {
      res.render('sessions/login.html', {layout : 'login'});
    },

    /* Render forgot password form
     * @method: forgotPassword
     */
    forgotPassword : function forgotPassword(req, res, next) {
      res.format({
        html : function() {
          if (req.method === 'GET') {
            return res.render('sessions/forgotPassword.html', {layout : 'login'})
          } else if (req.method === 'POST') {
            User.find({email : req.body.email}, function(err, user) {
              if (err) {
                return next(err);
              }

              if (user.length === 0) {
                return next(new NotFoundError('Email not found.'));
              }

              user = new User(user[0]);

              user.token = bcrypt.hashSync(CONFIG.sessionSecret + Date.now(), bcrypt.genSaltSync(12), null);

              user.save(function(err, result) {
                if (err) {
                  return next(err);
                }

                UserMailer.forgotPassword(user, function(err, mailerResult) {
                  req.flash('success', 'Check your email to reset your password.');
                  res.redirect('/');
                });
              })
            });
          }
        }
      })
    },

    resetPassword : function resetPassword(req, res, next) {
      res.format({
        html : function() {
          //res.render('sessions/resetPassword.html', {layout : 'login'});

          var user = new User(req.currentUser);

          user.password = req.body.password;

          user.encryptedPassword = null;

          user.save(function(err, result) {
            if (err) {
              return next(err);
            }

            req.flash('success', 'Your password has been reset.');
            return res.redirect('/');
          })
        }
      })
    },

    /* Create session if token authentication is correct
     * @method: tokenAuth
     */
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

        newUser.token = null;

        newUser.save(function(err, result) {
          if (err) {
            return next(err);
          }

          req.logIn(user, function (err) {
            if (err) { return next(err); }

            if (req.params.reset) {
              req.flash('success', 'Welcome to CrowdVoice.by.');
              return res.render('session/resetPassword', {layout : 'login'});
            } else {

              req.flash('success', 'Welcome to CrowdVoice.by.');
              return res.redirect('/');
            }
          });
        })
      })(req, res, next);
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

          if (req.body.rememberme) {
            var expires;

            expires =  new Date(Date.now() + 3600000 * 24 * 365); //Add one more year

            req.session.cookie.expires = expires;
          }

          req.flash('success', 'Welcome to CrowdVoice.by.');
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
