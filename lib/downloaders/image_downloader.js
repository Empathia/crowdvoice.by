'use strict';

var baseDir = __dirname;

var Downloader = require(__dirname + '/downloader.js');
var fs = require('fs');
var crypto = require('crypto');
var http = require('http');
var sharp = require('sharp');

// Configuration in config/cvscrapper_config.json
var config = require(baseDir + '/../../config/cvscrapper_config.json');
var downloadPath = config.ImageDownloader.downloadPath.replace('{app_path}', fs.realpathSync(__dirname + '/../../'));

// Make sure downloadPath exists
(function () {
  var fullPath = '';
  downloadPath.split('/').forEach(function (path) {
    if (path === '') { return; }
    fullPath += '/' + path;
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath);
    }
  });
})();

var ImageDownloader = Module('ImageDownloader').includes(Downloader)({
  generateTempPath : function (url) {
    return downloadPath + '/downloaded_image_' +
      crypto.randomBytes(16).toString('hex') + '.' +
      url.substr(-5, 5).replace(/.*\./, '');
  },

  allowedUrls : [
    /^.*\.(png|jpg|gif|jpeg)$/
  ],

  transformer : function () {
    return sharp()
      .resize(340);
  },

  retrieveData : function (url, done) {
    var downloader = this;
    var tempPath = this.generateTempPath(url);

    http.get(url, function (res) {
      var fd = fs.createWriteStream(tempPath);

      res.pipe(downloader.transformer()).pipe(fd);
      res.on('end', function () {
        done(null, {
          type: 'image',
          fileName: url,
          path: tempPath
        });
      });
      res.on('error', function (e) {
        done(e);
      });
    }).on('error', function (e) {
      done(e);
    });
  }
});

module.exports = ImageDownloader;
