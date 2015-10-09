'use strict';

var application = require('neonode-core');
require(path.join(__dirname, '../../lib/routes.js'));

// Load moment
global.moment = require('moment');

global.FeedInjector = require(path.join(__dirname, '../../lib/FeedInjector.js'));
require(path.join(__dirname, '../../presenters/PostsPresenter'));

require('tellurium');
require(process.cwd() + '/node_modules/tellurium/reporters/pretty');

Tellurium.reporter = new Tellurium.Reporter.Pretty({
  colorsEnabled : true
});

var request = require('superagent');
var crypto = require('crypto');

CONFIG.database.logQueries = false;

var urlBase = 'http://localhost:3000';
var csrf;
var cookies;

Tellurium.suite('Entities Controller')(function() {
  var suite = this;

  this.setup(function() {
    var setup = this;

    async.series([
      function(done) {
        Entity.findById(1, function(err, jack) {
          jack = jack[0];

          suite.registry.jack = jack;
          done()
        })
      },
      function(done) {
        Entity.findById(3, function(err, john) {
          john = john[0];

          suite.registry.john = john;
          done()
        })
      },

      function(done) {
        Entity.findById(5, function(err, peter) {
          peter = peter[0];

          suite.registry.peter = peter;
          done()
        })
      },
      function(done) {
        Entity.findById(7, function(err, steve) {
          steve = steve[0];

          suite.registry.steve = steve;
          done()
        })
      }
    ], function(err) {
      if (err) {
        throw new Error(err);
      }

      setup.completed();
    })
  });

  this.describe('Actions')(function(desc) {

    desc.specify('Follow an entity')(function(spec) {
      var jack = suite.registry.jack;
      var peter = suite.registry.peter;
      var agent = request.agent();

      async.series([
        function (done) {
          request
            .get(urlBase + '/csrf')
            .end(function (err, res) {
              cookies = res.headers['set-cookie'];
              csrf = res.text;
              done();
            });
        },

        function (done) {
          request
            .post(urlBase + '/session')
            .set('cookie', cookies)
            .send({
              _csrf: csrf,
              username: 'jake',
              password: '12345678'
            })
            .end(function (err, res) {
              if (err) { throw err }

              agent.saveCookies(res)

              done()
            })
        }
      ], function(err) {
        if (err) {
          throw new Error(err);
        }

        agent
          .post(urlBase + '/' + peter.profileName + '/follow')
          .accept('application/json')
          .set('cookie', cookies)
          .send({
            _csrf: csrf,
            followerId : hashids.encode(jack.id)
          })
          .end(function(err, res) {
            if (err) {
              spec.assert(true).toBe(false);
            }

            console.log(res.body)

            spec.assert(res.status).toBe(200);
            spec.assert(res.body.status).toBe('followed');
            spec.completed();
          })
      });
    });
  });
})

application.server.listen(CONFIG.port, function () {
  Tellurium.run();
});
