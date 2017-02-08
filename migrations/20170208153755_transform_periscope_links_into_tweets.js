var CROWD_BOT_SERVICE_URL = process.env.CROWD_BOT_SERVICE_URL || 'https://x-crowd-bot.herokuapp.com' || 'http://54.235.162.35:8081';

var reqFast = require('req-fast');

exports.up = function(knex, Promise) {
  return knex('Posts')
  .where('source_url', 'like', 'https://www.periscope.tv%')
  .orWhere('source_service', 'periscope')
  .then(function(results) {
    return Promise.all(results.map(function(post) {
      return knex('Voices')
        .where('id', post.voice_id)
        .then(function(voices) {
          return new Promise(function(resolve, reject) {
            console.log('Sharing', post.source_url);

            reqFast(CROWD_BOT_SERVICE_URL
              + '?url=' + encodeURIComponent(post.source_url)
              + '&subject=' + encodeURIComponent(voices[0].title) + ':', function(err, response) {
              if (err){
                return reject(err);
              }

              if (response.body && response.body.url) {
                console.log('Done', response.body.url);

                resolve(knex('Posts')
                  .where('id', post.id)
                  .update({
                    source_url: response.body.url,
                    source_type: 'link',
                    source_service: 'link',
                  }));
              }
            });
          });
        });
    }));
  });
};

exports.down = function(knex, Promise) {
  return Promise.resolve();
};
