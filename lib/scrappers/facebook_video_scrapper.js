'use strict';

var sanitizer = require('sanitize-html');

var sanitizerOptions = {
  allowedTags : [],
  allowedAttributes : []
}

var fs = require('fs');
var scrapper = require(__dirname + '/scrapper.js');
var jsdom = require('jsdom');

var jQuery      = fs.readFileSync(__dirname + '/assets/jquery-2.0.3.js', 'utf-8');
var helpersFile = fs.readFileSync(__dirname + '/assets/helpers.js', 'utf-8');

var FBVideoScrapper = Module('FBVideoScrapper').includes(Scrapper)({
  allowedUrls : [
    /https?:\/\/(w{3}\.)?facebook\.com\/.*\/videos\/\d+\/?/i,
    /https?:\/\/(w{3}\.)?facebook.com\/.*\/videos\/.*/i
  ],

  deniedUrls : [
    /.*\.(jpe?g|png|gif|tiff)[^\.]*$/i
  ],

  scrap : function (url, data, done) {
    if (!data || typeof(data.text) !== 'string') { return done(new Error('Data has no content.')) }

    if (!data.contentType) {
      return done(new Error('Data has no contentType'))
    }

    if (data.contentType.match(/image/)) {
      return done(null, {
        sourceUrl : url,
        sourceType : 'image',
        sourceService : 'image',
        title : url,
        description : url,
        images: [url]
      });
    }

    jsdom.env({
      url  : url,
      html : data.text,
      src  : [jQuery, helpersFile],
      done : function (err, window) {
        if (err) {
          logger.error(err);
          return done(err);
        }

        var $ = window.$;
        var info = {};

        try {
          info.sourceUrl = url;
          info.sourceType = 'video';
          info.sourceService = 'facebook';

          var element = $('.userContent');


          var title = element.first().find('> p').text() || 'No Title';


          info.title = title.substr(0, 80);

          var description = 'No Description';

          info.description = description.substr(0, 180);

          // Get images
          info.images = [];


          $('img').each(function () {
            var img = $(this);
            var bg = img.css('background-image');
            bg = bg.replace('url(','').replace(')','');

            if (bg !== '' && bg.match(/jpe?g/)) {
              info.images.push(bg);
            }
          });

          done(null, info);
        } catch(e) {
          done(e);
        }
      }
    });
  }
});

module.exports = FBVideoScrapper;
