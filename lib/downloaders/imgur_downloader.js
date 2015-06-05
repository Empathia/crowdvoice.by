'use strict';

var downloader = require(__dirname + '/downloader.js');
var request = require('superagent');
var async = require('async');

var ImgurDownloader = Module('ImgurDownloader').includes(Downloader)({
  allowedUrls : [
    /^https?:\/\/(?:www\.)?imgur\.com\/gallery\/.*/i
  ],

  retrieveData : function (url, done) {
    if (!url.match(/\/gallery\/([^\/]+)/)) {
      return done(new Error('Cannot process this imgur url'));
    }

    var imageId = url.match(/\/gallery\/([^\/]+)/)[1];

    request.get('https://api.imgur.com/3/gallery/' + imageId)
      .set('Authorization', 'Client-ID 5c008b06ed9983c')
      .accept('json')
      .end(function (err, res) {
        var data = res.body.data;
        var images = [];

        if (!data.images) {
          images.push(data.link);
        } else {
          for (var i=0; i < 10; i+=1) {
            if (data.images[i]) {
              images.push(data.images[i].link);
            }
            
          }
        }

        data.images = [];
        async.each(images, function (image, done) {
          // Download Images
          ImageDownloader.download(image, function (err, imageData) {
            data.images.push(imageData.path);
            done(err);
          });
        }, function () {
          done(err, data);
        });
      });
  }
});

module.exports = ImgurDownloader;
