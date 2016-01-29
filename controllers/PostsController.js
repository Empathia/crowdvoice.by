var Scrapper = require(process.cwd() + '/lib/cvscrapper');
var sanitizer = require('sanitize-html');
var ReadabilityParser = require(path.join(__dirname, '../lib/ReadabilityParser.js'));
var truncatise = require('truncatise');
var Twitter = require('twitter');

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
      var post,
        readablePost,
        already = false;

      async.series([function(done) {
        Post.findById(hashids.decode(req.params.postId)[0], function(err, result) {
          if (err) { return done(err); }

          if (result.length === 0) {
            return done(new NotFoundError('Post Not Found'));
          }

          PostsPresenter.build(result, req.currentPerson, function (err, posts) {
            if (err) { return done(err); }

            post = new Post(posts[0]);

            return done();
          });
        });
      }, function(done) {
        if (post.sourceType !== Post.SOURCE_TYPE_LINK && post.sourceService !== Post.SOURCE_SERVICE_LINK) {
          return done();
        }

        ReadablePost.find({
          post_id: hashids.decode(post.id)[0]
        }, function (err, readablePosts) {
          if (err) { return done(err); }

          if (readablePosts[0]) {
            already = true;
            readablePost = new ReadablePost(readablePosts[0]);
          }

          return done();
        });
      }, function(done) {
        if (post.sourceType !== Post.SOURCE_TYPE_LINK && post.sourceService !== Post.SOURCE_SERVICE_LINK) {
          return done();
        }

        // we already found something
        if (already) {
          return done();
        }

        var parser = new ReadabilityParser(post.sourceUrl);

        parser.fetch(function(err, readability) {
          if (err) { return done(err); }

          readablePost = new ReadablePost({
            post_id: hashids.decode(post.id)[0],
            data: readability.parse(),
            readerable: readability.isProbablyReaderable(),
          });

          if (!readablePost.data) {
            return readablePost.save(done);
          }

          var defaults = _.clone(sanitizer.defaults.allowedTags);
          defaults.splice(sanitizer.defaults.allowedTags.indexOf('a'), 1);

          readablePost.data.content = sanitizer(readablePost.data.content, {
            allowedTags: defaults.concat(['img'])
          });

          readablePost.data.content = truncatise(readablePost.data.content, {
            TruncateLength: 199, // seems to miscount upwards by one word, so give it one less word
            TruncatedBy: 'words',
            Strict: false,
            StripHTML: false,
            Suffix: '...',
          });

          readablePost.save(done)
        });
      }], function(err) {
        if (err) { return next(err); }

        res.locals.post = post;
        res.locals.readablePost = readablePost;

        res.format({
          json : function() {
            res.json(post);
          },
          html : function() {
            res.render('posts/show', { layout : 'postShow' });
          }
        });
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
          return next(new ForbiddenError());
        }

        var approved = false;

        if (req.role === 'Admin'
          || response.isVoiceDirectOwner
          || response.isVoiceIndirectOwner
          || response.isVoiceCollaborator
          || response.isOrganizationMember
          || response.isOrganizationOwner) {

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
          postData.extras = item.extras;

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
            if (item.imagePath && item.imagePath.length > 0) {
              imagePath = path.join(process.cwd(), 'public', item.imagePath.replace(/preview_/, ''));
            }

            post.uploadImage('image', imagePath, function() {
              post.save(function(err, resave) {
                if (err) { return nextPost(err); }

                Voice.findById(post.voiceId, function (err, voice) {
                  if (err) { return nextPost(err); }

                  if (item.images) {
                    item.images.forEach(function(image) {
                      if (fs.existsSync(process.cwd() + '/public' + image)) {
                        fs.unlinkSync(process.cwd() + '/public' + image);
                        logger.log('Deleted tmp image: ' + process.cwd() + '/public' + image);
                      }

                      if (fs.existsSync(process.cwd() + '/public' + image.replace(/preview_/, ''))) {
                        fs.unlinkSync(process.cwd() + '/public' + image.replace(/preview_/, ''));
                        logger.log('Deleted tmp image: ' + process.cwd() + '/public' + image.replace(/preview_/, ''));
                      }
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
          post.publishedAt = (body.publishedAt ? new Date(body.publishedAt) : new Date(post.publishedAt));

          post.save(function(err, result) {
            if (err) { return next(err); }

            var imagePath = body.imagePath;

            if (body.imagePath.length > 0) {
              if (imagePath.trim().match(/^https?/) === null) {
                imagePath = path.join(process.cwd(), 'public', body.imagePath.replace(/preview_/, ''));
              }
            }

            async.series([function(done) {
              if (imagePath === '') {
                return done();
              }

              // NOTE: .uploadImage does not return err, thus if you just pass done
              //       to it directly it'll always return error
              post.uploadImage('image', imagePath, function () {
                done();
              });
            }, function(done) {
              if (imagePath === '') {
                post.imageBaseUrl = '';
                post.imageMeta = {};
              }

              done();
            }, function(done) {
              post.save(done);
            }], function(err) {
              if (err) { return next(err); }

              PostsPresenter.build([post], req.currentPerson, function(err, posts) {
                if (err) { return next(err); }

                if (body.images) {
                  body.images.forEach(function(image) {
                    if (fs.existsSync(process.cwd() + '/public' + image)) {
                      fs.unlinkSync(process.cwd() + '/public' + image);
                      logger.log('Deleted tmp image: ' + process.cwd() + '/public' + image);
                    }

                    if (fs.existsSync(process.cwd() + '/public' + image.replace(/preview_/, ''))) {
                      fs.unlinkSync(process.cwd() + '/public' + image.replace(/preview_/, ''));
                      logger.log('Deleted tmp image: ' + process.cwd() + '/public' + image.replace(/preview_/, ''));
                    }
                  });
                }

                return res.json(posts[0]);
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

        var savePath = path.join(process.cwd(),  '/public/posts_images/'),
          hrtime = process.hrtime(),
          filename = 'upload_' + (hrtime[0] + hrtime[1] / 1000000) + '.jpg';

        var post = {
          sourceUrl : 'local_image',
          sourceType : 'image',
          sourceService : 'raw',
          title : 'No Title',
          description : 'No Description',
          images : null
        };

        async.series([
          // save original
          function (nextSeries) {
            var rs = fs.createReadStream(req.files.image.path),
              ws = fs.createWriteStream(path.join(savePath, filename));

            rs.pipe(ws);

            rs.on('end', function () {
              ws.end();
              return nextSeries();
            });

            rs.on('error', function (err) {
              return nextSeries(err);
            });
            ws.on('error', function (err) {
              return nextSeries(err);
            });
          },

          // make preview from original
          function (nextSeries) {
            transform.pipe(sharp().toFile(savePath + 'preview_' + filename, function(err, info) {
              if (err) { return nextSeries(err); }

              info.path = '/posts_images/preview_' + filename;

              post.images = [info];

              return nextSeries();
            }));
          }
        ], function (err) {
          if (err) { return next(err); }

          res.json(post);
        });
      });
    },

    preview : function preview(req, res, next) {
      var controller = this;

      ACL.isAllowed('preview', 'posts', req.role, {
        currentPerson: req.currentPerson,
        activeVoice: req.activeVoice,
        voiceOwnerProfile: req.params.profileName
      }, function (err, response) {
        if (err) { return next(err) }

        if (!response.isAllowed) {
          return next(new ForbiddenError());
        }

        if (req.body.url) {
          return controller._previewURL(req, res);
        }

        if (req.body.id_str) {
          return controller._previewTweet(req, res);
        }

        return next(new Error('Invalid Parameters'));
      });
    },

    _previewTweet : function _previewTweet(req, res) {
      var controller = this;

      var TwitterClient = new Twitter({
        'consumer_key' : CONFIG.twitter['consumer_key'],
        'consumer_secret' : CONFIG.twitter['consumer_secret'],
        'access_token_key' : req.session.twitterAccessToken,
        'access_token_secret' : req.session.twitterAccessTokenSecret
      });

      TwitterClient.get('/statuses/show/' + req.body.id_str + '.json', {include_entities:true}, function(err, tweet) {
        if (err) {
          return res.status(500).json(err);
        }

        var posts = [];

        var tweetPost = Post.buildFromTweet(tweet);
        tweetPost.images = [];

        posts.push(tweetPost);

        // Extract URLs from tweet;
        var hasUrls = false;

        if (tweet.entities && tweet.entities.urls && tweet.entities.urls.length > 0) {
          hasUrls = true;
        }

        var hasMedia = false;

        if (tweet.entities && tweet.entities.media && tweet.entities.media.length > 0) {
          hasMedia = true;
        }

        async.series([function(done) {
          if (!hasUrls) {
            return done();
          }

          async.each(tweet.entities.urls, function(entity, doneEach) {
            controller._processURL(entity.url, function(err, result) {
              if (result.status === 200) {
                posts.push(result.result);
              }

              return doneEach();
            });
          }, done);
        }, function(done) {
          if (!hasMedia) {
            return done();
          }

          async.each(tweet.entities.media, function(entity, doneEach) {
            controller._processURL(entity.media_url, function(err, result) {
              if (result.status === 200) {
                posts.push(result.result);
              }

              return doneEach();
            });
          }, done);
        }], function(err) {
          if (err) {
            return res.status(500).json(err);
          }

          return res.json(posts);
        });
      });
    },

    _processURL : function _processURL(originalURL, callback) {
      var logScrapperError = function (url, error, callback) {
        var errorLog = new ScrapperError({
          url: url,
          error: error,
          errorStack: error.stack
        });

        logger.error(error);
        logger.error(error.stack);

        errorLog.save(callback);
      };

      request({
        url: originalURL,
        headers: {
          'User-Agent': 'Mozilla/5.0'
        }
      }, function (err, response, body) {
        if (err) {
          return logScrapperError(originalURL, err, function (err) {
            if (err) { return callback(err);; }

            return callback(err, {
              status : 400,
              message : 'Bad URL',
              error : 'Bad URL'
            });
          });
        }

        Post.find({
          source_url: response.request.uri.href
        }, function (err, posts) {
          if (err) {
            return logScrapperError(response.request.uri.href, err, function (err) {
              if (err) { return callback(err); }

              return callback(err, {
                status : 400,
                message : 'There was an error in the request',
                error: err
              });
            });
          }

          if (posts.length > 0) {
            return callback(err, {
              status : 400,
              message : 'The URL already exists',
              error: 'The URL already exists'
            });

          }

          Scrapper.processUrl(response.request.uri.href, response, function (err, result) {
            if (err) {
              return logScrapperError(req.body.url, err, function (err) {
                if (err) { return callback(err); }

                return callback(err, {
                  status : 400,
                  message: 'There was an error in the request',
                  error: err
                });
              });
            }

            return callback(err, {
              status : 200,
              result : result
            });
          });
        });
      });
    },

    _previewURL : function _previewURL(req, res) {

      this._processURL(req.body.url, function(err, result) {
        if (err) {
          return res.status(500).json(err);
        }

        if (result.status !== 200) {
          return res.status(result.status).json(result.message);
        }

        res.status(result.status).json(result.result);
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
          return next(new ForbiddenError());
        }

        var approved = false;

        if (req.role === 'Admin'
          || response.isVoiceDirectOwner
          || response.isVoiceIndirectOwner
          || response.isVoiceCollaborator
          || response.isOrganizationMember
          || response.isOrganizationOwner) {

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
          return next(new ForbiddenError());
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
          imageInfo;

        async.series([
          // save original
          function (nextSeries) {
            var rs = fs.createReadStream(req.files.image.path),
              ws = fs.createWriteStream(path.join(savePath, filename));

            rs.pipe(ws);

            rs.on('end', function () {
              ws.end();
              return nextSeries();
            });

            rs.on('error', function (err) {
              return nextSeries(err);
            });
            ws.on('error', function (err) {
              return nextSeries(err);
            });
          },

          // make preview from original
          function (nextSeries) {
            transform.pipe(sharp().toFile(savePath + 'preview_' + filename, function(err, info) {
              if (err) { return nextSeries(err); }

              info.path = '/posts_images/preview_' + filename;

              imageInfo = info;

              return nextSeries();
            }));
          }
        ], function (err) {
          if (err) { return next(err); }

          res.json(imageInfo);
        });
      });
    },

  }
});

module.exports = new PostsController();
