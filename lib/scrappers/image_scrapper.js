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
      title : data.fileName,
      description: data.fileName,
      path: data.path
    });
  }
});

module.exports = ImageScrapper;
