#!/usr/bin/env node

'use strict';

require('tellurium');
require('./../../lib/TelluriumConsoleReporter.js');

var application = require('neonode-core');
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
    ]).then(function () {
      setup.completed();
    });
  });

  this.beforeEach(function (spec) {
    spec.registry.userData = {
      username: 'juan ' + uid(16),
      email: 'person_' + uid(16) + '@test.com',
      password: 'mysecret'
    };
    spec.registry.voiceData = {
      title: 'title_' + uid(16),
      status: 'active',
      type: 'text',
      ownerId: rid()
    };
    spec.registry.personData = {
      type: 'person',
      name: 'john_' + uid(16),
      profileName: 'john' + uid(16),
      isAnonymous: false
    };
  });

  this.describe('Actions')(function () {
    var v1;

    // Voices#index
    this.specify('GET /index should return a list of ')(function (spec) {
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
    this.specify('GET /voice/:id should return a voice')(function (spec) {
      async.series([
        function (done) {
          v1 = new Voice(spec.registry.voiceData);
          v1.save(done);
        },
      ], function (err) {
        var req = request.
          get(urlBase + '/voice/' + v1.id).
          accept('application/json').
          end(function (err, res) {
            spec.assert(res.body.title).toBe(v1.title);
            spec.completed();
          });
      });
    });

  });

});

application.server.listen(CONFIG.port, function () {
  Tellurium.run();
});
