var EntitiesController = Class('EntitiesController')({
  prototype : {
    init : function () {
      this._initRouter();
      return this;
    },

    _initRouter : function () {
      application.router.route('/:profile_name')
        .get(this.show);
    },

    show : function (req, res, next) {
      Entity.find({
        profile_name: req.params.profile_name
      }, function (err, result) {
        if (err) { next(err); return; }
        if (result.length === 0) { next(new Error('Not found')); return; }

        var entity = result[0];
        if (entity.type === 'person') {
          PersonsController.prototype.showByProfileName(req, res, next);
        } else {
          OrganizationsController.prototype.showByProfileName(req, res, next);
        }
      });
    },
  }
});

module.exports = new EntitiesController();
