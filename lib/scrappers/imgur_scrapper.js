'use strict';

var Scrapper = require(__dirname + '/scrapper.js');

var ImgurScrapper = Module('ImgurScrapper').includes(Scrapper)({
  allowedUrls : [
    /^https?:\/\/(?:www\.)?imgur\.com\/gallery\/.*/i
  ],

  scrap : function (url, data, done) {
    if (typeof(data) !== 'object') { return done(null, '') }

    done(null, {
      sourceUrl  : url,
      sourceType : 'image',
      sourceService : 'imgur',
      title : data.title,
      description: data.description || '',
      images: data.images
    });
  }
});

module.exports = ImgurScrapper;
