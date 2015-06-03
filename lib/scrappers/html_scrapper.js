'use strict';

var scrapper = require(__dirname + '/scrapper.js');
var jsdom = require('jsdom');

var HtmlScrapper = Object.create(scrapper);

var prototype = {
  allowedUrls : [
    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
  ],

  scrap : function (data, done) {
    done(null, data.substr(0,10));
  }
};

Object.keys(prototype).forEach(function (key) {
  HtmlScrapper[key] = prototype[key];
});

module.exports = HtmlScrapper;
