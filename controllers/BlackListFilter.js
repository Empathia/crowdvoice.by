var BlackListFilter = Module('BlackListFilter')({
  routesBlackList: [
    /^\/(post|switchPerson|person|people|signup|login|logout|user|organization|entity|dist|session|page|root|admin|voice|dev)(es|s|$|\/)/
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
          next();
        } else {
          controller.prototype[action](req, res, next);
        }
      }
    },
  }
});

module.exports = BlackListFilter;
