Admin.VoicesController = Class(Admin, 'VoicesController')({
  prototype : {
    index : function index(req, res, next) {
      ACL.isAllowed('index', 'admin.voices', req.role, {}, function(err, isAllowed) {
        if (err) {
          return next(err);
        }

        if (!isAllowed) {
          return next(new ForbiddenError());
        }

        Voice.all(function(err, result) {
          if (err) {
            return next(err);
          }

          VoicesPresenter.build(result, req.currentPerson, function(err, voices) {
            if (err) {
              return next(err);
            }

            res.locals.voices = voices;

            res.render('admin/voices/index.html', { layout : 'admin' });
          })
        })
      });
    },

    show : function show(req, res, next) {
      ACL.isAllowed('show', 'admin.voices', req.role, {}, function(err, isAllowed) {
        if (err) {
          return next(err);
        }

        if (!isAllowed) {
          return next(new ForbiddenError());
        }

        Voice.find({ id : hashids.decode(req.params.voiceId)[0] }, function(err, result) {
          if (err) {
            return next(err);
          }

          if (result.length === 0) {
            return next(new NotFoundError());
          }

          VoicesPresenter.build(result, req.currentPerson, function(err, voices) {
            if (err) {
              return next(err);
            }

            res.locals.voice = voices[0];

            res.render('admin/voices/show.html', { layout : 'admin' });
          });
        });
      });

    },

    new : function(req, res, next) {
      ACL.isAllowed('new', 'admin.voices', req.role, {}, function(err, isAllowed) {
        if (err) {
          return next(err);
        }

        if (!isAllowed) {
          return next(new ForbiddenError());
        }

        res.render('admin/voices/new.html');
      });
    },

    create : function create(req, res, next) {
      ACL.isAllowed('create', 'admin.voices', req.role, {}, function(err, isAllowed) {
        if (err) {
          return next(err);
        }

        if (!isAllowed) {
          return next(new ForbiddenError());
        }

        var voice = new Voice({
          title : req.body.title,
          status : req.body.status,
          description : req.body.description,
          type : req.body.type,
          ownerId : hashids.decode(req.body.ownerId)[0],
          twitterSearch : req.body.twitterSearch,
          rssUrl : req.body.rssUrl,
          latitude : req.body.latitude,
          longitude : req.body.longitude
        });

        async.series([function(done) {
          voice.save(done);
        }, function(done) {
          if (!req.files.image) {
            return done();
          }

          voice.uploadImage('image', req.files.image.path, done);
        }, function(done) {
          voice.save(done);
        }], function(done) {
          if (err) {
            res.locals.errors = err;
            logger.log(err);
            return res.render('admin/voices/new.html', { layout : 'admin' });
          }

          VoicesPresenter.build([voice], req.currentPerson, function(err, voices) {
            if (err) {
              return next(err);
            }

            res.locals.voice = voices[0];

            res.redirect('/admin/voices');
          });
        });
      });
    },

    edit : function edit(req, res, next) {
      ACL.isAllowed('edit', 'admin.voices', req.role, {}, function(err, isAllowed) {
        if (err) {
          return next(err);
        }

        if (!isAllowed) {
          return next(new ForbiddenError());
        }

        Voice.find({ id : hashids.decode(req.params.voiceId)[0] }, function(err, result) {
          if (err) {
            return next(err);
          }

          if (result.length === 0) {
            return next(new NotFoundError());
          }

          VoicesPresenter.build(result, req.currentPerson, function(err, voices) {
            if (err) {
              return next(err);
            }

            res.locals.voice = voices[0];

            res.render('admin/voices/edit.html');
          });
        });
      });
    },

    update : function update(req, res, next) {
      ACL.isAllowed('update', 'admin.voices', req.role, {}, function(err, isAllowed) {
        if (err) {
          return next(err);
        }

        if (!isAllowed) {
          return next(new ForbiddenError());
        }

        Voice.find({ id : hashids.decode(req.params.voiceId)[0] }, function(err, result) {
          if (err) {
            return next(err);
          }

          if (result.length === 0) {
            return next(new NotFoundError());
          }

          var voice = new Voice(result[0]);

          voice.title = req.body.title;
          voice.status = req.body.status;
          voice.description = req.body.description;
          voice.type = req.body.type;
          voice.ownerId = hashids.decode(req.body.ownerId)[0];
          voice.twitterSearch = req.body.twitterSearch;
          voice.rssUrl = req.body.rssUrl;
          voice.latitude = req.body.latitude;
          voice.longitude = req.body.longitude;

          async.series([function(done) {
            if (!req.files.image) {
              done();
            }

            voice.uploadImage('image', req.files.image.path, done);
          }, function(done) {
            voice.save(done);
          }], function(err) {
            if (err) {
              res.locals.errors = err;
              logger.log(err);

              return res.render('admin/voices/edit.html', { layout : 'admin' });
            }

            VoicesPresenter.build([voice], req.currentPerson, function(err, voices) {
              if (err) {
                return next(err);
              }

              res.locals.voice = voices[0];

              res.redirect('/admin/voices');
            });
          });
        });
      });
    },

    destroy : function destroy(req, res, next) {
      ACL.isAllowed('destroy', 'admin.voices', req.role, {}, function(err, isAllowed) {
        if (err) {
          return next(err);
        }

        if (!isAllowed) {
          return next(new ForbiddenError());
        }

        Voice.find({ id : hashids.decode(req.params.voiceId)[0] }, function(err, result) {
          if (err) {
            return next(err);
          }

          if (result.length === 0) {
            return next(new NotFoundError());
          }

          var voice = new Voice(result[0]);

          voice.deleted = true;

          voice.save(function(err, result) {
            if (err) {
              return next(err);
            }

            req.flash('success', 'Voice deleted.');
            res.redirect('/admin/voices');
          });
        });

      });
    }
  }
});

module.exports = new Admin.VoicesController();
