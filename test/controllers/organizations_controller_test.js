#!/usr/bin/env node

'use strict';

require('tellurium');
require('./../../lib/TelluriumConsoleReporter.js');

var application = require('neonode-core');
var clone = require('clone');
var async = require('async');
var http = require('http');
var request = require('superagent');

CONFIG.database.logQueries = false;

var urlBase = 'http://localhost:3000';
var o1 = {
  type: 'organization',
  name: 'org1',
  profileName: 'org1',
  isAnonymous: false
};
var o2 = {
  type: 'organization',
  name: 'org2',
  profileName: 'org2',
  isAnonymous: false
};
var e3 = {
  type: 'person',
  name: 'entity3',
  profileName: 'entity3',
  isAnonymous: false
};
var u3 = {
  username: 'person3',
  email: 'person3@gmail.com',
  password: 'mysecret'
};
var csrf;
var cookies;

/* Entity Model Tests
 *
 */
Tellurium.suite('Organizations Controller')(function () {

  this.describe('Actions')(function () {

    // Organizations#index
    this.specify('(application/json) should return the complete list of organizations')(function (spec) {
      var req = request
        .get(urlBase + '/organizations')
        .accept('application/json');

      req.end(function (err, res) {
        if (!err) {
          spec.assert(res.body.length).toBe(2);
        } else {
          spec.assert(false).toBe(true);
        }
        spec.completed();
      });
    });

    // Organizations#new
    this.specify('(text/html) should return a text/html')(function (spec) {
      var req = request
        .get(urlBase + '/organization/new')
        .accept('text/html');

      req.end(function (err, res) {
        if (err) {
          spec.assert(true).toBe(false);
        } else {
          spec.assert(res.headers['content-type'].match(/text\/html/)).toBeTruthy();
          spec.assert(res.status).toBe(200);
          spec.completed();
        }
      });
    });

    // Organizations#create
    this.specify('post (x-www-application-form) should create a new organization')(function (spec) {
      var req = request
        .post(urlBase + '/organization')
        .set('cookie', cookies)
        .type('form')
        .send({_csrf: csrf, name: 'org3', profileName: 'org3'});

      req.end(function (err, res) {
        if (err) {
          spec.assert(true).toBe(false);
        } else {
          Entity.find({name: 'org3', profile_name: 'org3'}, function (err, result) {
            spec.assert(result.length).toBe(1);
            spec.assert(result[0].name).toBe('org3');
            spec.completed();
          });
        }
      });
    });

    // Organizations#show 404
    this.specify('get (text/html) should return error if organization does not exist')(function (spec) {
      var req = request
        .get(urlBase + '/' + 'org7')
        .accept('application/json');
      req.end(function (err, res) {
        spec.assert(res.status).toBe(404);
        spec.completed();
      });
    });

    // Organizations#show 200
    this.specify('get (text/html) should return a text/html')(function (spec) {
      var req = request
        .get(urlBase + '/' + o1.profileName)
        .accept('text/html');

      req.end(function (err, res) {
        if (err) {
          spec.assert(true).toBe(false);
        } else {
          spec.assert(res.status).toBe(200);
          spec.completed();
        }
      });
    });

    // Organizations#edit 200
    this.specify('get (text/html) should return 200 if organization exists')(function (spec) {
      var req = request
        .get(urlBase + '/' + o1.profileName + '/edit')
        .accept('text/html');

      req.end(function (err, res) {
        if (err) {
          spec.assert(true).toBe(false);
        } else {
          spec.assert(res.status).toBe(200);
          spec.completed();
        }
      });
    });

    // Organizations#edit 404
    this.specify('get (text/html) should return error if organization does not exist')(function (spec) {
      var req = request
        .get(urlBase + '/' + 'org7' + '/edit')
        .accept('application/json');
      req.end(function (err, res) {
        spec.assert(res.status).toBe(404);
        spec.completed();
      });
    });

    // Organizations#put
    this.specify('put (x-www-application-form) should update an existing organization')(function (spec) {
      var req = request
        .put(urlBase + '/org2')
        .set('cookie', cookies)
        .type('form')
        .send({_csrf: csrf, name: 'testorg2'});

      req.end(function (err, res) {
        if (err) {
          spec.assert(true).toBe(false);
        } else {
          Entity.find({profile_name: 'org2'}, function (err, result) {
            spec.assert(result.length).toBe(1);
            spec.assert(result[0].name).toBe('testorg2');
            spec.completed();
          });
        }
      });
    });

    // Organizations#follow
    this.specify('post (x-www-application-form) should create an EntityFollower relation')(function (spec) {
      var req = request
        .post(urlBase + '/org1' + '/follow')
        .set('cookie', cookies)
        .type('form')
        .send({_csrf: csrf, followAs: e3.id});

      req.end(function (err, res) {
        if (err) {
          spec.assert(true).toBe(false);
        } else {
          EntityFollower.find({follower_id: e3.id, followed_id: o1.id}, function (err, result) {
            spec.assert(result.length).toBe(1);
            spec.completed();
          });
        }
      });
    });

  });

});

var setup = function (done) {
  async.series([
      function (done) { db('Entities').del().then(function () { done(); }); },
      function (done) { db('Users').del().then(function () { done(); }); },
      function (done) { (o1 = new Entity(o1)).save(done); },
      function (done) { (o2 = new Entity(o2)).save(done); },
      function (done) { (e3 = new Entity(e3)).save(done); },
      function (done) {
        u3 = new User(u3);
        u3.entityId = e3.id;
        u3.save(done);
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
          .send({_csrf: csrf, username: 'person3', password: 'mysecret'});

        req.end(function (err, res) {
          done();
        });
      }
  ], function () {
    console.log(arguments);
    done();
  });
};

application.server.listen(CONFIG.port, function () {
  setup(function () {
    Tellurium.run();
  });
});
