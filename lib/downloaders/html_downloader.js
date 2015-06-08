'use strict';

var downloader = require(__dirname + '/downloader.js');
var request = require('superagent');

var HtmlDownloader = Module('HtmlDownloader').includes(Downloader)({
  allowedUrls : [
    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
  ],

  retrieveData : function (url, done) {
    request.get(url).end(function (err, res) {
      done(err, {
        contentType: res.headers['content-type'],
        text: res.text
      });
    });
  }
});

module.exports = HtmlDownloader;
