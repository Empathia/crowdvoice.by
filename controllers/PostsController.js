var Scrapper = require(process.cwd() + '/lib/cvscrapper');

var PostsController = Class('PostsController').includes(BlackListFilter)({
  prototype : {
    init : function (config){
      this.name = this.constructor.className.replace('Controller', '')

      return this;
    },

    index : function index (req, res, next) {
      Post.all(function (err, posts) {
        res.render('posts/index.html', {posts: posts});
      });
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
      }, function(err, response) {

        if (err) {return next(err)}

        if (!response.isAllowed) {return next(new ForbiddenError())}

        var approved = false;

        if (req.role === 'Admin' ||
          (response.currentPerson.id === response.voice.ownerId) ||
          response.isVoiceCollaborator ||
          response.isOrganizationMember) {

          approved = true;
        }

        var postData = {};
        var body = req.body;

        postData.title = body.title;
        postData.description = body.description;
        postData.sourceUrl = body.sourceUrl;
        postData.sourceService = body.sourceService;
        postData.sourceType = body.sourceType;
        postData.approved = approved;
        postData.ownerId = req.currentPerson.id;
        postData.voiceId = response.voice.id;

        var post = new Post(postData);

        post.save(function(err, result) {
          if (err) {
            return next(err);
          }

          post.uploadImage('image', process.cwd() + '/public' + body.imagePath, function() {
            post.save(function(err, resave) {
              if (err) {
                return next(err);
              }

              PostsPresenter.build([post], function(err, posts) {
                if (err) {
                  return next(err);
                }

                console.log(posts[0])

                return res.json(posts[0]);
              })
            })
          })
        });
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

      request(url, function(err, response, body) {
        var longUrl = response.request.uri.href;

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
      })
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
              res.redirect('/posts');
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
    },

    unsavePost : function unsavePost (req, res, next) {
      var person = req.currentPerson;

      var unsavePost = function (personId) {
        SavedPost.find({
          entity_id: personId,
          post_id: req.params.postId
        }, function (err, result) {
          if (err) { next(err); return; }
          if (result.length === 0) { next(new Error('Not found')); }

          var sp = new SavedPost(result[0]);
          sp.destroy(function (err) {
            if (err) { next(err); return; }
            res.format({
              'text/html': function () {
                res.redirect('/' + req.currentPerson.profileName + '/saved_posts');
              },
              'application/json': function () {
                res.json({result: 'Ok'});
              }
            });
          });
        });
      };

      if (req.currentPerson.isAnonymous) {
        req.currentPerson.owner(function (err, result) {
          unsavePost(result.id);
        });
      } else {
        unsavePost(hashids.decode(req.currentPerson.id)[0]);
      }
    }
  }
});

module.exports = new PostsController();
