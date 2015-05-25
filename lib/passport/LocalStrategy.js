var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, result) {
    done(err, result[0]);
  });
});

passport.use('local', new LocalStrategy({
  usernameField : 'username',
  passwordField : 'password',
  passReqToCallback : true
}, function(err, username, password, done) {

  User.find({'username': username},  function(err, result) {
    var user, validPass;

    logger.log('login', username)
    if (err) { return done(err); }

    if (result.length === 0) {
      logger.error('User not found');
      return done(null, false); // User not found
    }

    user = result[0];

    bcrypt.compare(password, user.encryptedPassword, function (err, valid) {
      if (!valid) {
        logger.error('Invalid password');
        return done(null, false); // Invalid password
      } else {
        done(null, user);
      }
    });

  });
}));
