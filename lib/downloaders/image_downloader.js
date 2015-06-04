'use strict';

var Downloader = require(__dirname + '/downloader.js');
var http = require('http');

var ImageDownloader = Module('ImageDownloader').includes(Downloader)({
  allowedUrls : [
    /^.*\.(png|jpg|gif|jpeg)$/
  ],

  retrieveData : function (url, done) {
    done(null, '');
    // http.get(url, function (res) {
    //   fs.open(
    // }).on('error', function (e) {
    //   done(e);
    // });
  }
});

module.exports = ImageDownloader;
