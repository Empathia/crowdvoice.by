#!/usr/bin/env node

'use strict';

require('tellurium');
require('./../../lib/TelluriumConsoleReporter.js');

var basePath = __dirname + '/../../';
var application = require('neonode-core');

require(basePath + '/lib/routes.js');

global.ACL = require(basePath + 'lib/ACL/ACL.js');
require(basePath + 'lib/ACL/visitor.js');
require(basePath + 'lib/ACL/anonymous.js');
require(basePath + 'lib/ACL/person.js');
require(basePath + 'lib/ACL/admin.js');

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

/* Post Model Tests
 *
 */
Tellurium.suite('Post Controller')(function () {
  this.setup(function () {
    var setup = this;
    Promise.all([
      db('Posts').del(),
      db('SavedPosts').del(),
      db('Entities').del(),
      db('Voices').del(),
    ]).then(function () {
      setup.completed();
    });
  });

  this.beforeEach(function (spec) {
    spec.registry.userData = {
      username: 'juan' + uid(16),
      email: 'person_' + uid(16) + '@test.com',
      password: 'mysecret'
    };
    spec.registry.personData = {
      type: 'person',
      name: 'john_' + uid(16),
      profileName: 'john' + uid(16),
      isAnonymous: false
    };
    spec.registry.personData2 = {
      type: 'person',
      name: 'john_' + uid(16),
      profileName: 'john' + uid(16),
      isAnonymous: false
    };
    spec.registry.voiceData = {
      title : 'Voice Title',
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
      firstPostDate : null,
      lastPostDate : null,
      postCount : 0
    };
    spec.registry.postData = {
      sourceType: 'image',
      sourceUrl: 'url',
      sourceService: 'imgur',
    };
  });

  this.describe('SavedPosts')(function () {
    this.specify('Saving a post should create a SavedPosts relation')(function (spec) {
      var u1, e1, e2, v1, p1;
      var cookies, csrf;

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
          e2 = new Entity(spec.registry.personData2);
          e2.save(done);
        },
        function (done) {
          v1 = new Voice(spec.registry.voiceData);
          v1.ownerId = e2.id;
          v1.save(done);
        },
        function (done) {
          p1 = new Post(spec.registry.postData);
          p1.ownerId = e2.id;
          p1.voiceId = v1.id;
          p1.save(done);
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
      ], function (err) {
        var req = request
          .post(urlBase + '/post/' + p1.id + '/save_post')
          .set('cookie', cookies)
          .send({
            _csrf: csrf,
            postId: p1.id
          });

        req.end(function (err, res) {
          SavedPost.find({post_id: p1.id, entity_id: e1.id}, function (err, result) {
            spec.assert(result.length).toBe(1);
            spec.completed();
          });
        });
      });
    });
  });
});

application.server.listen(CONFIG.port, function () {
  Tellurium.run();
});
