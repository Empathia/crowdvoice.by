var API = require('./../../../../../lib/api');

Class(CV, 'PostCreatorFromSourcesSourceTwitter').inherits(Widget).includes(CV.WidgetUtils)({
  isAuth: function isAuth(callback) {
    API.hasTwitterCredentials(function (err, res) {
      if (err) {
        console.log(err);
        return callback(err);
      }
      console.log(res);
      return callback(res.hasTwitterCredentials);
    });
  },

  prototype: {
    /* the results data to be rendered */
    data: null,
    init: function init(config) {
      Widget.prototype.init.call(this, config);
    }
  }
});
