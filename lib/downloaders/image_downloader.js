'use strict';

var downloader = require(__dirname + '/downloader.js');
var request = require('superagent');

var ImageDownloader = Object.create(downloader);

var prototype = {
  allowedUrls : [
    /^.*\.(png|jpg|gif|jpeg)$/
  ],

  retrieveData : function (url, done) {
    done(err, 'image');
  }
};

Object.keys(prototype).forEach(function (key) {
  ImageDownloader[key] = prototype[key];
});

module.exports = ImageDownloader;
