var OrganizationsController = Class('OrganizationsController').inherits(EntitiesController)({
  prototype : {
    init : function () {
      this._initRouter();
      return this;
    },

    _initRouter : function () {
      application.router.route(['/organization*']).all(function (req, res, next) {
        req.entityType = 'organization';
        next();
      });
      application.router.route('/organizations').get(this.index);
      application.router.route('/organization').post(this.create);
      application.router.route('/organization/new').get(this.new);

      application.router.route('/organization/:id*').all(this.getEntity);
      application.router.route('/organization/:id').get(this.show);
      application.router.route('/organization/:id').put(this.update);
      application.router.route('/organization/:id/edit').get(this.edit);

      application.router.route('/organization/:id/follow').post(this.follow);
      application.router.route('/organization/:id/invite_entity').post(this.inviteEntity);
      application.router.route('/organization/:id/voices').get(this.voices);
    },

    inviteEntity : function inviteEntity (req, res, next) {
      var org = req.entity, entity;
      Entity.find({id: req.body.entityId}, function (err, result) {
        if (err) { next(err); return; }
        if (result.length === 0) { next(new Error('Not found')); return; }

        var user = new User(req.user);
        entity = result[0];
        user.entity(function (err, currentEntity) {
          if (err) { next(err); return; }
          if (currentEntity.id !== org.id) { next(new Error('Not Authorized')); }
          org.inviteEntity(entity, function (err) {
            if (err) { next(err); return; }
            res.redirect('/' + org.profileName);
          });
        });
      });
    },

  }
});

module.exports = new OrganizationsController();
