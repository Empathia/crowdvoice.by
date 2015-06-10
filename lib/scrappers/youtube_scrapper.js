'use strict';

var sanitizer = require('sanitize-html');

var sanitizerOptions = {
  allowedTags : [],
  allowedAttributes : []
}

var Scrapper = require(__dirname + '/scrapper.js');

var YouTubeScrapper = Module('YouTubeScrapper').includes(Scrapper)({
  allowedUrls : [
    /^https?:\/\/(?:www\.)?youtube\.com\/watch\?.*v=[^&]/i
  ],

  scrap : function (url, data, done) {
    if (typeof(data) !== 'object') { return done(null, '') }

    var video = data.items[0];

    var title =  sanitizer(video.snippet.title || '', sanitizerOptions);
    title = title.substr(0, 65);

    var description =  sanitizer(video.snippet.description || '', sanitizerOptions);
    description = description.substr(0, 140);

    done(null, {
      sourceUrl  : url,
      sourceType : 'video',
      sourceService : 'youtube',
      title : title,
      description: description,
      images: [
        video.snippet.thumbnails.high.url.replace('https', 'http')
      ]
    });
  }
});

module.exports = YouTubeScrapper;
