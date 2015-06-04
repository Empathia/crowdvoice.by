'use strict';

var Downloader = require(__dirname + '/downloader.js');
var fs = require('fs');
var crypto = require('crypto');
var http = require('http');

var ImageDownloader = Module('ImageDownloader').includes(Downloader)({
  generateTempPath : function (url) {
    return '/tmp/downloaded_image_' +
      crypto.randomBytes(16).toString('hex') + '.' +
      url.substr(-5, 5).replace(/.*\./, '');
  },

  allowedUrls : [
    /^.*\.(png|jpg|gif|jpeg)$/
  ],

  retrieveData : function (url, done) {
    var tempPath = this.generateTempPath(url);

    http.get(url, function (res) {
      var fd = fs.createWriteStream(tempPath);

      res.pipe(fd);
      res.on('end', function () {
        done(null, {
          type: 'image',
          fileName: url,
          path: tempPath
        });
      });
    }).on('error', function (e) {
      done(e);
    });
  }
});

module.exports = ImageDownloader;
