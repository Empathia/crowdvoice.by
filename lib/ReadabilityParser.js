'use strict'

// FIXME: change this public URL for a private one, or a service on the same network (?)
var SCRAPPER_SERVICE_URL = process.env.SCRAPPER_SERVICE_URL || 'https://localhost:5000/';

var reqFast = require('req-fast');

function ReadabilityParser(url) {
  return new Promise(function (resolve, reject) {
    reqFast({
      url: SCRAPPER_SERVICE_URL + '?json=1&url=' + encodeURIComponent(url),
    }, function (error, response) {
      if (error) {
        reject(error);
      } else {
        resolve(response.body);
      }
    });
  });
}

module.exports = ReadabilityParser;
