#!/usr/bin/env node

var application = require('neonode-core');

require(path.join(process.cwd(), 'lib', 'krypton', 'load-models.js'));

global.useGM = false;

// Load aws-sdk and S3
var AWS = require('aws-sdk');
global.amazonS3 = new AWS.S3(CONFIG.s3);

// Load image processors
global.sharp = require('sharp');
global.gm = require('gm');
gm = gm.subClass({ imageMagick: true });

var cpuLength = 1;

var casual = require('casual');

CONFIG.database.logQueries = true;

var voiceId = parseInt(process.argv[2], 10),
  postsCount = parseInt(process.argv[3], 10)

async.series([
  function (nextSeries) {
    K.Voice.query()
      .where('id', '=', voiceId)
      .then(function (voice) {
        return new Promise(function (res, rej) {
          async.times(postsCount, function (n, doneTimes) {
            var post = new K.Post({
              title: 'Generator Post #' + n,
              description: 'Just a random description for this post, you know...',
              ownerId: voice[0].ownerId,
              voiceId: voice[0].id,
              approved: true,
              imageBaseUrl: '',
              imageMeta: {},
              sourceService: 'raw',
              sourceType: 'text',
              sourceUrl: '',
              publishedAt: new Date(),
              sourceDomain: null,
              faviconPath: null,
            })

            post.save()
              .then(function (model) {
                return doneTimes(null, model)
              })
              .catch(doneTimes)
          }, function (err) {
            if (err) { return rej(err) }

            return res()
          })
        })
      })
      .then(nextSeries)
      .catch(nextSeries)
  },
], function (err) {
  if (err) {
    logger.error(err)
    return process.exit(1)
  }

  console.log('FINISHED SUCCESSFULLY!')
  process.exit(0)
})
