'use strict';

var baseDir = __dirname;

var Downloader = require(__dirname + '/downloader.js');
var fs = require('fs');
var crypto = require('crypto');
var http = require('http');
var urlExpander = require('expand-url');
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
    var extension = url.substr(-5, 5).replace(/.*\./, '');

    if (extension.match(/gif/i)) {
      extension = 'png';
    }

    return downloadPath + '/downloaded_image_' +
      crypto.randomBytes(16).toString('hex') + '.' +
      extension;
  },

  allowedUrls : [
    /^.*\.(png|jpg|gif|jpeg)$/
  ],

  retrieveData : function (url, done) {
    var downloader = this;

    urlExpander.expand(url, function (err, longUrl) {
      if (err) { return done(err); }

      var tempPath = downloader.generateTempPath(longUrl);
      var transform = sharp().resize(340).toFile(tempPath, function (err, info) {
        info.url = longUrl;
        info.path = tempPath;
        done(err, info);
      });
      var req = http.get(longUrl, function (res) {
        res.pipe(transform);
      }).on('error', function (err) {
        done(err);
      });
    });
  },
});

module.exports = ImageDownloader;
