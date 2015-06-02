var TokenStrategy = require('passport-accesstoken').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, result) {
    done(err, result[0]);
  });
});

passport.use(new TokenStrategy(
  function (token, done) {
    User.find({token: token}, function (err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    });
  }
));
