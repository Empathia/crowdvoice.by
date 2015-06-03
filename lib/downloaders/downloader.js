'use strict';

var Downloader = {
  allowedUrls : [],

  isAllowedUrl : function (url) {
    // Check that url is allowed for this downloader
    var allowed = false;
    for (var i=0; i < this.allowedUrls.length; i+=1) {
      if (url.match(this.allowedUrls[i])) {
        allowed = true;
      }
    }

    return allowed;
  },

  download : function (url, done) {
    if (typeof(url) !== "string" || !this.isAllowedUrl(url)) {
      done(new Error(url + ' is not a allowed url for this downloader'));
    }

    this.retrieveData(url, done);
  },

  retrieveData : function (url, done) {
    done(null, '');
  }
};

module.exports = Downloader;
