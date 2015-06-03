'use strict';

var scrapper = require(__dirname + '/scrapper.js');
var jsdom = require('jsdom-compat');

var HtmlScrapper = Object.create(scrapper);

var prototype = {
  allowedUrls : [
    /google.com/
  ],

  scrap : function (data, done) {
    jsdom.env(
      data, 
      ["http://code.jquery.com/jquery.js"],
      function (err, window) {
        var $ = window.$;
        done(null, $('title').html());
      }
    );
  }
};

Object.keys(prototype).forEach(function (key) {
  HtmlScrapper[key] = prototype[key];
});

module.exports = HtmlScrapper;
