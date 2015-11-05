'use strict'

var path = require('path'),
  knexfile = require(path.join(__dirname, '../knexfile.js')),
  db = require('knex')(knexfile[process.env.NODE_ENV || 'development']),
  decay = require('decay'),
  wilsonScore = decay.wilsonScore(),
  async = require('async'),
  Promise = require('bluebird'),
  _ = require('underscore')

db.select('id').from('Voices')
  .where('status', '=', 'STATUS_PUBLISHED')
  .andWhere('type', '=', 'TYPE_PUBLIC')
  .map(function (voice) {
    return voice.id
  })
  .then(function (voiceIds) {

    return Promise.all(voiceIds.map(function (voiceId) {
      return db.select('id', 'created_at').from('Posts')
        .where('voice_id', '=', voiceId)
        .andWhere('approved', '=', false)
    }))

  })
  .then(function (postsPerVoice) {

    return new Promise(function (resolve, reject) {

      async.mapLimit(postsPerVoice, 3, function (posts, donePosts) {
        async.mapLimit(posts, 3, function (post, donePost) {
          db('Votes')
            .where('post_id', '=', post.id)
            .then(function (votes) {
              var ups = votes.filter(function (vote) { return (vote.value === 1) }),
                downs = votes.filter(function (vote) { return (vote.value === -1) })

              return donePost(null, {
                postId: post.id,
                score: wilsonScore(ups.length, downs.length),
              })
            })
            .catch(donePost)
        }, function (err, result) {
          if (err) { return donePosts(err) }

          return donePosts(null, result)
        })
      }, function (err, result) {
        if (err) { return reject(err) }

        return resolve(result)
      })

    })

  })
  .then(console.log.bind(console))
  .catch(console.error.bind(console))
