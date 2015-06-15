var application = require('neonode-core');

// Load aws-sdk and S3
var AWS = require('aws-sdk');
global.amazonS3 = new AWS.S3(CONFIG.s3);

// Load image processors
global.gm = require('gm').subClass({imageMagick: true});
global.sharp = require('sharp');

var casual = require('casual');

CONFIG.database.logQueries = true;

Voice.all(function(err, voices) {

  async.each(voices, function(voice, done) {
    var year = 2015;
    var month = 5;

    var count = 0;
    var youtubes = [
      'https://www.youtube.com/watch?v=tHX55Bxnc-A',
      'https://www.youtube.com/watch?v=kNSv7DF5QrY',
      'https://www.youtube.com/watch?v=EH5E2dJx91E',
      'https://www.youtube.com/watch?v=tHX55Bxnc-A',
      'https://www.youtube.com/watch?v=f4RGU2jXQiE'
    ]

    async.times(7200, function(id, next) {
      var post =  new Post();


      var type = casual.random_element(['image', 'video', 'link']);

      post.title = casual.title;
      post.description = casual.description;

      post.sourceType = type;

      if (type === 'video') {
        post.sourceService = 'youtube';
        post.sourceUrl = casual.random_element(youtubes);
      } else {
        post.sourceService = 'link';
        post.sourceUrl = casual.url;
      }

      // post.image = url;
      post.approved = casual.random_element([true, false]);

      var date =  new Date(year + '-' + month + '-' + casual.integer(from = 1, to = 28));
      post.createdAt = date;
      post.updatedAt = date;
      post.publishedAt = date;

      // post.imageWidth = width;
      // post.imageHeight = height;

      post.voiceId = voice.id;
      post.ownerId = 1;
      count++;

      if (count === 200) {
        month--;
        count = 0;
      }

      if (month === 0) {
        month = 12;
        year--;
      }

      console.log(date)

      post.save(function(err, result) {
        var width = casual.integer(from = 200, to = 350);
        var height = casual.integer(from = 100, to = 400);

        var url = "http://lorempixel.com/" + width + "/" + height + "/";

        post.uploadImage('image', url, function () {
          next(null, post)
        });

      })
    }, function(err, posts) {
      if (err) {
        logger.error(err)
        return done(err)
      }

      done()
    });

  }, function(err) {
    if (err) {
      logger.error(err)
    };

    logger.log('Finisihed')
  })

});
