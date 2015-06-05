var OrganizationsController = Class('OrganizationsController').inherits(EntitiesController)({
  prototype : {
    init : function () {
      return this;
    },

    inviteEntity : function inviteEntity (req, res, next) {
      var org = req.entity, entity;
      Entity.find({id: req.body.entityId}, function (err, result) {
        if (err) { next(err); return; }
        if (result.length === 0) { next(new NotFoundError('Entity Not found')); return; }

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
