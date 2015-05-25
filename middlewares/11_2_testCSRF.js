logger.log("Setting test for csrf");

if (process.env.NODE_ENV === 'test') {
  module.exports = function (req, res, next) {
    if (req.path === '/csrf') {
      res.send(res.locals.csrfToken);
    } else {
      next();
    }
  };
} else {
  module.exports = function(req, res, next) {
    next();
  }
}
