var TopicsController = Class('TopicsController')({
  prototype : {

    people : function (req, res, next) {
      async.waterfall([
        // get our topic, by slug
        function (callback) {
          Topic.find({ slug: req.params.topicSlug }, callback)
        },

        // find records related to our topic
        function (topic, callback) {
          VoiceTopic.find({ topic_id: topic[0].id }, callback)
        },

        // get voices by topic
        function (voiceTopic, callback) {
          var voicesIds = voiceTopic.map(function (val) {
            return val.voiceId
          })
          // Knex queries FTW
          db('Voices')
            .whereIn('id', voicesIds)
            .andWhere('status', Voice.STATUS_PUBLISHED)
            .exec(callback)
        },

        // get owners of voices
        function (voices, callback) {
          var ownersIds = voices.map(function (val) {
            return val.owner_id
          })
          // Knex queries FTW
          db('Entities')
            .whereIn('id', ownersIds)
            .andWhere('is_anonymous', false)
            .andWhere('type', 'person')
            .exec(callback)
        },

        function (entities, callback) {
          var processed = Argon.Storage.Knex.processors[0](entities)
          EntitiesPresenter.build(processed, req.currentPerson, callback)
        },
      ], function (err, result) {
        if (err) { return next(err) }

        res.format({
          html: function () {
            req.entities = result
            res.locals.entities = result
            res.render('topics/people')
          },
          json: function () {
            res.json(result)
          },
        })
      })
    },

    organizations : function (req, res, next) {
      async.waterfall([
        // get our topic, by slug
        function (callback) {
          Topic.find({ slug: req.params.topicSlug }, callback)
        },

        // find records related to our topic
        function (topic, callback) {
          VoiceTopic.find({ topic_id: topic[0].id }, callback)
        },

        // get voices by topic
        function (voiceTopic, callback) {
          var voicesIds = voiceTopic.map(function (val) {
            return val.voiceId
          })
          // Knex queries FTW
          db('Voices')
            .whereIn('id', voicesIds)
            .andWhere('status', Voice.STATUS_PUBLISHED)
            .exec(callback)
        },

        // get owners of voices
        function (voices, callback) {
          var ownersIds = voices.map(function (val) {
            return val.owner_id
          })
          // Knex queries FTW
          db('Entities')
            .whereIn('id', ownersIds)
            .andWhere('is_anonymous', false)
            .andWhere('type', 'organization')
            .exec(callback)
        },

        function (entities, callback) {
          var processed = Argon.Storage.Knex.processors[0](entities)
          EntitiesPresenter.build(processed, req.currentPerson, callback)
        },
      ], function (err, result) {
        if (err) { return next(err) }

        res.format({
          html: function () {
            req.entities = result
            res.locals.entities = result
            res.render('topics/organizations')
          },
          json: function () {
            res.json(result)
          },
        })
      })
    },

    populateLocals : function (req, res, next) {
      Topic.all(function (err, allTopics) {
        if (err) { return next(err) }

        TopicsPresenter.build(allTopics, function (err, presenterTopics) {
          if (err) { return next(err) }

          req.topics = presenterTopics
          res.locals.topics = presenterTopics
          return next()
        })
      })
    },

    getTopicBySlug : function (req, res, next) {
      var result = {
        currentTopic: null,
        voices: null
      }

      async.waterfall([
        function (callback) {
          Topic.find({ slug: req.params.topicSlug }, callback);
        },

        function (topic, callback) {
          TopicsPresenter.build(topic, callback);
        },

        function (presenterTopic, callback) {
          var topicId = hashids.decode(presenterTopic[0].id)[0];
          result.currentTopic = presenterTopic[0];

          VoiceTopic.find({ topic_id: topicId }, callback);
        },

        function (voicesForTopic, callback) {
          var voicesIds = voicesForTopic.map(function (val) {
            return val.voiceId;
          });

          Voice.whereIn('id', voicesIds, callback);
        },

        function (voices, callback) {
          VoicesPresenter.build(voices, req.currentPerson, callback);
        }
      ], function (err, voices) {
        if (err) { return next(err); }

        result.voices = voices;

        res.format({
          html: function () {
            req.currentTopic = result.currentTopic;
            req.voices = result.voices;
            res.locals.currentTopic = result.currentTopic;
            res.locals.voices = result.voices;
            res.render('topics/show');
          },
          json: function () {
            res.json(result);
          }
        });
      });
    },

    // Many of the following methods are not being used, but should still remain
    // here.

    getTopicById : function getTopicById (req, res, next) {
      // Check params
      if (isNaN(req.params.id)) {
        next(new Error('Id has to be an integer'));
      }

      Topic.findById(req.params.id, function (err, result) {
        if (err) { next(err); return; }
        if (result.length === 0) { next(new Error('Not found')); }

        res.locals.topic = new Topic(result[0]);
        next();
      });
    },

    index : function index (req, res, next) {
      Topic.all(function(err, result) {
        if (err) {
          return done(err);
        }

        TopicsPresenter.build(result, function(err, topics) {
          if (err) {
            return done(err);
          }

          res.locals.topics = topics;
          res.format({
            'application/json': function () {
              res.json(res.locals.topics);
            }
          });

        });

      });

    },

    show : function show (req, res) {
      res.format({
        'text/html': function () {
          res.render('topics/show.html', {});
        },
        'application/json': function () {
          res.json(res.locals.topic);
        }
      });
    },

    new : function (req, res) {
      res.render('topics/new.html');
    },

    create : function create (req, res) {
      var topic = new Topic({
        name: req.body.name
      });

      async.series([
        function (done) {
          topic.save(done);
        },
        function (done) {
          if (!req.files['image']) { return done(); }
          topic.uploadImage('image', req.files['image'].path, function (err) {
            done(err);
          });
        },
        function (done) {
          topic.save(done);
        }
      ], function (err) {
        if (err) {
          res.locals.errors = err;
          res.render('/topics/new.html');
        } else {
          res.redirect('/topics');
        }
      });
    },

    edit : function edit (req, res) {
      res.render('topics/edit.html', {});
    },

    update : function update (req, res) {
      var topic = res.locals.topic;

      topic.name = req.body.name || topic.name;

      async.series([
        function (done) {
          topic.save(done);
        },
        function (done) {
          if (!req.files['image']) { return done(); }
          topic.uploadImage('image', req.files['image'].path, function (err) {
            done(err);
          });
        }
      ], function (err) {
        if (err) {
          res.locals.topic = topic;
          res.render('topics/edit.html');
        } else {
          res.redirect('/topics');
        }
      });
    },

    destroy : function destroy (req, res) {
      var topic = res.locals.topic;

      topic.destroy(function (err) {
        if (err) { return next(err); }
        res.redirect('/topics');
      });
    }
  }
});

module.exports = new TopicsController();
