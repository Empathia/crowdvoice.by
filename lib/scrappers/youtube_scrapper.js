'use strict';

var Scrapper = require(__dirname + '/scrapper.js');

var YouTubeScrapper = Module('YouTubeScrapper').includes(Scrapper)({
  allowedUrls : [
    /^https?:\/\/(?:www\.)?youtube\.com\/watch\?.*v=[^&]/i
  ],

  scrap : function (url, data, done) {
    if (typeof(data) !== 'object') { return done(null, '') }

    var video = data.items[0];

    done(null, {
      sourceUrl  : url,
      sourceType : 'video',
      sourceService : 'youtube',
      title : video.snippet.title,
      description: video.snippet.description,
      images: [
        video.snippet.thumbnails.standard.url.replace('https', 'http')
      ]
    });
  }
});

module.exports = YouTubeScrapper;
