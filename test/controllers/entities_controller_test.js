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

/* Entity Model Tests
 *
 */
Tellurium.suite('Entities Controller')(function () {

  this.setup(function () {
    var setup = this;
    Promise.all([
      db('Entities').del(),
    ]).then(function () {
      setup.completed();
    });
  });

  this.beforeEach(function (spec) {
    spec.registry.organizationData = {
      type: 'organization',
      name: 'organization_' + uid(16),
      profileName: 'organization_' + uid(16),
      isAnonymous: false
    };
    spec.registry.personData = {
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
    };
  });

  this.describe('Actions')(function () {

    // Entities#recommended
    this.specify('recommended (application/json) should return recommended voices')(function (spec) {
      var v1, v2, v3, v4, e1, e2;

      async.series([
        function (done) {
          e1 = new Entity(spec.registry.personData);
          e1.save(done);
        },
        function (done) {
          e2 = new Entity(spec.registry.organizationData);
          e2.save(done);
        },
        function (done) {
          e1.followEntity(e2, done);
        },
        function (done) {
          v1 = new Voice(spec.registry.voiceData);
          v1.ownerId = e2.id;
          v1.save(done);
        },
        function (done) {
          v2 = new Voice(spec.registry.voiceData);
          v2.ownerId = e2.id;
          v2.save(done);
        },
        function (done) {
          e1.followVoice(v2, done);
        },
        function (done) {
          v3 = new Voice(spec.registry.voiceData);
          v3.ownerId = e1.id;
          v3.save(done);
        },
      ], function (err) {
        var req = request.get(urlBase + '/person/' + e1.id + '/recommended');
        req.accept('application/json');
        req.end(function (err, res) {
          var voices = res.body;
          spec.assert(voices.length).toBe(1);
          if (voices.length > 0) {
            spec.assert(voices[0].title).toBe(v1.title);
          }
          spec.completed();
        });
      });
    });
  });

});

application.server.listen(CONFIG.port, function () {
  Tellurium.run();
});
