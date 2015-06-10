'use strict';

var sanitizer = require('sanitize-html');

var sanitizerOptions = {
  allowedTags : [],
  allowedAttributes : []
}

var Scrapper = require(__dirname + '/scrapper.js');

var FlickrScrapper = Module('FlickrScrapper').includes(Scrapper)({
  allowedUrls : [
    /^https?:\/\/(?:www\.)?flickr\.com\/photos\/[-\w@]+\/\d+/i
  ],

  scrap : function (url, data, done) {
    if (typeof(data) !== 'object') { return done(null, '') }

    var photo = data.photo;

    var title =  sanitizer(photo.title._content || '', sanitizerOptions);
    title = title.substr(0, 65);

    var description =  sanitizer(photo.description._content || '', sanitizerOptions);
    description = description.substr(0, 140);

    done(null, {
      sourceUrl  : url,
      sourceType : 'image',
      sourceService : 'flickr',
      title : title,
      description: description,
      images: photo.images
    });
  }
});

module.exports = FlickrScrapper;
