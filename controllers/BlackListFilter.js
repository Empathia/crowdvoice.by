/* globals ForbiddenError */
var BlackListFilter = Module('BlackListFilter')({
  routesBlackList: [
    /^\/(search|discover|post|switchPerson|person|people|signup|login|logout|user|organization|entity|dist|session|page|root|admin|voice|dev|embed|twitter)(es|s|$|\/)/,
    /^(search|discover|post|switchPerson|person|people|signup|login|logout|user|organization|entity|dist|session|page|root|admin|voice|dev|anonymous|embed|twitter)(es|s|$|\/)/
  ],

  isBlackListed : function isBlackListed (path) {
    var inBlackList = false;
    this.routesBlackList.forEach(function (regexp) {
      if (path.match(regexp)) {
        inBlackList = true;
      }
    });
    return inBlackList;
  },

  prototype : {
    filterAction : function filterAction (controller, action) {
      return function (req, res, next) {
        if (BlackListFilter.isBlackListed(req.path)) {
          return  next(new ForbiddenError());
        } else {
          controller.prototype[action](req, res, next);
        }
      };
    },
  }
});

module.exports = BlackListFilter;
