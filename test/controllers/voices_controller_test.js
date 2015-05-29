#!/usr/bin/env node
'use strict';

require('tellurium');
require(process.cwd() + '/node_modules/tellurium/reporters/pretty');

Tellurium.reporter = new Tellurium.Reporter.Pretty({
  colorsEnabled : true
});

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

    // Voices#new
    this.specify('GET /voice/new should return 200')(function (spec) {
      var req = request.
        get(urlBase + '/voice/new');

      req.end(function (err, res) {
        spec.assert(res.status).toBe(200);
        spec.completed();
      });
    });

    // Voices#edit
    // this.specify('GET /voice/:id/edit should return 200 if record exists')(function (spec) {
    //   async.series([
    //     function (done) {
    //       var v1 = new Voice(spec.registry.voiceData);
    //       v1.save(done);
    //     }
    //   ], function (err) {
    //     var req = request.
    //     get(urlBase + '/voice/' + v1.id + '/edit');

    //     req.end(function (err, res) {
    //       spec.assert(res.status).toBe(200);
    //       spec.completed();
    //     });
    //   });
    // });

    // Voices#create
    this.specify('POST /voice should create a voice')(function (spec) {
      var u1, cookies, csrf;

      async.series([
        function (done) {
          u1 = new User(spec.registry.userData);
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
          var data = spec.registry.voiceData;
          var req = request.post(urlBase + '/voice');

          data._csrf = csrf;
          req.set('cookie', cookies);
          req.send(data);
          req.end(function (err, res) {
            if (err) { done(err); }
            done();
          });
        }
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
          v1 = new Voice(spec.registry.voiceData);
          v1.save(done);
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
          var req = request.put(urlBase + '/voice/' + v1.id);
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
