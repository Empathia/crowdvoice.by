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
function rid() {
  return Math.floor(Math.random()*100000000).toString();
}

/* Entity Model Tests
 *
 */
Tellurium.suite('Organizations Controller')(function () {

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
    spec.registry.entityData = {
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

    // Organizations#index
    this.specify('(application/json) should return the complete list of organizations')(function (spec) {
      var req = request
        .get(urlBase + '/organizations')
        .accept('application/json');

      async.series([
        function (done) { (new Entity(spec.registry.organizationData)).save(done); }
      ], function (err) {
        req.end(function (err, res) {
          if (err) {
            spec.assert(false).toBe(true);
          } else {
            res.body.forEach(function (org) {
              spec.assert(org.type).toBe('organization');
            });
          }
          spec.completed();
        });
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
      var u1, csrf, cookies;
      var data = spec.registry.organizationData;
      var req = request
        .post(urlBase + '/organization')
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
              spec.assert(result[0].name).toBe(data.name);
              spec.assert(result[0].profileName).toBe(data.profileName);
              spec.completed();
            });
          }
        });
      });
    });

    // Organizations#show 404
    this.specify('get (text/html) should return error if organization does not exist')(function (spec) {
      var req = request
        .get(urlBase + '/organization' + rid())
        .accept('application/json');
      req.end(function (err, res) {
        spec.assert(res.status).toBe(404);
        spec.completed();
      });
    });

    // Organizations#show 200
    this.specify('get (text/html) should return a text/html')(function (spec) {
      var o1 = new Entity(spec.registry.organizationData);

      o1.save(function (err) {
        var req = request
          .get(urlBase + '/organization/' + o1.id)
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

    // Organizations#edit 200
    this.specify('get (text/html) should return 200 if organization exists')(function (spec) {
      var o1 = new Entity(spec.registry.organizationData);

      o1.save(function (err) {
        var req = request
          .get(urlBase + '/organization/' + o1.id + '/edit')
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

    // Organizations#edit 404
    this.specify('get (text/html) should return error if organization does not exist')(function (spec) {
      var req = request
        .get(urlBase + '/organization/' + rid() + '/edit')
        .accept('application/json');
      req.end(function (err, res) {
        spec.assert(res.status).toBe(404);
        spec.completed();
      });
    });

    // Organizations#put
    this.specify('put (x-www-application-form) should update an existing organization')(function (spec) {
      var u1, o1;
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
          o1 = new Entity(spec.registry.organizationData);
          o1.save(done);
        }
      ], function () {
        var req = request.put(urlBase + '/organization/' + o1.id);
        req.type('form');
        req.set('cookie', cookies);
        req.send({_csrf: csrf, name: 'testorg2'});

        req.end(function (err, res) {
          if (err) {
            spec.assert(true).toBe(false);
          } else {
            Entity.find({id: o1.id}, function (err, result) {
              spec.assert(result.length).toBe(1);
              spec.assert(result[0].name).toBe('testorg2');
              spec.completed();
            });
          }
        });
      });
    });

    // Organizations#follow
    this.specify('post (x-www-application-form) should create an EntityFollower relation')(function (spec) {
      var o1, e1, u1, csrf, cookies;
      async.series([
        function (done) {
          e1 = new Entity(spec.registry.entityData);
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
          o1 = new Entity(spec.registry.organizationData);
          o1.save(done);
        }
      ], function (err) {
        var req = request
          .post(urlBase + '/organization/' + o1.id + '/follow')
          .set('cookie', cookies)
          .type('form')
          .send({_csrf: csrf, followAs: e1.id});

        req.end(function (err, res) {
          if (err) {
            spec.assert(true).toBe(false);
          } else {
            EntityFollower.find({follower_id: e1.id, followed_id: o1.id}, function (err, result) {
              spec.assert(result.length).toBe(1);
              spec.completed();
            });
          }
        });
      });
    });

    // Organizations#inviteEntity
    this.specify('post (x-www-application-form) should create an InvitationRequest relation')(function (spec) {
      var o1, e1, u1, csrf, cookies;
      async.series([
        function (done) {
          e1 = new Entity(spec.registry.entityData);
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
        },
      ], function (err) {
        var req = request
          .post(urlBase + '/organization/' + o1.id + '/invite_entity')
          .set('cookie', cookies)
          .type('form')
          .send({_csrf: csrf, entityId: e1.id});

        req.end(function (err, res) {
          if (err) {
            spec.assert(true).toBe(false);
          } else {
            InvitationRequest.find({invited_entity_id: e1.id, invitator_entity_id: o1.id}, function (err, result) {
              spec.assert(result.length).toBe(1);
              spec.completed();
            });
          }
        });
      });
    });

    // Organizations#voices
    this.specify('get (application/json) should return all voices of an organization')(function (spec) {
      var o1, v1;

      async.series([
        function (done) {
          o1 = new Entity(spec.registry.organizationData);
          o1.save(done);
        },
        function (done) {
          v1 = new Voice(spec.registry.voiceData);
          v1.ownerId = o1.id;
          v1.save(done);
        },
      ], function (err) {
        var req = request
          .get(urlBase + '/organization/' + o1.id + '/voices');

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
