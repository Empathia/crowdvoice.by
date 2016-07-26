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

var HtmlScrapper = Module('HtmlScrapper').includes(Scrapper)({
  allowedUrls : [
    /https?:\/\/(w{3}\.)?periscope.tv\/w\/.+/i
  ],

  deniedUrls : [
    /.*\.(jpe?g|png|gif|tiff)[^\.]*$/i
  ],

  scrap : function (url, data, done) {
    if (!data || typeof(data.text) !== 'string') { return done(new Error('Data has no content.')) }

    if (!data.contentType) {
      return done(new Error('Data has no contentType'))
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
          info.sourceService = 'periscope';

          var title = sanitizer($('div.BroadcastTitle').html().trim(), sanitizerOptions);

          info.title = title.substr(0, 80) || 'No Title';

          var description =  'No Description';

          info.description = description;

          // Get images
          info.images = [];

          info.images = info.images.concat(window.getContentOrValue([
            'meta[property="og:image"]',
            'meta[name="twitter:image"]',
            'meta[property="twitter:image:src"]',
          ]));

          if ($('link[rel=image_src]').length > 0 &&
              $('link[rel=image_src]').attr('href')
          ) {
            info.images.push($('link[rel=image_src]').attr('href'));
          }

          $('img').each(function () {
            var img = this;
            if ($(img).attr('src') && !$(img).attr('src').match('data:') && $(img).attr('src').match(/(gif|png|jpe?g|bmp)[^\.]*(\?.*)?$/i)) {
              info.images.push($(img).attr('src'));
            }
          });

          info.images.forEach(function (image, i) {
            if (/^https?:\/\//.test(image)) {
              info.images[i] = image;
            } else if (/^\/\//.test(image)) {
              info.images[i] = window.location.protocol + image;
            } else {
              info.images[i] = window.location.origin + window.absolutePath(image);
            }
          });

        } catch (e) {
          return done(e);
        }


        done(err, info);
      }
    });
  }
});

module.exports = HtmlScrapper;
