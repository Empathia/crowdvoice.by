var PeopleController = Class('PeopleController').inherits(EntitiesController)({
  prototype : {
    init : function () {
      this._initRouter();
      return this;
    },

    _initRouter : function () {
      application.router.route(['/person*', '/people*']).all(function (req, res, next) {
        req.entityType = 'person';
        next();
      });
      application.router.route('/people').get(this.index);
      application.router.route('/person').post(this.create);
      application.router.route('/person/new').get(this.new);

      application.router.route('/person/:id*').all(this.getEntity);
      application.router.route('/person/:id').get(this.show);
      application.router.route('/person/:id').put(this.update);
      application.router.route('/person/:id/edit').get(this.edit);

      application.router.route('/person/:id/follow').post(this.follow);
      application.router.route('/person/:id/voices').get(this.voices);
    },
  }
});

module.exports = new PeopleController();
