'use strict';

var Scrapper = require(__dirname + '/scrapper.js');

var ImageScrapper = Module('ImageScrapper').includes(Scrapper)({
  allowedUrls : [
    /.*\.(jpe?g|png|gif|tiff)[^\.]*$/
  ],

  scrap : function (url, data, done) {
    if (typeof(data) !== 'object') { return done(null, '') }

    done(null, {
      sourceUrl  : url,
      sourceType : 'image',
      sourceService : 'raw',
      title : data.url,
      description: data.url,
      images: [data]
    });
  }
});

module.exports = ImageScrapper;
