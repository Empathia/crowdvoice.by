'use strict';

var baseDir = __dirname;

var Downloader = require(__dirname + '/downloader.js');
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var http = require('http');
var https = require('https');
var sharp = require('sharp');
var imagesize = require('imagesize');

// Configuration in config/cvscrapper_config.json
var config = require(baseDir + '/../../config/cvscrapper_config.json');
var appPath = fs.realpathSync(__dirname + '/../../');
var downloadPath = config.ImageDownloader.downloadPath.replace('{app_path}', appPath);

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
    var match = url.match(/\.([a-zA-Z]{3,4})$/);
    var extension;

    if (match) {
      extension = match[1];
    } else {
      extension = 'png';
    }

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
    var client = http;

    if (url.match('^https')) {
      client = https;
    }

    var tempPath = downloader.generateTempPath(url);
    var transform = sharp().toFile(tempPath, function (err, info) {
      if (!err) {
        info.url = url;
        info.path = '/' + path.relative(appPath + '/public/', tempPath);
      }
      done(err, info);
    });
    var req = client.get(url, function (res) {
      if (res.headers['content-type'].match('image')) {
        imagesize(res, function (err, size) {
          if (err) { return done(err); }
          // This partial request is just to know the size of the image
          req.abort();
          var sreq = client.get(url, function (res) {
            if (size.width > 340) {
              res.pipe(transform.resize(340));
            } else {
              res.pipe(transform);
            }
          });
        });
      } else {
        done(new Error('url is not an image (' + url + ')'));
      }
    }).on('error', function (err) {
      done(err);
    });
  },
});

module.exports = ImageDownloader;
