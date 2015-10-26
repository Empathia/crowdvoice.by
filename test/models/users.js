#!/usr/bin/env node
'use strict';

require('neonode-core');
require('tellurium');
require('./../../lib/TelluriumConsoleReporter.js');

var crypto = require('crypto');

function uid (number) {
  return crypto.randomBytes(number).toString('hex');
}

CONFIG.database.logQueries = false;

/* Entity Model Tests
 *
 */
Tellurium.suite('User Model')(function () {
  this.setup(function () {
    var setup = this;

    Promise.all([
      db('Users').del(),
      db('Entities').del(),
    ]).then(function () {
      setup.completed();
    });
  });

  this.beforeEach(function (spec) {
    spec.registry.userData = function () {
      return {
        username: 'juan_' + uid(16),
        email: 'person_' + uid(16) + '@test.com',
        password: 'mysecret'
      };
    };
    spec.registry.entityData = {
      type: 'person',
      name: 'John' + uid(16),
      profileName: 'john' + uid(16),
      isAnonymous: false
    };
  });

  this.describe('Validations')(function () {
    this.specify('check data is valid')(function (spec) {
      var u1 = new User(spec.registry.userData());
      u1.isValid(function (valid) {
        spec.assert(valid).toBe(true);
        spec.completed();
      });
    });

    this.specify('username is required')(function (spec) {
      var u1 = new User(spec.registry.userData());
      u1.username = '';
      u1.isValid(function (valid) {
        spec.assert(valid).toBe(false);
        spec.completed();
      });
    });

    this.specify('username must be unique')(function (spec) {
      var u1 = new User(spec.registry.userData());
      u1.save(function (err) {
        var u2 = new User(spec.registry.userData());
        u2.username = u1.username;
        u2.isValid(function (valid) {
          spec.assert(valid).toBe(false);
          spec.completed();
        });
      });
    });

    this.specify('email is required')(function (spec) {
      var u1 = new User(spec.registry.userData());
      u1.email = '';
      u1.isValid(function (valid) {
        spec.assert(valid).toBe(false);
        spec.completed();
      });
    });

    this.specify('email must be unique')(function (spec) {
      var u1 = new User(spec.registry.userData());
      u1.save(function (err) {
        var u2 = new User(spec.registry.userData());
        u2.email = u1.email;
        u2.isValid(function (valid) {
          spec.assert(valid).toBe(false);
          spec.completed();
        });
      });
    });

    this.specify('password must be at least 8 characters')(function (spec) {
      var u1 = new User(spec.registry.userData());
      u1.password = 'hola';
      u1.isValid(function (valid) {
        spec.assert(valid).toBe(false);
        spec.completed();
      });
    });
  });

  // this.describe('Owned Voices')(function () {
  //   var e1, v1;

  //   this.specify('Should return owned voices')(function (spec) {
  //     async.series([
  //       function (done) {
  //         e1 = new Entity(spec.registry.entityData);
  //         e1.save(done);
  //       },
  //       function (done) {
  //         v1 = new Voice(spec.registry.voiceData);
  //         v1.title = 'MyVoice';
  //         v1.ownerId = e1.id;
  //         v1.save(done);
  //       }
  //     ], function (err) {
  //       if (err) { console.log(err); }

  //       e1.voices(function (err, voices) {
  //         spec.assert(voices[0].ownerId).toBe(e1.id);
  //         spec.assert(voices[0].title).toBe('MyVoice');
  //         spec.completed();
  //       });
  //     });
  //   });
  // });

});

Tellurium.run();
