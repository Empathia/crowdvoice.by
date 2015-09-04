/* jshint multistr: true */

var VoicesPresenter = require(path.join(process.cwd(), '/presenters/VoicesPresenter'));
var TopicsPresenter = require(path.join(process.cwd(), '/presenters/TopicsPresenter'));
var EntitiesPresenter = require(path.join(process.cwd(), '/presenters/EntitiesPresenter'));

var isProfileNameAvailable = require(__dirname + '/../lib/util/isProfileNameAvailable.js');

var HomeController = Class('HomeController')({
  prototype : {
    index : function index(req, res, next) {
      // if the person is logged in, redirect to their feed
      if (req.currentPerson) {
        // commented because SessionsController has something similar
        //req.flash('success', 'Logged in to your account successfully.');
        return res.redirect('/' + req.currentPerson.profileName + '/feed');
      }

      ACL.isAllowed('show', 'homepage', req.role, {}, function(err, isAllowed) {
        if (err) { return next(err); }

        if (!isAllowed) {
          return next(new ForbiddenError());
        }

        async.series([function(done) {
          // FeaturedVoices
          FeaturedVoice.all(function(err, result) {
            if (err) { return done(err); }

            var featuredIds = result.map(function(item) {
              return item.voiceId;
            });

            Voice.whereIn('id', featuredIds, function(err, voicesResult) {
              if (err) { return done(err); }

              var publishedVoices = voicesResult.filter(function (voice) {
                return voice.status === Voice.STATUS_PUBLISHED
              });

              VoicesPresenter.build(publishedVoices, req.currentPerson, function (err, voices) {
                if (err) { return done(err); }

                res.locals.featuredVoices = voices;

                done();
              });
            });
          });
        }, function(done) {
          Topic.all(function(err, result) {
            if (err) {
              return done(err);
            }

            TopicsPresenter.build(result, function(err, topics) {
              if (err) {
                return done(err);
              }

              res.locals.topics = topics;

              done();
            });
          });
        }, function(done) {
          // TODO: this is not top at all, it's just random orgs
          Entity.find(['type = ? LIMIT ?', ['organization', 10]], function(err, result) {
            if (err) { return done(err); }

            EntitiesPresenter.build(result, req.currentPerson, function(err, organizations) {
              if (err) { return done(err); }

              res.locals.mostActiveOrganizations = organizations;

              done();
            });
          });
        }], function(err) {
          if (err) { return next(err); }

          res.render('home/index', {
            layout : 'application',
            pageName : 'page-home'
          });
        });
      });

    },

    signupIsProfileNameAvailable : function(req, res, next) {
      isProfileNameAvailable(req.body.profileName, function (err, result) {
        if (err) { return next(err); }

        if (result) {
          return res.json({ status: 'available' });
        } else {
          return res.json({ status: 'taken' });
        }
      });
    }
  }
});

module.exports = new HomeController();
