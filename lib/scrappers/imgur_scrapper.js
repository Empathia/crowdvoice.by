'use strict';

var sanitizer = require('sanitize-html');

var sanitizerOptions = {
  allowedTags : [],
  allowedAttributes : []
}

var Scrapper = require(__dirname + '/scrapper.js');

var ImgurScrapper = Module('ImgurScrapper').includes(Scrapper)({
  allowedUrls : [
    /^https?:\/\/(?:www\.)?imgur\.com\/gallery\/.*/i
  ],

  scrap : function (url, data, done) {
    if (typeof(data) !== 'object') { return done(null, '') }

    var title =  sanitizer(data.title || '', sanitizerOptions);
    title = title.substr(0, 65);

    var description =  sanitizer(data.description || '', sanitizerOptions);
    description = description.substr(0, 140);

    done(null, {
      sourceUrl  : url,
      sourceType : 'image',
      sourceService : 'imgur',
      title : title,
      description: description,
      images: data.images
    });
  }
});

module.exports = ImgurScrapper;
