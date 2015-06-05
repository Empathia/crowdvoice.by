'use strict';

var Scrapper = require(__dirname + '/scrapper.js');

var FlickrScrapper = Module('FlickrScrapper').includes(Scrapper)({
  allowedUrls : [
    /^https?:\/\/(?:www\.)?flickr\.com\/photos\/[-\w@]+\/\d+/i
  ],

  scrap : function (url, data, done) {
    if (typeof(data) !== 'object') { return done(null, '') }

    var photo = data.photo;

    done(null, {
      sourceUrl  : url,
      sourceType : 'image',
      sourceService : 'flickr',
      title : photo.title._content,
      description: photo.description._content,
      images: [
        data.photoData.path
      ]
    });
  }
});

module.exports = FlickrScrapper;
