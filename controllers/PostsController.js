var Scrapper = require(process.cwd() + '/lib/cvscrapper');

var expander = require('expand-url');

var PostsController = Class('PostsController').includes(BlackListFilter)({
  prototype : {
    init : function (config){
      this.name = this.constructor.className.replace('Controller', '')

      return this;
    },

    show : function show(req, res, next) {
      if (req.params.postId === 'edit') { next(); return; }

      var post;
      var voice;
      var entity;

      async.series([function(done) {
        Post.findById(req.params.postId, function(err, result) {
          if (err) {
            return done(err);
          }

          if (result.length === 0) {
            return done(new NotFoundError('Post Not Found'));
          }

          post = new Post(result[0]);

          done();
        });
      }, function(done) {
        Voice.findBySlug(req.params.voiceSlug, function(err, result) {
          if (err) {
            return done(err);
          }

          if (result.length === 0) {
            return done(new NotFoundError('Voice Not Found'));
          }

          voice = new Voice(result[0]);

          done();
        })
      }, function(done) {
        Entity.find({'profile_name' : req.params.profileName}, function(err, result) {
          if (err) {
            return done(err);
          }

          if (result.length === 0) {
            return done(new NotFoundError('Entity Not Found'));
          }

          entity = new Entity(result[0]);

          done();
        })
      }], function(err) {
        if (err) {
          return next(err);
        }

        ACL.isAllowed('show', 'posts', req.role, {
          post : post,
          voice : voice,
          entity : entity
        }, function(err, isAllowed) {
          if (err) {
            return next(err);
          }

          if (!isAllowed) {
            return next(new ForbiddenError())
          }

          res.format({
            json : function() {
              res.json(post.toJSON());
            },
            html : function() {
              res.render('posts/show', {layout : 'application', entity : entity.toJSON(), voice : voice.toJSON(), post : post.toJSON()});
            }
          })
        });
      });
    },

    create : function create(req, res, next) {
      ACL.isAllowed('create', 'posts', req.role, {
        currentPerson : req.currentPerson,
        voiceSlug : req.params.voiceSlug,
        profileName : req.params.profileName
      }, function(err, isAllowed) {

        if (err) {return next(err)}

        if (!isAllowed) {return next(new ForbiddenError())}

        res.redirect('/post/id');
      });
    },

    edit : function edit(req, res) {
      res.render('posts/edit.html', {layout : false});
    },

    update : function update(req, res) {
      res.redirect('/post/id');
    },

    destroy : function destroy(req, res) {
      res.redirect('/posts');
    },

    preview : function preview(req, res, next) {
      var url = req.body.url;

      expander.expand(url, function(err, longUrl) {
        if (err) {
          logger.error(err);
          return res.status(400).json({status : "There was an error in the request", error : err});
        }

        Post.find(["source_url = ?", [longUrl]], function(err, posts) {
          if (err) {
            logger.error(err);
            return res.status(400).json({status : "There was an error in the request", error : err});
          }

          if (posts.length > 0) {
           return res.status(200).json({status : "The URL already exists", error : "The URL already exists"});
          }

          Scrapper.processUrl(url, function (err, result) {
            if (err) {
              logger.error(err);
              return res.status(400).json({status : "There was an error in the request", error : err});
            }

            return res.json(result);
          });
        })
      });
    },

    // Create reference for SavedPosts
    // NOTE: This is not the same as saving a post.
    savePost : function savePost (req, res, next) {
      var person = req.currentPerson;

      var createSavedPost = function (personId) {
        var sp = new SavedPost({
          entityId: personId,
          postId: req.params.postId
        });
        sp.save(function (err) {
          if (err) { next(err); return; }

          res.format({
            'text/html': function () {
              res.redirect(req.currentPerson.profileName + '/saved_posts');
            },
            'application/json': function () {
              res.json({result: 'Ok'});
            }
          });
        });
      };

      if (req.currentPerson.isAnonymous) {
        req.currentPerson.owner(function (err, result) {
          createSavedPost(result.id);
        });
      } else {
        createSavedPost(hashids.decode(req.currentPerson.id)[0]);
      }
    }
  }
});

module.exports = new PostsController();
