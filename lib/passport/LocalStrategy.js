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
  var query = db('Users');

  query.where({'username': username});
  query.orWhere({'email': username});

  query.exec(function(err, result) {
    var user, validPass;

    if (err) { return done(err); }

    if (result.length === 0) {
      logger.error('User not found');
      return done(null, false); // User not found
    }

    userRaw = result[0];

    if (userRaw.token !== null) {
      logger.error('User not activated');
      return done(null, false); // User not activated
    }

    bcrypt.compare(password, userRaw.encrypted_password, function (err, valid) {
      if (!valid) {
        logger.error('Invalid password');
        return done(null, false); // Invalid password
      } else {
        done(null, userRaw);
      }
    });

  });
}));
