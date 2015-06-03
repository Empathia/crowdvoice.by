'use strict';

var downloader = require(__dirname + '/downloader.js');
var request = require('superagent');

var HtmlDownloader = Object.create(downloader);

var prototype = {
  allowedUrls : [
    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
  ],

  retrieveData : function (url, done) {
    request.get(url).end(function (err, res) {
      done(err, res.text);
    });
  }
};

Object.keys(prototype).forEach(function (key) {
  HtmlDownloader[key] = prototype[key];
});

module.exports = HtmlDownloader;
