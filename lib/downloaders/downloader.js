'use strict';

var Downloader = Module('Downloader')({
  allowedUrls : [],
  deniedUrls  : [],

  isAllowedUrl : function (url) {
    if (typeof(url) !== 'string') { return false; }

    // Check that url is allowed for this downloader
    var allowed = false;

    for (var i=0; i < this.deniedUrls.length; i+=1) {
      if (url.match(this.deniedUrls[i])) {
        return false;
      }
    }

    for (var i=0; i < this.allowedUrls.length; i+=1) {
      if (url.match(this.allowedUrls[i])) {
        allowed = true;
      }
    }

    return allowed;
  },

  download : function (url, done) {

    this.retrieveData(url, done);
  },

  retrieveData : function (url, done) {
    done(null, '');
  }
});

module.exports = Downloader;
