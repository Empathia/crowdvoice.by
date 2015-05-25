#!/usr/bin/env node

require('neonode-core');

CONFIG.database.logQueries = false;

require('tellurium');

require(process.cwd() + '/node_modules/tellurium/reporters/pretty');

Tellurium.reporter = new Tellurium.Reporter.Pretty({
  colorsEnabled : true
})

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

      spec.registry.postData = {
        approved      : false,
        image         : null,
        imageWidth    : null,
        imageHeight   : null,
        sourceType    : Post.SOURCE_SERVICE_LINK,
        sourceUrl     : 'http://google.com',
        sourceService : Post.SOURCE_TYPE_LINK,
        title         : 'title',
        description   : 'description',
        voiceId       : null
      }

      db('Voices').del().exec(function(err, data) {
        return;
      });

      db('Posts').del().exec(function(err, data) {
        return;
      })

    });

    desc.specify('Pass Create a Voice Record')(function(spec) {
      var data = spec.registry.data;

      var voice = new Voice(data);

      voice.save(function(err, savedData) {
        spec.assert(voice.id).toBe(savedData[0])
        spec.completed();
      });
    });

    desc.specify('Fail Create a Voice Record because of a validation error')(function(spec) {
      var data = spec.registry.data;

      data.ownerId = null;

      var voice = new Voice(data);

      voice.save(function(err, savedData) {
        spec.assert(voice.errors).toBeInstanceOf(Checkit.Error);
        spec.completed();
      });
    });

    desc.specify('Pass Update a Voice Record')(function(spec) {
      var data = spec.registry.data;

      var voice = new Voice(data);

      voice.save(function(err, savedData) {
        spec.assert(voice.id).toBe(savedData[0]);

        voice.title = 'New Voice title'

        voice.save(function(destErr, destResult) {
          spec.assert(voice.title).toBe('New Voice title');
          spec.completed();
        });
      });
    });

    desc.specify('Fail Update a voice Record because a validation error')(function(spec) {
      var data = spec.registry.data;

      var voice = new Voice(data);

      voice.save(function(err, savedData) {
        spec.assert(voice.id).toBe(savedData[0]);

        voice.title = 'New Voice title';
        voice.ownerId = null;

        voice.save(function(destErr, destResult) {
          spec.assert(voice.errors).toBeInstanceOf(Checkit.Error);
          spec.completed();
        });
      });
    });

    desc.specify('Pass Delete a Voice Record')(function(spec) {
      var data = spec.registry.data;

      var voice = new Voice(data);

      voice.save(function(err, savedData) {
        spec.assert(voice.id).toBe(savedData[0]);

        voice.destroy(function(destErr, destResult) {
          spec.assert(voice.id).toBe(null);
          spec.completed();
        });
      })
    });

    desc.specify('Pass Create and Delete a Post Record related to a Voice')(function(spec){
      var data      = spec.registry.data;
      var postData  = spec.registry.postData;

      var voice     = new Voice(data);

      voice.save(function(voiceErr, voiceResult) {
        postData.voiceId = voice.id;
        var post = new Post(postData);

        post.save(function(postErr, postResult) {
          setTimeout(function(){
            Voice.findById(voice.id, function(voiceErr, voiceResult) {
              spec.assert(voiceErr).toBe(null);
              spec.assert(postErr).toBe(null);
              spec.assert(post.publishedAt.getTime()).toBe(voiceResult[0].firstPostDate.getTime());
              spec.assert(post.publishedAt.getTime()).toBe(voiceResult[0].lastPostDate.getTime());

              setTimeout(function(){
                post.destroy(function(destErr, destResult) {
                  setTimeout(function() {
                    Voice.find(voice.id, function(secondRunVoiceErr, secondRunVoiceResult) {
                      spec.assert(secondRunVoiceResult[0].firstPostDate).toBe(null);
                      spec.assert(secondRunVoiceResult[0].lastPostDate).toBe(null);
                      spec.assert(post.id).toBe(null);
                      spec.completed();
                    });
                  }, 1000);
                });
              }, 1000);
            });
          }, 1000);
        });
      });

    });

    desc.specify('Fail Create a Post Record related to a Voice')(function(spec) {
      var data      = spec.registry.data;
      var postData  = spec.registry.postData;

      var voice     = new Voice(data);

      voice.save(function(voiceErr, voiceResult) {
        var post = new Post(postData);

        post.save(function(postErr, postResult) {
          spec.assert(voiceErr).toBe(null);
          spec.assert(postResult).toBe(undefined);
          spec.completed();
        });
      })

    });


  });
});


Tellurium.run();
