Admin.EntitiesController = Class(Admin, 'EntitiesController').inherits(RestfulController)({
  prototype : {
    index : function index(req, res, next) {
      ACL.isAllowed('index', 'admin.' + inflection.pluralize(req.entityType), req.role, {}, function(err, isAllowed) {
        if (err) {
          return next(err);
        }

        if (!isAllowed) {
          return next(new ForbiddenError());
        }

        Entity.find(['type = \'' + req.entityType + '\' AND is_anonymous = false ORDER BY created_at ASC', []], function(err, result) {
          if (err) {
            return next(err);
          }

          EntitiesPresenter.build(result, req.currentPerson, function(err, entities) {
            if (err) {
              return next(err);
            }

            res.locals[inflection.pluralize(req.entityType)] = entities;

            res.render('admin/' + inflection.pluralize(req.entityType) + '/index', { layout : 'admin' });
          });
        });
      });
    },

    show : function show(req, res, next) {
      ACL.isAllowed('show', 'admin.' + inflection.pluralize(req.entityType), req.role, {}, function(err, isAllowed) {
        if (err) {
          return next(err);
        }

        if (!isAllowed) {
          return next(new ForbiddenError());
        }

        Entity.find({ id : hashids.decode(req.params.entityId)[0] }, function(err, result) {
          if (err) {
            return next(err);
          }

          EntitiesPresenter.build(result, function(err, entities) {
            if (err) {
              return next(err);
            }

            res.locals[req.entityType] = entities[0];

            res.render('admin/' + inflection.pluralize(req.entityType) + '/show.html', { layout : 'admin' });
          });
        });
      });

    },

    new : function(req, res, next) {
      return next(new NotFoundError());
    },

    create : function create(req, res, next) {
      return next(new NotFoundError());
    },

    edit : function edit(req, res, next) {
      ACL.isAllowed('edit', 'admin.' + inflection.pluralize(req.entityType), req.role, {}, function(err, isAllowed) {
        if (err) {
          return next(err);
        }

        if (!isAllowed) {
          return next(new ForbiddenError());
        }

        Entity.find({ id : hashids.decode(req.params.entityId)[0] }, function(err, result) {
          if (err) {
            return next(err);
          }

          if (!isAllowed) {
            return next(new ForbiddenError());
          }

          EntitiesPresenter.build(result, req.currentPerson, function(err, entities) {
            if (err) {
              return next(err);
            }

            res.locals[req.entityType] = entities[0];

            res.render('admin/' + inflection.pluralize(req.entityType) + '/edit.html', { layout : 'admin' });
          });
        });
      });
    },

    update : function update(req, res) {
      ACL.isAllowed('update', 'admin.' + inflection.pluralize(req.entityType), req.role, {}, function(err, isAllowed) {
        if (err) {
          return next(err);
        }

        if (!isAllowed) {
          return next(new ForbiddenError());
        }

        Entity.find({ id : hashids.decode(req.params.entityId)[0] }, function(err, result) {
          if (err) {
            return next(err);
          }

          if (result.length === 0) {
            return next(new NotFoundError());
          }

          var entity = new Entity(result[0]);

          entity.name = req.body.name || entity.name;
          entity.lastname = req.body.lastname || entity.lastname;
          entity.profileName = req.body.profileName || entity.profileName;
          entity.description = req.body.description || entity.description;
          entity.location = req.body.location || entity.location;

          async.series([function(done) {
            entity.save(done);
          }, function(done) {
            if (!req.files.image) {
              return done();
            }

            entity.uploadImage('image', req.files.image.path, done);
          }, function(done) {
            if (!req.files.background) {
              return done();
            }

            entity.uploadImage('background', req.files.background.path, done);
          }, function(done) {
            entity.save(done);
          }], function(err) {
            if (err) {
              res.locals.errors = err;
              req.errors = err;
              logger.log(err);
            }

            EntitiesPresenter.build([entity], req.currentPerson, function(err, result) {
              if (err) {
                return next(err);
              }

              res.locals[req.entityType] = result[0];

              res.render('admin/' + inflection.pluralize(req.entityType) + '/edit.html', { layout : 'admin' });
            });
          });
        });
      });
    },

    destroy : function destroy(req, res) {
      return next(new NotFoundError());
    }
  }
});

module.exports = new Admin.EntitiesController();
