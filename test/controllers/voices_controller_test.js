#!/usr/bin/env node
'use strict';

require('tellurium');
require(process.cwd() + '/node_modules/tellurium/reporters/pretty');

var basePath = __dirname + '/../../';
var application = require('neonode-core');

require(basePath + '/lib/routes.js');

global.ACL = require(basePath + 'lib/ACL/ACL.js');
require(basePath + 'lib/ACL/visitor.js');
require(basePath + 'lib/ACL/anonymous.js');
require(basePath + 'lib/ACL/person.js');
require(basePath + 'lib/ACL/admin.js');

Tellurium.reporter = new Tellurium.Reporter.Pretty({
  colorsEnabled : true
});

var async = require('async');
var request = require('superagent');
var crypto = require('crypto');

CONFIG.database.logQueries = false;

var urlBase = 'http://localhost:3000';
var csrf;
var cookies;

function uid (number) {
  return crypto.randomBytes(number).toString('hex');
}
function rid () {
  return Math.floor(Math.random()*100000000).toString();
}

/* Entity Model Tests
 *
 */
Tellurium.suite('Voices Controller')(function () {

  this.setup(function () {
    var setup = this;
    Promise.all([
      db('Voices').del(),
      db('Slugs').del(),
    ]).then(function () {
      setup.completed();
    });
  });

  this.beforeEach(function (spec) {
    spec.registry.userData = {
      username: 'juan_' + uid(16),
      email: 'person_' + uid(16) + '@test.com',
      password: 'mysecret'
    };
    spec.registry.voiceData = {
      title : 'Voice Title ' + uid(16),
      description : 'Voice Description',
      latitude : null,
      longitude : null,
      locationName : null,
      ownerId : 1,
      status : Voice.STATUS_DRAFT,
      type : Voice.TYPE_PUBLIC,
      twitterSearch : null,
      tweetLastFetchAt : null,
      rssUrl : null,
      rssLastFetchAt : null,
    };
    spec.registry.personData = {
      type: 'person',
      name: 'john_' + uid(16),
      profileName: 'john' + uid(16),
      isAnonymous: false
    };
  });

  this.describe('Actions')(function () {

    // Voices#index
    this.specify('GET /index should return a list of ')(function (spec) {
      var v1, e1;

      async.series([
        function (done) {
          v1 = new Voice(spec.registry.voiceData);
          v1.save(done);
        },
      ], function (err) {
        var req = request.
          get(urlBase + '/voices').
          accept('application/json').
          end(function (err, res) {
            spec.assert(res.body.length > 0).toBeTruthy();
            spec.completed();
          });
      });
    });

    // Voices#show
    this.specify('GET /:profile_name/:voiceSlug should return a voice')(function (spec) {
      var v1, e1;

      async.series([
        function (done) {
          e1 = new Entity(spec.registry.personData);
          e1.save(done);
        },
        function (done) {
          v1 = new Voice(spec.registry.voiceData);
          v1.ownerId = e1.id;
          v1.save(done);
        },
        function (done) {
          v1.addSlug(done);
        }
      ], function (err) {
        var req = request.
          get(urlBase + '/' + e1.profileName + '/' + v1.getSlug()).
          accept('text/html').
          end(function (err, res) {
            spec.assert(res.status).toBe(200);
            spec.completed();
          });
      });
    });

    // Voices#new
    this.specify('GET /voice/new should return 200')(function (spec) {
      var v1, e1;

      var req = request.
        get(urlBase + '/voice/new');

      req.end(function (err, res) {
        spec.assert(res.status).toBe(200);
        spec.completed();
      });
    });

    // Voices#edit
    this.specify('GET /:profileName/:voice_slug/edit should return 200 if record exists')(function (spec) {
      var v1, e1;

      async.series([
        function (done) {
          e1 = new Entity(spec.registry.personData);
          e1.save(done);
        },
        function (done) {
          v1 = new Voice(spec.registry.voiceData);
          v1.save(done);
        },
        function (done) {
          v1.addSlug(done);
        }
      ], function (err) {
        var req = request.
        get(urlBase + '/' + e1.profileName + '/' + v1.getSlug() +  '/edit');

        req.end(function (err, res) {
          spec.assert(res.status).toBe(200);
          spec.completed();
        });
      });
    });

    // Voices#create
    this.specify('POST /voice should create a voice')(function (spec) {
      var e1, u1, cookies, csrf;

      async.series([
        function (done) {
          e1 = new Entity(spec.registry.personData);
          e1.save(done);
        },
        function (done) {
          u1 = new User(spec.registry.userData);
          u1.entityId = e1.id;
          u1.save(done);
        },
        function (done) {
          var req = request
            .get(urlBase + '/csrf');

          req.end(function (err, res) {
            cookies = res.headers['set-cookie'];
            csrf = res.text;
            done();
          });
        },
        function (done) {
          var req = request
            .post(urlBase + '/session')
            .set('cookie', cookies)
            .send({_csrf: csrf, username: u1.username, password: spec.registry.userData.password});

          req.end(function (err, res) {
            done();
          });
        },
        function (done) {
          var data = spec.registry.voiceData;
          var req = request.post(urlBase + '/voice');

          data._csrf = csrf;
          req.set('cookie', cookies);
          req.send(data);
          req.end(function (err, res) {
            if (err) { return done(err); }
            done();
          });
        },
      ], function (err) {
        Voice.find({title: spec.registry.voiceData.title}, function (err, result) {
          spec.assert(result.length > 0).toBeTruthy();
          spec.completed();
        });
      });
    });

    // Voices#update
    this.specify('PUT /voice should update a voice')(function (spec) {
      var u1, v1, e1, cookies, csrf;

      async.series([
        function (done) {
          e1 = new Entity(spec.registry.personData);
          e1.save(done);
        },
        function (done) {
          v1 = new Voice(spec.registry.voiceData);
          v1.ownerId = e1.id;
          v1.save(done);
        },
        function (done) {
          v1.addSlug(done);
        },
        function (done) {
          var req = request
            .get(urlBase + '/csrf');

          req.end(function (err, res) {
            cookies = res.headers['set-cookie'];
            csrf = res.text;
            done();
          });
        },
        function (done) {
          var req = request.put(urlBase + '/' + e1.profileName + '/' + v1.getSlug());
          req.set('cookie', cookies);
          req.send({_csrf: csrf, title: 'modified'});
          req.end(function (err, res) {
            done();
          });
        }
      ], function (err) {
        Voice.findById(v1.id, function (err, voices) {
          spec.assert(voices[0].title).toBe('modified');
          spec.completed();
        });
      });
    });

  });

});

application.server.listen(CONFIG.port, function () {
  Tellurium.run();
});
