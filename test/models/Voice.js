#!/usr/bin/env node

require('neonode-core');

CONFIG.database.logQueries = false;

require('tellurium');

require('./../../lib/TelluriumConsoleReporter.js');

Tellurium.suite('Voice Model')(function() {
  this.describe('Validations')(function(desc) {

    this.beforeEach(function(spec){
      spec.registry.data = {
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
      }
    });

    this.specify('Fail Validation when title is not present')(function(spec) {
      var data = spec.registry.data;

      data.title = null;

      var voice = new Voice(data);

      voice.isValid(function(valid) {
        spec.assert(valid).toBe(false);
        spec.completed();
      })
    });

    this.specify('Pass Validation when title is present')(function(spec) {
      var data = spec.registry.data;

      data.title = 'title';

      var voice = new Voice(data);

      voice.isValid(function(valid) {
        spec.assert(valid).toBe(true);
        spec.completed();
      })
    });

    this.specify('Fail Validation when title is greater than 512 characters')(function(spec) {
      var data = spec.registry.data;
      var title = Argon.Storage.Local.prototype._generateUid(513);

      data.title = title;

      var voice = new Voice(data);

      voice.isValid(function(valid) {
        spec.assert(valid).toBe(false);
        spec.completed();
      });
    });

    this.specify('Pass Validation when title is less or eq than 512 characters')(function(spec) {
      var data = spec.registry.data;
      var title = Argon.Storage.Local.prototype._generateUid(512);

      data.title = title;

      var voice = new Voice(data);

      voice.isValid(function(valid) {
        spec.assert(valid).toBe(true);
        spec.completed();
      });
    });

    this.specify('Fail Validation when tweeterSearch is greater than 512 characters')(function(spec) {
      var data = spec.registry.data;
      var searchString = Argon.Storage.Local.prototype._generateUid(513);

      data.twitterSearch = searchString;

      var voice = new Voice(data);

      voice.isValid(function(valid) {
        spec.assert(valid).toBe(false);
        spec.completed();
      });
    });

    this.specify('Pass Validation when tweeterSearch is less or eq than 512 characters')(function(spec) {
      var data = spec.registry.data;
      var searchString = Argon.Storage.Local.prototype._generateUid(512);

      data.twitterSearch = searchString;

      var voice = new Voice(data);

      voice.isValid(function(valid) {
        spec.assert(valid).toBe(true);
        spec.completed();
      });
    });

    this.specify('Fail Validation when rssUrl is greater than 512 characters')(function(spec) {
      var data = spec.registry.data;
      var url = Argon.Storage.Local.prototype._generateUid(513);

      data.rssUrl = url;

      var voice = new Voice(data);

      voice.isValid(function(valid) {
        spec.assert(valid).toBe(false);
        spec.completed();
      });
    });

    this.specify('Pass Validation when rssUrl is less or eq than 512 characters')(function(spec) {
      var data = spec.registry.data;
      var url = Argon.Storage.Local.prototype._generateUid(512);

      data.rssUrl = url;

      var voice = new Voice(data);

      voice.isValid(function(valid) {
        spec.assert(valid).toBe(true);
        spec.completed();
      });
    });
  });

  this.describe('Records')(function(desc) {
    desc.beforeEach(function(spec) {
      spec.registry.data = {
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
      }

    });

    desc.specify('Pass Create a Voice Record')(function(spec) {
      var data = spec.registry.data;

      var voice = new Voice(data);

      db('Voices').del().exec(function(err, result) {
        voice.save(function(err, savedData) {
          spec.assert(voice.id).toBe(savedData[0])
          spec.completed();
        })
      });
    });

    desc.specify('Fail Create a Voice Record because of a validation error')(function(spec) {
      var data = spec.registry.data;

      data.ownerId = null;

      var voice = new Voice(data);

      db('Voices').del().exec(function(err, result) {
        voice.save(function(err, savedData) {
          spec.assert(voice.errors).toBeInstanceOf(Checkit.Error);
          spec.completed();
        });
      });
    });

    desc.specify('Pass Create a Post Record related to a Voice')(function(spec){
      var data = spec.registry.data;

      var voice = new Voice(data);

      db('Voices').del().exec(function(err, result) {
        voice.save(function(err, savedData) {
          var post = new Post({
            approved      : false,
            image         : null,
            imageWidth    : null,
            imageHeight   : null,
            sourceType    : Post.SOURCE_SERVICE_LINK,
            sourceUrl     : 'http://google.com',
            sourceService : Post.SOURCE_TYPE_LINK,
            title         : 'title',
            description   : 'description',
            voiceId       : voice.id
          });

          post.save(function(err, postResult) {
            spec.assert(err).toBe(null);
            spec.completed();
          })
        });
      });
    });
  });
});


Tellurium.run();
