var EntitiesPresenter = require(path.join(process.cwd(), '/presenters/EntitiesPresenter.js'));

var isProfileNameAvailable = require(__dirname + '/../lib/util/isProfileNameAvailable.js');

var OrganizationsController = Class('OrganizationsController').inherits(EntitiesController)({
  prototype : {
    inviteEntity : function inviteEntity (req, res, next) {
      var org = req.entity,
        entity;

      Entity.find({ id: req.body.entityId, deleted: false }, function (err, result) {
        if (err) { return next(err); }

        if (result.length === 0) {
          return next(new NotFoundError('Entity Not found'));
        }

        var user = new User(req.user);
        entity = result[0];
        user.entity(function (err, currentEntity) {
          if (err) { return next(err); }
          org.inviteEntity(entity, function (err) {
            if (err) { return next(err); }

            req.flash('success', 'User has been invited to organization.')
            res.redirect('/' + org.profileName);
          });
        });
      });
    },

    removeEntity : function (req, res, next) {
      // req.body = { orgId, entityId }

      ACL.isAllowed('removeEntityFromOrg', 'entities', req.role, {
        orgId: req.body.orgId,
        currentPersonId: req.currentPerson.id
      }, function (err, response) {
        if (err) { return next(err); }
        if (!response.isAllowed) { return next(new ForbiddenError()); }

        EntityMembership.find({
          entity_id: hashids.decode(req.body.orgId)[0],
          member_id: hashids.decode(req.body.entityId)[0]
        }, function (err, result) {
          var membership = new EntityMembership(result[0]);

          membership.destroy(function (err) {
            if (err) { return next(err); }

            res.json({ status: 'removed' });
          });
        });
      });
    },

    leaveOrganization : function (req, res, next) {
      // req.body = { orgId, entityId }

      ACL.isAllowed('leaveOrganization', 'entities', req.role, {
        currentPersonId: req.currentPerson.id,
        orgId: req.body.orgId,
        entityId: req.body.entityId
      }, function (err, isAllowed) {
        if (err) { return next(err); }

        if (!isAllowed) { return next(new ForbiddenError()); }

        EntityMembership.find({
          entity_id: hashids.decode(req.body.orgId)[0],
          member_id: hashids.decode(req.body.entityId)[0]
        }, function (err, result) {
          var membership = new EntityMembership(result[0]);

          membership.destroy(function (err) {
            if (err) { return next(err); }

            res.json({ status: 'left' });
          });
        });
      });
    },

    requestMembership : function (req, res, next) {
      ACL.isAllowed('requestMembership', 'entities', req.role, {
        currentPersonId: req.currentPerson.id,
        orgId: req.body.orgId
      }, function (err, isAllowed) {
        if (err) { return next(err); }

        if (!isAllowed) { return next(new ForbiddenError()); }

        var thread;

        async.series([
          function (next) {
            EntityOwner.find({ owned_id: hashids.decode(req.body.orgId)[0] }, function (err, result) {
              var sender = new Entity({ id: hashids.decode(req.currentPerson.id)[0] });
              var receiverEntity = new Entity({ id: result[0].ownerId });

              MessageThread.findOrCreate({
                senderPerson: sender,
                senderEntity: sender,
                receiverEntity: receiverEntity
              }, function (err, result) {
                if (err) { return next(err); }

                thread = result;

                next();
              });
            });
          },

          function (next) {
            thread.createMessage({
              type: 'request_organization',
              senderPersonId: hashids.decode(req.currentPerson.id)[0],
              senderEntityId: hashids.decode(req.currentPerson.id)[0],
              receiverEntityId: hashids.decode(req.body.orgId)[0],
              organizationId: hashids.decode(req.body.orgId)[0],
              message: req.body.message
            }, function (err, result) {
              if (err) { return next(err); }

              next();
            });
          }
        ], function (err) {
          if (err) { return next(err); }

          ThreadsPresenter.build(req, [thread], function (err, result) {
            if (err) { return next(err); }

            res.json(result[0]);
          });
        });
      });
    },

    create: function (req, res, next) {
      // req.body = {
      //   title: '1234', // organization name
      //   profileName: '1234',
      //   description: '1234',
      //   locationName: 'Guadalajara, Jalisco, Mexico.',
      //   imageBackground: 'undefined', // goes somewhere else if defined
      //   imageLogo: 'undefined', // goes somewhere else if defined
      // }
      // req.files = {
      //   imageLogo,
      //   imageBackground,
      // }

      //console.log('??????????????????????????', req.files)
      //console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!', req.body)

      ACL.isAllowed('createOrganization', 'entities', req.role, {}, function (err, isAllowed) {
        if (err) { return next(err); }

        if (!isAllowed) {
          return next(new ForbiddenError('not allowed to create new organization'));
        }

        // check if provided profile name is taken
        isProfileNameAvailable(req.body.profileName, function (err, isAvailable) {
          if (err) { return next(err); }

          if (!isAvailable) {
            return res.status(200).json({ error: new Error('profile name not available') });
          }

          // TODO check that no required fields are empty (title, profileName, description)

          var org = new Entity({
            type: 'organization',
            name: req.body.title,
            lastname: null,
            profileName: req.body.profileName,
            isAnonymous: false,
            isAdmin: false,
            description: req.body.description,
            location: req.body.locationName
          });

          var owner;

          async.series([
            // create org
            function (next) {
              org.save(next);
            },

            // add logo/avatar
            function (next) {
              if (!req.files.imageLogo) { return next(); }

              org.uploadImage('image', req.files.imageLogo.path, next);
            },

            // add background
            function (next) {
              if (!req.files.imageBackground) { return next(); }

              org.uploadImage('background', req.files.imageBackground.path, next);
            },

            // save new changes
            function (next) {
              org.save(next);
            },

            // ownership
            function (next) {
              owner = new EntityOwner({
                ownerId: hashids.decode(req.currentPerson.id)[0],
                ownedId: org.id
              });

              owner.save(next);
            }
          ], function (err) {
            if (err) {
              logger.error(err);

              // destroy org
              return org.destroy(function () {
                // destroy ownership
                owner.destroy(next);
              });
            }

            EntitiesPresenter.build([org], req.currentPerson, function (err, orgs) {
              if (err) { return next(err); }

              res.json(orgs[0]);
            });
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
        'entity_id' : hashids.decode(req.entity.id)[0]
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
