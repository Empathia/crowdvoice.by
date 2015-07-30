var EntitiesPresenter = require(path.join(process.cwd(), '/presenters/EntitiesPresenter.js'));

var OrganizationsController = Class('OrganizationsController').inherits(EntitiesController)({
  prototype : {
    init : function () {
      return this;
    },

    inviteEntity : function inviteEntity (req, res, next) {
      var org = req.entity, entity;
      Entity.find({id: req.body.entityId}, function (err, result) {
        if (err) { return next(err); }
        if (result.length === 0) { next(new NotFoundError('Entity Not found')); return; }

        var user = new User(req.user);
        entity = result[0];
        user.entity(function (err, currentEntity) {
          if (err) { return next(err); }
          org.inviteEntity(entity, function (err) {
            if (err) { return next(err); }
            res.redirect('/' + org.profileName);
          });
        });
      });
    },

    voices : function voices (req, res, next) {
      Voice.find({owner_id: req.entity.id}, function (err, result) {
        if (err) { return next(err); }

        var voices = [];
        async.each(result, function (rvoice, done) {
          var rvoice = new Voice(rvoice);
          voices.push(rvoice);
          done();
        }, function (err) {
          if (err) { return next(err); }
          res.format({
            'application/json': function () {
              res.json(voices);
            }
          });
        });

      });
    },

    members : function members(req, res, next) {
      EntityMembership.find({
        'entity_id' : hashids.decode(req.entity)[0]
      }, function(err, result) {
        if (err) {
          return next(err);
        }

        var memberIds = result.map(function(item) {
          return item.memberId;
        });

        Entity.whereIn('id', memberIds, function(err, result) {
          if (err) {
            return next(err);
          }

          EntitiesPresenter.build(result, req.currentPerson, function(err, members) {
            if (err) {
              return next(err);
            }

            res.json(members);
          });
        });
      });
    }

  }
});

module.exports = new OrganizationsController();
