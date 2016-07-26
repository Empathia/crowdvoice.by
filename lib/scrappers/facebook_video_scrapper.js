'use strict';

var sanitizer = require('sanitize-html');

var sanitizerOptions = {
  allowedTags : [],
  allowedAttributes : []
}

var fs = require('fs');
var scrapper = require(__dirname + '/scrapper.js');
var jsdom = require('jsdom');

var jQuery      = fs.readFileSync(__dirname + '/assets/jquery-2.0.3.js', 'utf-8');
var helpersFile = fs.readFileSync(__dirname + '/assets/helpers.js', 'utf-8');

var FBVideoScrapper = Module('FBVideoScrapper').includes(Scrapper)({
  allowedUrls : [
    /https?:\/\/(w{3}\.)?facebook\.com\/.*\/videos\/\d+\/?/i,
    /https?:\/\/(w{3}\.)?facebook.com\/.*\/videos\/.*/i
  ],

  deniedUrls : [
    /.*\.(jpe?g|png|gif|tiff)[^\.]*$/i
  ],

  scrap : function (url, data, done) {
    if (!data || typeof(data.text) !== 'string') { return done(new Error('Data has no content.')) }

    if (!data.contentType) {
      return done(new Error('Data has no contentType'))
    }

    var videoID = url.match(/(\d+)(?=$|\/)/gi).pop();

    FB.api(videoID + '?fields=permalink_url,thumbnails,title,description', function(result) {
      if (!result || result.error) {
        return done(result.error || new Error('FB Graph Error'));
      }

      var info = {};

      info.title = result.title || 'No Title';
      info.description = result.description || 'No Description';
      info.images = result.thumbnails.data.map(function(item) { return item.uri });
      info.sourceType = 'video';
      info.sourceService = 'facebook';
      info.sourceUrl = url;

      done(null, info);
    });
  }
});

module.exports = FBVideoScrapper;
