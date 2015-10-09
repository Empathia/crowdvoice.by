'use strict';

global.Admin = {};

var application = require('neonode-core');
require(path.join(__dirname, '../../lib/routes.js'));

// Load moment
global.moment = require('moment');

global.FeedInjector = require(path.join(__dirname, '../../lib/FeedInjector.js'));
require(path.join(__dirname, '../../presenters/PostsPresenter'));

application._serverStart();

require('tellurium');
require(process.cwd() + '/node_modules/tellurium/reporters/pretty');

Tellurium.reporter = new Tellurium.Reporter.Pretty({
  colorsEnabled : true
});

var request = require('superagent');
var crypto = require('crypto');

CONFIG.database.logQueries = false;

var urlBase = 'http://localhost:3000';

Tellurium.suite('Entities Controller')(function() {
  var suite = this;

  this.describe('Actions')(function(desc) {

    desc.specify('Follow an entity')(function(spec) {
      var cookies;
      var csrf;
      var agent = request.agent();

      async.series([
        function (done) {
          agent
            .get(urlBase + '/csrf')
            .end(function (err, res) {
              if (err) { throw err }

              csrf = res.text;
              done();
            });
        },

        function (done) {
          agent
            .post(urlBase + '/session')
            .send({
              _csrf: csrf,
              username: 'cersei',
              password: '12345678'
            })
            .end(function (err, res) {
              if (err) { throw err }

              //agent.saveCookies(res)

              done()
            })
        },
      ], function(err) {
        if (err) {
          throw new Error(err);
        }

        agent
          .post(urlBase + '/jon-snow/follow')
          .accept('application/json')
          .send({
            _csrf: csrf,
            followerId : hashids.encode(3) // cersei's ID
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
