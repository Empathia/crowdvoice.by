'use strict';

var Scrapper = {
  allowedUrls : [],

  isAllowedUrl : function (url) {
    // Check that url is allowed to be processed
    var allowed = false;
    for (var i=0; i < this.allowedUrls.length; i+=1) {
      if (url.match(this.allowedUrls[i])) {
        allowed = true;
      }
    }

    return allowed;
  },

  getInfo : function (url, done) {
    if (typeof(url) !== "string" || !this.isAllowedUrl(url)) {
      done(new Error(url + ' is not allowed for this scrapper'));
    }

    this.scrap(url, done);
  },

  scrap : function (url, done) {
    done(null, '');
  }
};

module.exports = Scrapper;
