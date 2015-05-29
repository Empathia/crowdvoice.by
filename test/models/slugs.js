#!/usr/bin/env node
'use strict';

require('neonode-core');
require('tellurium');
require(process.cwd() + '/node_modules/tellurium/reporters/pretty');

Tellurium.reporter = new Tellurium.Reporter.Pretty({
  colorsEnabled : true
})

var crypto = require('crypto');

function uid (number) {
  return crypto.randomBytes(number).toString('hex');
}

CONFIG.database.logQueries = false;

/* Slug Model Tests
 *
 */
Tellurium.suite('Slug Model')(function () {
  this.setup(function () {
    var setup = this;

    Promise.all([
      db('Voices').del(),
      db('Slugs').del()
    ]).then(function () {
      setup.completed();
    });
  });

  this.beforeEach(function (spec) {
    // spec.registry.entityData = {
    //   type: 'person',
    //   name: 'John' + uid(16),
    //   profileName: 'john' + uid(16),
    //   lastname: 'Doe',
    //   isAnonymous: false
    // };
    // spec.registry.organizationData = {
    //   type: 'organization',
    //   name: 'Org1' + uid(16),
    //   profileName: 'org1' + uid(16),
    //   isAnonymous: false
    // };
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
  });

  this.describe('Adding a slug to a voice')(function () {

    this.specify('Should create a slug')(function (spec) {
      var v1;
      async.series([
        function (done) {
          v1 = new Voice(spec.registry.voiceData);
          v1.save(done);
        },
        function (done) {
          v1.addSlug(done);
        }
      ], function (err) {
        db('Slugs').where({voice_id: v1.id}).exec(function (err, slugs) {
          spec.assert(slugs.length).toBe(1);
          spec.completed();
        });
      });
    });

    this.specify('Should create at least 3 slugs')(function (spec) {
      var v1;
      async.series([
        function (done) {
          v1 = new Voice(spec.registry.voiceData);
          v1.save(done);
        },
        function (done) { v1.addSlug(done); },
        function (done) { v1.addSlug(done); },
        function (done) { v1.addSlug(done); }
      ], function (err) {
        db('Slugs').where({voice_id: v1.id}).exec(function (err, slugs) {
          spec.assert(slugs.length).toBe(3);
          spec.completed();
        });
      });
    });

    this.specify('Should delete exceeding slugs')(function (spec) {
      var v1;
      async.series([
        function (done) {
          v1 = new Voice(spec.registry.voiceData);
          v1.save(done);
        },
        function (done) { v1.addSlug(done); },
        function (done) { v1.addSlug(done); },
        function (done) { v1.addSlug(done); },
        function (done) { v1.addSlug(done); }
      ], function (err) {
        db('Slugs').where({voice_id: v1.id}).exec(function (err, slugs) {
          spec.assert(slugs.length).toBe(3);
          spec.completed();
        });
      });
    });

  });
});

Tellurium.run();
