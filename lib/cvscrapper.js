'use strict';
var baseDir = __dirname;

// Load external libraries
var async = require('async');
var fs = require('fs');

// Configuration in config/cvscrapper_config.json
var config = require(baseDir + '/../config/cvscrapper_config.json');

// Load downloaders
var downloaders = [];
config.downloaders.forEach(function (downloaderName) {
  downloaders.push(require(baseDir + '/downloaders/' + downloaderName + '_downloader'));
});

// Load scrappers
var scrappers = [];
config.scrappers.forEach(function (scrapperName) {
  scrappers.push(require(baseDir + '/scrappers/' + scrapperName + '_scrapper'));
});

var CVScrapper = Module('CVScrapper')({
  processUrl : function processUrl (url, done) {
    var scrapper = this;

    scrapper.downloadData(url, function (err, data) {
      scrapper.processData(url, data, function (err, info) {
        done(err, info);
      });
    });
  },

  downloadData : function downloadData (url, done) {
    var scrapper = this, downloaded = false;

    for (var i=0; i < downloaders.length; i++) {
      if (downloaders[i].isAllowedUrl(url)) {
        downloaders[i].download(url, done);
        downloaded = true;
        break;
      }
    }

    if (!downloaded) {
      done(new Error('No downloader available for this url'));
    }
  },

  processData : function processData (url, data, done) {
    var scrapper = this, processed = false;

    for (var i=0; i < scrappers.length; i++) {
      if (scrappers[i].isAllowedUrl(url)) {
        scrappers[i].getInfo(url, data, done);
        processed = true;
        break;
      }
    }

    if (!processed) {
      done(new Error('No scrapper available for this url'));
    }
  }
});

module.exports = CVScrapper;
