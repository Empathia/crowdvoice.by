'use strict';

var Scrapper = require(__dirname + '/scrapper.js');

var VimeoScrapper = Module('VimeoScrapper').includes(Scrapper)({
  allowedUrls : [
    /^https?:\/\/(?:www\.)?vimeo\.com\/(?:.*\/)?(\d+)/i
  ],

  scrap : function (url, data, done) {
    if (typeof(data) !== 'object') { return done(null, '') }

    var video = data[0];

    done(null, {
      sourceUrl  : url,
      sourceType : 'video',
      sourceService : 'vimeo',
      title : video.title,
      description: video.description,
      images: [
        video.thumbnail_large
      ]
    });
  }
});

module.exports = VimeoScrapper;
