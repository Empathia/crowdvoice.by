#!/usr/bin/env node
'use strict';

require('neonode-core');
require('tellurium');
require('./../../lib/TelluriumConsoleReporter.js');
var clone = require('clone');
var async = require('async');

CONFIG.database.logQueries = false;

/* Entity Model Tests
 *
 */
Tellurium.suite('Entity Model')(function () {
  this.beforeEach(function (spec) {
    spec.registry.data = {
      type: 'person',
      name: 'John',
      lastname: 'Doe',
      isAnonymous: false
    };
  });

  this.describe('Validations')(function () {
    this.specify('type should validate that type is present')(function (spec) {
      var data = spec.registry.data, entity;

      data.type = '';
      entity = new Entity(data);

      entity.isValid(function (valid) {
        spec.assert(valid).toBe(false);
        spec.completed();
      });
    });

    this.specify('should validate that type is present')(function (spec) {
      var data = spec.registry.data, entity;

      data.type = '';
      entity = new Entity(data);

      entity.isValid(function (valid) {
        spec.assert(valid).toBe(false);
        spec.completed();
      });
    });

    this.specify('type cannot be different than person|organization')(function (spec) {
      var data = spec.registry.data, entity;

      data.type = 'hola';
      entity = new Entity(data);

      entity.isValid(function (valid) {
        spec.assert(valid).toBe(false);
        spec.completed();
      });
    });

    this.specify('should pass if type is person')(function (spec) {
      var data = spec.registry.data, entity;

      data.type = 'person';
      entity = new Entity(data);
      entity.isValid(function (valid) {
        spec.assert(valid).toBe(true);
        spec.completed();
      });
    });

    this.specify('type should pass if type is organization')(function (spec) {
      var data = spec.registry.data, entity;

      data.type = 'organization';
      entity = new Entity(data);

      entity.isValid(function (valid) {
        spec.assert(valid).toBe(true);
        spec.completed();
      });
    });

    this.specify('name should be present')(function (spec) {
      var data = spec.registry.data, entity;

      data.name = '';
      entity = new Entity(data);
      entity.isValid(function (err) {
        spec.assert(err !== null).toBe(true);
        spec.completed();
      });
    });

    this.specify('name should have a length <= 512')(function (spec) {
      var data = spec.registry.data, entity;

      data.name = '';
      for (var i = 0; i < 513; i+=1) {
        data.name += 'a';
      }
      entity = new Entity(data);
      entity.isValid(function (valid) {
        spec.assert(valid === false).toBe(true);
        spec.completed();
      });
    });

    this.specify('lastname should have a length <= 512')(function (spec) {
      var data = spec.registry.data, entity;

      data.lastname = '';
      for (var i = 0; i < 513; i+=1) {
        data.lastname += 'a';
      }
      entity = new Entity(data);
      entity.isValid(function (valid) {
        spec.assert(valid).toBe(false);
        spec.completed();
      });
    });

    this.specify('should not save if its not boolean')(function (spec) {
      var data = spec.registry.data, entity;

      data.isAnonymous = 234;
      entity = new Entity(data);
      entity.isValid(function (valid) {
        spec.assert(valid === false).toBe(true);
        spec.completed();
      });
    });

    this.specify('should save if it is boolean')(function (spec) {
      var data = spec.registry.data, entity;

      data.isAnonymous = true;
      entity = new Entity(data);
      entity.isValid(function (valid) {
        spec.assert(valid === true).toBe(true);
        spec.completed();
      });
    });

  });

});

Tellurium.suite('Entity Model - Relations')(function () {

  this.beforeEach(function (spec) {

    spec.registry.data = {
      type: 'person',
      name: 'John',
      lastname: 'Doe',
      isAnonymous: false
    };

    spec.registry.setup = function (done) {
      async.series([
        function (done) { db('Entities').del().then(done); },
        function (done) { db('EntityFollower').del().then(done); },
        function (done) { db('Voices').del().then(done); },
      ], function () {
        done();
      });
    };
  });

  this.describe('EntityFollower')(function (spec) {

    this.specify('followEntity should create a EntityFollower relation')(function (spec) {
      var e1, e2;

      spec.registry.setup(function () {
        async.series([
          function (done) {
            e1 = new Entity(spec.registry.data);
            e1.save(done);
          },
          function (done) {
            var data = spec.registry.data;
            data.name = 'org1';
            e2 = new Entity(data);
            e2.save(done);
          },
          function (done) {
            e1.followEntity(e2, done);
          },
          function (done) {
            db('EntityFollower').where('follower_id', '=', e1.id).andWhere('followed_id', '=', e2.id).then(function (result) {
              spec.assert(result[0].follower_id).toBe(e1.id);
              spec.assert(result[0].followed_id).toBe(e2.id);
              spec.completed();
            });
          }
        ], function () {
          spec.completed();
        });

      });
    });

  });

  this.describe('VoiceFollowers')(function (done) {

    var data = {
      title: 'test1',
      status: 'nothing',
      type: 'nothing'
    };

    this.specify('followVoice should create a VoiceFollowers relation')(function (spec) {
      var e1, v1;

      spec.registry.setup(function () {
        async.series([
          function (done) {
            e1 = new Entity(spec.registry.data);
            e1.save(done);
          },
          function (done) {
            db('Voices').insert(data, 'id').then(function (ids) {
              v1 = data;
              v1.id = ids[0];
              done();
            });
          },
          function (done) {
            e1.followVoice(v1, done);
          },
          function (done) {
            db('VoiceFollowers').where('entity_id', '=', e1.id).andWhere('voice_id', '=', v1.id).then(function (result) {
              spec.assert(result[0].entity_id === e1.id).toBe(true);
              spec.assert(result[0].voice_id === v1.id).toBe(true);
              done();
            });
          }
        ], function () {
          spec.completed();
        });

      });
    });
  });

  this.describe('inviteEntity')(function (done) {

    var entityData = {
      type: 'person',
      name: 'John',
      lastname: 'Doe',
      isAnonymous: false
    };

    this.specify('inviteEntity should create an InvitationRequest relation')(function (spec) {
      var e1, e2;

      spec.registry.setup(function () {
        async.series([
          function (done) {
            e1 = new Entity(spec.registry.data);
            e1.save(done);
          },
          function (done) {
            var data = clone(entityData);
            data.name = 'org1';
            e2 = new Entity(data);
            e2.save(done);
          },
          function (done) {
            e2.inviteEntity(e1, done);
          },
          function (done) {
            db('InvitationRequest').where('invited_entity_id', '=', e1.id).andWhere('invitator_entity_id', '=', v1.id).then(function (result) {
              spec.assert(result[0].invited_entity_id === e1.id).toBe(true);
              spec.assert(result[0].invitator_entity_id === e2.id).toBe(true);
              done();
            });
          }
        ], function () {
          spec.completed();
        });

      });
    });
  });

});

Tellurium.run();
