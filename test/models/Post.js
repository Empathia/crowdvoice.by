#!/usr/bin/env node

require('neonode-core');

CONFIG.database.logQueries = false;

require('tellurium');

require(process.cwd() + '/node_modules/tellurium/reporters/pretty');

Tellurium.reporter = new Tellurium.Reporter.Pretty({
  colorsEnabled : true
});


Tellurium.suite('Post Model')(function(suite) {
  suite.setup(function() {
    var setup = this;
    async.series([function(done) {
      Entity.findById(1, function(err, result) {
        if (err) {
          return done(err);
        }

        suite.registry.jack = new Entity(result[0]);
        done();
      })
    }, function(done) {
      Voice.findById(1, function(err, result){
        if (err) {
          return done(err);
        }

        suite.registry.voice = new Voice(result[0]);
        done();
      });
    }], function(err) {
      if (err) {
        throw new Error(err);
      }

      setup.completed();
    })
  });

  suite.describe('Validations')(function(desc) {
    desc.specify('Pass Create a Post')(function(spec) {
      var jack = suite.registry.jack;
      var voice = suite.registry.voice;

      var post = new Post({
        ownerId       : jack.id,
        voiceId       : voice.id,
        approved      : false,
        image         : 'http://www.joomlaworks.net/images/demos/galleries/abstract/7.jpg',
        imageWidth    : 200,
        imageHeight   : 180,
        sourceService : 'link',
        sourceType    : 'link',
        sourceUrl     : 'http://google.com',
        title         : 'Google',
        description   : 'The search engine',
        publishedAt   : null,
      });

      post.isValid(function(valid) {
        spec.assert(valid).toBe(true);
        spec.completed();
      })

    })

    desc.specify('Fail Create a Post')(function(spec) {
      var jack = suite.registry.jack;
      var voice = suite.registry.voice;

      var post = new Post({
        ownerId       : jack.id,
        voiceId       : voice.id,
        approved      : false,
        image         : 'http://www.joomlaworks.net/images/demos/galleries/abstract/7.jpg',
        imageWidth    : 200,
        imageHeight   : 180,
        sourceService : 'link',
        sourceType    : 'link',
        sourceUrl     : null,
        title         : 'Google',
        description   : 'The search engine',
        publishedAt   : null,
      });

      post.isValid(function(valid) {
        spec.assert(valid).toBe(false);
        spec.completed();
      })

    })

    desc.specify('Pass update voice post count')(function(spec) {
      var jack = suite.registry.jack;
      var voice = suite.registry.voice;

      var post = new Post({
        ownerId       : jack.id,
        voiceId       : voice.id,
        approved      : false,
        image         : 'http://www.joomlaworks.net/images/demos/galleries/abstract/7.jpg',
        imageWidth    : 200,
        imageHeight   : 180,
        sourceService : 'link',
        sourceType    : 'link',
        sourceUrl     : 'http://google.com',
        title         : 'Google',
        description   : 'The search engine',
        publishedAt   : null,
      });

      post.save(function(err, result) {
        if (err) {
          throw new Error(err);
        }

        setTimeout(function() {
          Voice.findById(voice.id, function(err, voiceResult) {
            if (err) {
              throw new Error(err);
            }

            voice = new Voice(voiceResult[0])

            spec.assert(voice.postCount).toBe(1);
            spec.assert(voice.firstPostDate).toBeTruthy();
            spec.assert(voice.lastPostDate).toBeTruthy();
            spec.assert(post.publishedAt).toBeTruthy();
            spec.completed();
          })
        }, 1000);
      })

    })
  })
});

Tellurium.run();
