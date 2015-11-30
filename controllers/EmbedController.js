/* globals async, db, Voice, VoicesPresenter */
var EmbedController = Class('EmbedController')({
  prototype : {
    voice : function voice (req, res, next) {
      Voice.findBySlug(req.params.voice_slug, function (err, voice) {
        if (err) { return next(err); }

        // defaulting config options
        var params = {};
        var isValidHex = new RegExp("^(#)?([0-9a-fA-F]{3})([0-9a-fA-F]{3})?$");
        if (!isValidHex.test(req.query.accent)) { req.query.accent = 'FF9400'; }

        if (!['dark', 'light'].some(function (propertyName) {
          return (req.query.theme === propertyName);
        })) { params.theme = 'light'; }
        else { params.theme = req.query.theme; }

        if (!['cards', 'list'].some(function (propertyName) {
          return (req.query.default_view === propertyName);
        })) { params.default_view = 'cards'; }
        else { params.default_view = req.query.default_view; }

        params.change_view = req.query.change_view === 'true';
        params.description = req.query.description === 'true';
        params.background = req.query.background === 'true';
        params.share = req.query.share === 'true';

        // return active voice and locales
        var dates = { firstPostDate : null, lastPostDate : null };
        var counts = {};

        async.series([
          function (done) {
            db.raw("SELECT COUNT (*), \
              to_char(\"Posts\".published_at, 'MM') AS MONTH, \
              to_char(\"Posts\".published_at, 'YYYY') AS YEAR \
              FROM \"Posts\" \
              WHERE \"Posts\".voice_id = ? \
              AND \"Posts\".approved = true \
              GROUP BY MONTH, YEAR \
              ORDER BY YEAR DESC, MONTH DESC", [voice.id])
            .exec(function (err, postsCount) {
              if (err) { return done(err); }

              postsCount.rows.forEach(function (post) {
                if (!counts[post.year]) { counts[post.year] = {}; }
                counts[post.year][post.month] = post.count;
              });
              done();
            });
          },

          function (done) {
            db('Posts').where({ 'voice_id': voice.id, approved : true })
            .orderBy('published_at', 'ASC').limit(1)
            .exec(function (err, firstPost) {
              if (err) { return done(err); }

              if (firstPost.length) { dates.firstPostDate = firstPost[0].published_at; }

              db('Posts').where({ 'voice_id': voice.id, approved : true })
              .orderBy('published_at', 'DESC').limit(1)
              .exec(function (err, lastPost) {
                if (err) { return done(err); }

                if (lastPost.length) { dates.lastPostDate = lastPost[0].published_at; }
                done();
              });
            });
          }
        ], function () {
          VoicesPresenter.build([voice], req.currentPerson, function (err, voices) {
            if (err) { return next(err); }

            res.locals.params = params;
            res.locals.voice = new Voice(voices[0]);
            res.locals.firstPostDate = dates.firstPostDate;
            res.locals.lastPostDate = dates.lastPostDate;
            res.locals.postsCount = counts;

            res.format({
              html : function html () {
                res.render('embed/show.html', { layout : 'embed' });
              }
            });
          });
        });
      });
    }
  }
});

module.exports = new EmbedController();
