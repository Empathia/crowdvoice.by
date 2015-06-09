'use strict';

var fs = require('fs');
var scrapper = require(__dirname + '/scrapper.js');
var jsdom = require('jsdom-compat');

var jQuery      = fs.readFileSync(__dirname + '/assets/jquery-2.0.3.js', 'utf-8');
var helpersFile = fs.readFileSync(__dirname + '/assets/helpers.js', 'utf-8');

var HtmlScrapper = Module('HtmlScrapper').includes(Scrapper)({
  allowedUrls : [
    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
  ],

  deniedUrls : [
    /.*\.(jpe?g|png|gif|tiff)[^\.]*$/
  ],

  scrap : function (url, data, done) {
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

    if (typeof(data.text) !== 'string') { return done(null, '') }

    jsdom.env({
      url  : url,
      html : data.text,
      src  : [jQuery, helpersFile],
      done : function (err, window) {
        var $ = window.$;
        var info = {};

        try {
          info.sourceUrl = url;
          info.sourceType = 'link';
          info.sourceService = 'link';
          info.title = $('title').html().trim();
          info.description =
            $('meta[name=description]').attr('content') ||
            window.firstTextIn([
              'article', '#content', 'h2', 'h3', 'p', 'li', 'strong', 'div'
            ]);

          // Get images
          info.images = [];
          if ($('meta[property="og:image"]').length > 0) {
            info.images.push($('meta[property="og:image"]').attr('content'));
          }
          if ($('meta[name="twitter:image"]').length > 0) {
            info.images.push($('meta[name="twitter:image"]').attr('content'));
          }
          if ($('meta[property="twitter:image:src"]').length > 0) {
            info.images.push($('meta[property="twitter:image:src"]').attr('content'));
          }
          if ($('link[rel=image_src]').length > 0) {
            info.images.push($('link[rel=image_src]').attr('href'));
          }
          $('img').each(function () {
            var img = this;
            if ($(img).attr('src') && $(img).attr('src').match(/\.(gif|png|jpe?g|bmp)[^\.]*$/i)) {
              info.images.push($(img).attr('src'));
            }
          });

          info.images.forEach(function (image, i) {
            info.images[i] = window.absolutePath(image)
              .replace('https', 'http')
              .replace('ftps', 'ftp')
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
