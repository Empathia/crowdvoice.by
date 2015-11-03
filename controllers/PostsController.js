var Scrapper = require(process.cwd() + '/lib/cvscrapper');
var sanitizer = require('sanitize-html');

var readability = require('readability-api');

var rParser = new readability.parser();

readability.configure(CONFIG.readability);

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
      var readablePost;

      async.series([function(done) {
        Post.findById(hashids.decode(req.params.postId)[0], function(err, result) {
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
        if (post.sourceType !== Post.SOURCE_TYPE_LINK && post.sourceService !== Post.SOURCE_SERVICE_LINK) {
          return done();
        }

        db('ReadablePosts').where({'post_id' : post.id}).exec(function(err, result) {
          if (err) {
            return done(err);
          }

          if (result.length === 0) {
            return done();
          }

          readablePost = result[0];

          return done();
        });
      }, function(done) {
        if (!readablePost) {
          return done();
        }

        rParser.parse(post.sourceUrl, function(err, parsed) {
          if (err) {
            return done(err);
          }

          db('ReadablePosts')
          .insert({
            'post_id' : post.id,
            data : parsed,
            created_at : new Date(),
            updated_at : new Date()
          })
          .returning('id').exec(function(err, returning) {
            if (err) {
              return done(err);
            }

            db('ReadablePosts').where({id : returning[0]}).exec(function(err, result) {
              if (err) {
                return done(err);
              }

              readablePost = result[0];

              return done();
            });
          });
        })
      }], function(err) {
        if (err) {
          return next(err)
        }

        res.locals.post = post;
        res.locals.readablePost = readablePost;

        res.format({
          json : function() {
            res.json(post.toJSON());
          },
          html : function() {
            res.render('posts/show', { layout : 'login' });
          }
        })

      });
    },

    create : function create(req, res, next) {
      ACL.isAllowed('create', 'posts', req.role, {
        currentPerson: req.currentPerson,
        activeVoice: req.activeVoice,
        voiceOwnerProfile: req.params.profileName
      }, function(err, response) {
        if (err) {return next(err)}

        if (!response.isAllowed) {
          return next(new ForbiddenError('Unauthorized'));
        }

        var approved = false;

        if (req.role === 'Admin'
          || response.isVoiceOwner
          || response.isVoiceCollaborator
          || response.isOrganizationMember) {

          approved = true;
        }

        var posts = req.body.posts;

        if (posts.constructor === Object) {
          posts = [posts];
        }

        var results = [];

        async.each(posts, function(item, nextPost) {
          var postData = {};

          postData.title = item.title;
          postData.description = item.description;
          postData.sourceUrl = item.sourceUrl;
          postData.sourceService = item.sourceService;
          postData.sourceType = item.sourceType;
          postData.approved = approved;
          postData.ownerId = response.postOwner.id;
          postData.voiceId = req.activeVoice.id;
          postData.publishedAt = item.publishedAt;

          if (postData.sourceUrl === 'local_image') {
            var hrtime = process.hrtime();
            postData.sourceUrl = 'local_image_' + hashids.encode(parseInt(hrtime[0] + '' + hrtime[1], 10));
          }

          var post = new Post(postData);

          post.save(function(err, result) {
            if (err) {
              return nextPost(err);
            }

            var imagePath = '';
            if (item.imagePath.length > 0) {
              imagePath = process.cwd() + '/public' + item.imagePath;
            }

            post.uploadImage('image', imagePath, function() {
              post.save(function(err, resave) {
                if (err) { return nextPost(err); }

                Voice.findById(post.voiceId, function (err, voice) {
                  if (err) { return nextPost(err); }

                  if (item.images) {
                    item.images.forEach(function(image) {
                      // NOTE: this is sync, not async. maybe not good.
                      fs.unlinkSync(process.cwd() + '/public' + image);
                      logger.log('Deleted tmp image: ' + process.cwd() + '/public' + image);
                    });
                  }

                  FeedInjector().inject(voice[0].ownerId, 'item voiceNewPosts', voice[0], function (err) {
                    if (err) { return nextPost(err); }

                    results.push(post);

                    return nextPost();
                  });
                });
              });
            });
          });
        }, function(err) {
          if (err) { return next(err); }

          PostsPresenter.build(results, req.currentPerson, function(err, result) {
            if (err) {
              return next(err);
            }

            return res.json(result);
          });
        });
      });
    },

    edit : function edit(req, res) {
      res.render('posts/edit.html', {layout : false});
    },

    update : function update(req, res, next) {
      ACL.isAllowed('update', 'posts', req.role, {
        currentPerson : req.currentPerson,
        voiceSlug : req.params.voiceSlug,
        profileName : req.params.profileName
      }, function(err, response) {
        if (err) { return next(err); }

        if (!response.isAllowed) { return next(new ForbiddenError()); }

        var postData = {};
        var body = req.body;

        Post.find({ id : hashids.decode(req.params.postId)[0] }, function(err, result) {
          if (err) { return next(err); }

          var post = new Post(result[0]);

          post.title = body.title || post.title;
          post.description = body.description || post.description;
          post.sourceUrl = body.sourceUrl || post.sourceUrl;
          post.approved = body.approved || post.approved;
          post.publishedAt = new Date(body.publishedAt) || post.publishedAt

          post.save(function(err, result) {
            if (err) { return next(err); }

            var imagePath = '';
            if (!body.imagePath !== '') {
              imagePath = process.cwd() + '/public' + body.imagePath;
            }

            post.uploadImage('image', imagePath, function() {
              post.save(function(err, resave) {
                if (err) { return next(err); }

                PostsPresenter.build([post], req.currentPerson, function(err, posts) {
                  if (err) { return next(err); }

                  if (body.images) {
                    body.images.forEach(function(image) {
                      fs.unlinkSync(process.cwd() + '/public' + image)
                      logger.log('Deleted tmp image: ' + process.cwd() + '/public' + image);
                    });
                  }

                  return res.json(posts[0]);
                });
              });
            });
          });
        });
      });
    },

    destroy : function destroy(req, res, next) {
      ACL.isAllowed('destroy', 'posts', req.role, {
        currentPerson : req.currentPerson,
        voiceSlug : req.params.voiceSlug,
        profileName : req.params.profileName
      }, function(err, response) {
        if (err) { return next(err); }

        if (!response.isAllowed) { return next(new ForbiddenError()); }

        Post.find({ id : hashids.decode(req.params.postId)[0] }, function(err, result) {
          if (err) { return next(err); }

          if (result.length === 0) {
            return next(new NotFoundError('Post not found'));
          }

          var post = new Post(result[0]);

          post.destroy(function(err) {
            if (err) { return next(err); }

            res.json({ status : 'deleted' });
          });
        })
      });
    },

    upload : function upload(req, res, next) {
      ACL.isAllowed('upload', 'posts', req.role, {
        currentPerson: req.currentPerson,
        activeVoice: req.activeVoice,
        voiceOwnerProfile: req.params.profileName
      }, function(err, response) {
        if (err) { return next(err); }

        if (!response.isAllowed) { return next(new ForbiddenError()); }

        if (!req.files.image) {
          return res.status(400).json({ status : 'Missing Image' });
        }

        if (/.*\.(jpe?g|png|gif|tiff)[^\.]*$/i.test(req.files.image.path) === false) {
          return res.status(400).json({ status : 'Invalid Image Format' });
        }

        var transform = sharp(req.files.image.path)
          .resize(340)
          .interpolateWith(sharp.interpolator.nohalo)
          .embed()
          .progressive()
          .flatten()
          .background('#FFFFFF')
          .quality(100);

        var savePath = path.join(process.cwd(),  '/public/posts_images/');

        var hrtime = process.hrtime();

        var filename = 'upload_' + (hrtime[0] + hrtime[1] / 1000000) + '.jpg';

        var toFile = sharp().toFile(savePath + filename, function(err, info) {
          if (err) {
            return next(err);
          }

          info.path = '/posts_images/' + filename;

          var post = {
            sourceUrl : 'local_image',
            sourceType : 'image',
            sourceService : 'raw',
            title : 'No Title',
            description : 'No Description',
            images : [info]
          }

          res.json(post);
        });

        transform.pipe(toFile);
      });
    },

    preview : function preview(req, res, next) {
      ACL.isAllowed('preview', 'posts', req.role, {
        currentPerson: req.currentPerson,
        activeVoice: req.activeVoice,
        voiceOwnerProfile: req.params.profileName
      }, function (err, response) {
        if (err) { return next(err) }

        if (!response.isAllowed) {
          return next(new ForbiddenError('Unauthorized.'));
        }

        var url = req.body.url;

        request(url, function(err, response, body) {
          if (err) {
            return res.status(400).json({ status : 'Bad URL' })
          }

          var longUrl = response.request.uri.href;

          if (err) {
            logger.error(err);
            return res.status(400).json({ status : 'There was an error in the request', error : err });
          }

          Post.find(['source_url = ?', [longUrl]], function(err, posts) {
            if (err) {
              logger.error(err);
              return res.status(400).json({ status : 'There was an error in the request', error : err });
            }

            if (posts.length > 0) {
             return res.status(200).json({ status : 'The URL already exists', error : 'The URL already exists' });
            }

            Scrapper.processUrl(longUrl, response, function(err, result) {
              if (err) {
                logger.error(err);
                return res.status(400).json({ status : 'There was an error in the request', error : err });
              }

              return res.json(result);
            });
          });
        });
      });
    },

    // Create reference for SavedPosts
    // NOTE: This creates a SavedPost record, as opposed to creating a post
    savePost : function savePost(req, res, next) {
      ACL.isAllowed('savePost', 'posts', req.role, {
        currentPerson : req.currentPerson
      }, function(err, response) {
        if (err) { return next(err) }

        if (!response.isAllowed) { return next(new ForbiddenError('Unauthorized.')); }

        var sp = new SavedPost({
          entityId: response.person.id,
          postId: hashids.decode(req.params.postId)[0]
        });

        sp.save(function(err) {
          if (err) { return next(err); }

          res.format({
            json : function() {
              res.json({ status : 'saved' });
            }
          });
        });
      });
    },

    unsavePost : function unsavePost(req, res, next) {
      ACL.isAllowed('unsavePost', 'posts', req.role,  {
        currentPerson : req.currentPerson
      }, function(err, response) {
        if (err) {
          return next(err)
        }

        if (!response.isAllowed) {
          return next(new ForbiddenError());
        }

        var person = req.currentPerson;

        SavedPost.find({
          'entity_id' : response.person.id,
          'post_id' : hashids.decode(req.params.postId)[0]
        }, function(err, result) {
          if (err) { next(err); return; }
          if (result.length === 0) { next(new Error('Saved Post Not found')); }

          var sp = new SavedPost(result[0]);
          sp.destroy(function(err) {
            if (err) { next(err); return; }
            res.format({
              json: function() {
                res.json({ status : 'removed' });
              }
            });
          });
        });
      });
    },

    saveArticle: function (req, res, next) {
      /*
       * req.body = {
       *   title: String,
       *   content: String
       * }
       */

      ACL.isAllowed('create', 'posts', req.role, {
        currentPerson : req.currentPerson,
        activeVoice : req.activeVoice,
        voiceOwnerProfile : req.params.profileName
      }, function (err, response) {
        if (err) { return next(err); }

        if (!response.isAllowed) {
          return next(new ForbiddenError('Unauthorized.'));
        }

        var approved = false;

        if (req.role === 'Admin'
          || response.isVoiceOwner
          || response.isVoiceCollaborator
          || response.isOrganizationMember) {

          approved = true;
        }

        var post = new Post({
          title: req.body.title,
          description: sanitizer(req.body.content),
          ownerId: response.postOwner.id,
          voiceId: req.activeVoice.id,
          publishedAt : req.body.publishedAt,
          approved: approved,
          sourceType: Post.SOURCE_TYPE_TEXT,
          sourceUrl: null, // required if sourceType !== Post.SOURCE_TYPE_TEXT
          sourceService: Post.SOURCE_SERVICE_LOCAL
        });

        post.save(function (err) {
          if (err) { return next(err); }

          var imagePath = '';

          if (req.body.imagePath && req.body.imagePath !== '') {
            imagePath = process.cwd() + '/public' + req.body.imagePath;
          }

          post.uploadImage('image', imagePath, function() {
            post.save(function(err, resave) {
              if (err) { return next(err); }

              FeedInjector().inject(req.activeVoice.ownerId, 'item voiceNewPosts', req.activeVoice, function (err) {
                if (err) { return next(err); }

                PostsPresenter.build([post], req.currentPerson, function(err, posts) {
                  if (err) { return next(err); }

                  if (req.body.imagePath) {
                    fs.unlinkSync(process.cwd() + '/public' + req.body.imagePath);
                    logger.log('Deleted tmp image: ' + process.cwd() + '/public' + req.body.imagePath);
                  }

                  return res.json(posts[0]);
                });
              });
            });
          });
        });
      });
    },

    deleteOlderThan: function (req, res, next) {
      /*
       * req.body = {
       *   olderThanDate: <Date string>
       * }
       */

      ACL.isAllowed('deleteOlderThan', 'posts', req.role, {
        currentPerson: req.currentPerson,
        voiceSlug: req.params.voiceSlug,
        profileName: req.params.profileName
      }, function (err, response) {
        if (err) { return next(err); }

        if (!response.isAllowed) {
          return next(new ForbiddenError('Unauthorized'));
        }

        db('Posts')
          .where('voice_id', req.activeVoice.id) // correct voice
          .andWhere('approved', false) // unmoderated
          .andWhereRaw("created_at < '" + moment(req.body.olderThanDate).format() + "'") // older than
          .del()
          .exec(function (err, affectedRows) {
            if (err) { return next(err); }

            res.json({
              status: 'ok',
              deletedPostsCount: affectedRows
            });
          });
      });
    },

    deleteAllUnmoderated: function (req, res, next) {
      ACL.isAllowed('deleteAllUnmoderated', 'posts', req.role, {
        currentPerson: req.currentPerson,
        voiceSlug: req.params.voiceSlug,
        profileName: req.params.profileName
      }, function (err, response) {
        if (err) { return next(err); }

        if (!response.isAllowed) {
          return next(new ForbiddenError('Unauthorized.'));
        }

        db('Posts')
          .where({
            voice_id: req.activeVoice.id,
            approved: false
          })
          .del()
          .exec(function (err, affectedRows) {
            if (err) { return next(err); }

            res.json({
              status: 'ok',
              deletedPostsCount: affectedRows
            });
          });
      });
    },

    uploadPostImage: function (req, res, next) {
      ACL.isAllowed('uploadPostImage', 'posts', req.role, {
        currentPerson: req.currentPerson,
        voiceSlug: req.params.voiceSlug,
        profileName: req.params.profileName
      }, function (err, response) {
        if (err) { return next(err); }

        if (!response.isAllowed) {
          return next(new ForbiddenError('Unauthorized.'));
        }

        if (!req.files.image) {
          return res.status(400).json({ status : 'Missing Image' });
        }

        if (/.*\.(jpe?g|png|gif|tiff)[^\.]*$/i.test(req.files.image.path) === false) {
          return res.status(400).json({ status : 'Invalid Image Format' });
        }

        var transform = sharp(req.files.image.path)
          .resize(340)
          .interpolateWith(sharp.interpolator.nohalo)
          .embed()
          .progressive()
          .flatten()
          .background('#FFFFFF')
          .quality(100);

        var savePath = path.join(process.cwd(), '/public/posts_images/'),
          hrtime = process.hrtime(),
          filename = 'upload_' + (hrtime[0] + hrtime[1] / 1000000) + '.jpg',
          toFile = sharp().toFile(savePath + filename, function(err, info) {
            if (err) { return next(err); }

            info.path = '/posts_images/' + filename;

            res.json(info);
          });

        transform.pipe(toFile);
      });
    },

  }
});

module.exports = new PostsController();
