var BlackListFilter = require(__dirname + '/BlackListFilter');

var VoicesController = Class('VoicesController').includes(BlackListFilter)({
  prototype : {
    init : function () {
      return this;
    },

    getActiveVoice : function (req, res, next) {
      Voice.findBySlug(req.params.voice_slug, function (err, voice) {
        if (err) { return next(err); }

        res.locals.voice = new Voice(voice);
        req.activeVoice = res.locals.voice;

        db.raw("SELECT COUNT (*), \
          to_char(\"Posts\".published_at, 'MM') AS MONTH, \
          to_char(\"Posts\".published_at, 'YYYY') AS YEAR \
          FROM \"Posts\" \
          WHERE \"Posts\".voice_id = ? \
          AND \"Posts\".approved = true \
          GROUP BY MONTH, YEAR \
          ORDER BY YEAR DESC, MONTH DESC", [voice.id])
        .exec(function(err, postsCount) {
          if (err) { return next(err); }

          var counts = {}

          var dates = { firstPostDate : null, lastPostDate : null};

          postsCount.rows.forEach(function(post) {
            if (!counts[post.year]) {
              counts[post.year] = {}
            }

            counts[post.year][post.month] = post.count
          });

          res.locals.postsCount = counts;

          db('Posts').where({voice_id : voice.id, approved: true}).orderBy('published_at', 'ASC').limit(1)
          .exec(function(err, firstPost) {
            if (err) {
              return next(err);
            }

            if (firstPost.length !== 0) {
              dates.firstPostDate = firstPost[0].published_at;
            }

            db('Posts').where({voice_id : voice.id, approved: true}).orderBy('published_at', 'DESC').limit(1)
            .exec(function(err, lastPost) {
              if (err) {
                return next(err);
              }

              if (lastPost.length !== 0) {
                dates.lastPostDate = lastPost[0].published_at;
              }

              res.locals.voice.firstPostDate = dates.firstPostDate;
              res.locals.voice.lastPostDate = dates.lastPostDate;

              Entity.findById(voice.ownerId, function(err, owner) {
                if (err) { return next(err); }

                res.locals.owner = new Entity(owner[0]);

                next();
              });
            })
          })
        })
      });
    },

    index : function index (req, res, next) {
      var query = {
        ownerId: req.body.ownerId,
        topics: req.body.topics,
        createdBefore: req.body.createdBefore,
        createdAfter: req.body.createdAfter
      };

      Voice.filterBy(query, function (err, result) {
        if (err) { return next(err); }

        res.format({
          'text/html': function () {
            res.locals.voices = result;
            res.render('voices/index.html');
          },
          'application/json': function () {
            res.json(result);
          }
        });
      });
    },

    show : function show (req, res) {
      res.format({
        html: function () {
          res.render('voices/show.html', {
            pageName : 'page-inner page-voice'
          });
        }
      });
    },

    new : function (req, res) {
      res.render('voices/new.html', {errors: null});
    },

    create : function create (req, res) {
      var voice = new Voice({
        title: req.body.title,
        status: req.body.status,
        description: req.body.description,
        type: req.body.type,
        ownerId: req.body.ownerId,
        twitterSearch: req.body.twitterSearch,
        rssUrl: req.body.rssUrl,
        latitude: req.body.latitude,
        longitude: req.body.longitude
      });
      voice.save(function (err) {
        if (err) {
          res.render('voices/new.html', {errors: err});
        } else {
          voice.addSlug(function (err) {
            res.redirect('/voice/' + voice.id);
          });
        }
      });
    },

    edit : function edit (req, res) {
      res.render('voices/edit.html', {errors: null});
    },

    update : function update (req, res) {
      var voice = req.activeVoice;
      voice.setProperties({
        title: req.body.title || voice.title,
        status: req.body.status || voice.status,
        description: req.body.description || voice.description,
        type: req.body.type || voice.type,
        ownerId: req.body.ownerId || voice.ownerId,
        twitterSearch: req.body.twitterSearch || voice.twitterSearch,
        rssUrl: req.body.rssUrl || voice.rssUrl,
        latitude: req.body.latitude || voice.latitude,
        longitude: req.body.longitude || voice.longitude
      });
      voice.save(function (err) {
        if (err) {
          res.render('voices/edit.hml', {errors: err});
        } else {
          res.redirect('/voice/' + voice.id);
        }
      });
    },

    destroy : function destroy (req, res) {
      var voice = req.activeVoice;
      voice.deleted = true;
      voice.save(function (err) {
        if (err) { return next(err); }
        res.redirect('/voices');
      });
    }
  }
});

module.exports = new VoicesController();
