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
Tellurium.suite('Persons Controller')(function () {

  this.setup(function () {
    var setup = this;
    Promise.all([
      db('Users').del(),
      db('Voices').del(),
      db('Entities').del(),
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
      title: 'title',
      status: 'active',
      type: 'text'
    };
  });

  this.describe('Actions')(function () {

    // Persons#index
    this.specify('(application/json) should return the complete list of persons')(function (spec) {
      async.series([
        function (done) { (new Entity(spec.registry.personData)).save(done); }
      ], function (err) {
        var req = request
          .get(urlBase + '/persons')
          .accept('application/json');
        req.end(function (err, res) {
          if (err) {
            spec.assert(false).toBe(true);
          } else {
            res.body.forEach(function (person) {
              spec.assert(person.type).toBe('person');
            });
            spec.assert(res.body.length > 0).toBeTruthy();
          }
          spec.completed();
        });
      });
    });

    // Persons#new
    this.specify('(text/html) should return a text/html')(function (spec) {
      var req = request
        .get(urlBase + '/person/new')
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

    // Persons#create
    this.specify('post /person (x-www-application-form) should create a new person')(function (spec) {
      var u1, csrf, cookies;
      var data = spec.registry.personData;
      var req = request
        .post(urlBase + '/person')
        .type('form');

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
      ], function (err) {
        if (err) { console.log(err); }

        req.set('cookie', cookies);
        req.send({_csrf: csrf, name: data.name, profileName: data.profileName});

        req.end(function (err, res) {
          if (err) {
            spec.assert(true).toBe(false);
          } else {
            Entity.find({name: data.name, profile_name: data.profileName}, function (err, result) {
              spec.assert(result.length).toBe(1);
              if (result.length > 0) {
                spec.assert(result[0].name).toBe(data.name);
                spec.assert(result[0].profileName).toBe(data.profileName);
              }
              spec.completed();
            });
          }
        });
      });
    });

    // Persons#show 404
    this.specify('get (text/html) should return error if person does not exist')(function (spec) {
      var req = request
        .get(urlBase + '/person/' + rid())
        .accept('application/json');
      req.end(function (err, res) {
        spec.assert(res.status).toBe(404);
        spec.completed();
      });
    });

    // Persons#show 200
    this.specify('get (text/html) should return a text/html')(function (spec) {
      var p1 = new Entity(spec.registry.personData);

      p1.save(function (err) {
        var req = request
          .get(urlBase + '/' + p1.profileName)
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
    });

    // Persons#edit 200
    this.specify('get (text/html) should return 200 if the person exists')(function (spec) {
      var p1 = new Entity(spec.registry.personData);

      p1.save(function (err) {
        var req = request
          .get(urlBase + '/person/' + p1.id + '/edit')
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
    });

    // Persons#edit 404
    this.specify('get (text/html) should return error if person does not exist')(function (spec) {
      var req = request
        .get(urlBase + '/person/' + rid() + '/edit')
        .accept('application/json');
      req.end(function (err, res) {
        spec.assert(res.status).toBe(404);
        spec.completed();
      });
    });

    // Persons#put
    this.specify('put (x-www-application-form) should update an existing person')(function (spec) {
      var u1, p1;
      var cookies, csrf;

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
          p1 = new Entity(spec.registry.personData);
          p1.save(done);
        }
      ], function () {
        var req = request.put(urlBase + '/person/' + p1.id);
        req.type('form');
        req.set('cookie', cookies);
        req.send({_csrf: csrf, name: 'testperson'});

        req.end(function (err, res) {
          if (err) {
            spec.assert(true).toBe(false);
          } else {
            Entity.find({id: p1.id}, function (err, result) {
              spec.assert(result.length).toBe(1);
              spec.assert(result[0].name).toBe('testperson');
              spec.completed();
            });
          }
        });
      });
    });

    // Persons#follow
    this.specify('post (x-www-application-form) should create an EntityFollower relation')(function (spec) {
      var e1, o1, u1, csrf, cookies;

      async.series([
        function (done) {
          e1 = new Entity(spec.registry.personData);
          e1.save(done);
        },
        function (done) {
          o1 = new Entity(spec.registry.organizationData);
          o1.save(done);
        },
        function (done) {
          u1 = new User(spec.registry.userData);
          u1.entityId = o1.id;
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
        }
      ], function (err) {
        var req = request
          .post(urlBase + '/person/' + e1.id + '/follow')
          .set('cookie', cookies)
          .type('form')
          .send({_csrf: csrf, followAs: o1.id});

        req.end(function (err, res) {
          if (err) {
            spec.assert(true).toBe(false);
          } else {
            EntityFollower.find({follower_id: o1.id, followed_id: e1.id}, function (err, result) {
              spec.assert(result.length).toBe(1);
              spec.completed();
            });
          }
        });
      });
    });

    // Person#voices
    this.specify('get (application/json) should return all voices of a person')(function (spec) {
      var p1, v1;

      async.series([
        function (done) {
          p1 = new Entity(spec.registry.personData);
          p1.save(done);
        },
        function (done) {
          v1 = new Voice(spec.registry.voiceData);
          v1.ownerId = p1.id;
          v1.save(done);
        },
      ], function (err) {
        var req = request
          .get(urlBase + '/person/' + p1.id + '/voices');

        req.end(function (err, res) {
          if (err) {
            spec.assert(true).toBe(false);
          } else {
            spec.assert(res.body.length).toBe(1);
            spec.completed();
          }
        });
      });
    });

  });

});

application.server.listen(CONFIG.port, function () {
  Tellurium.run();
});
