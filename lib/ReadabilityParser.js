'use strict'

var SCRAPPER_SERVICE_URL = process.env.SCRAPPER_SERVICE_URL || 'http://localhost:5000';

var readArt = require('read-art');
var reqFast = require('req-fast');
var stripTags = require('striptags');

var Readability = require('readability');
var JSDOMParser = require('readability/JSDOMParser');
var xmlserializer = require('xmlserializer');
var Parser = require('parse5');

// globals and polyfills needed for JSDOMParser
Array.prototype.includes = function (elem) {
  return this.indexOf(elem) > -1;
};

global.Node = JSDOMParser.Node;
global.Comment = JSDOMParser.Comment;
global.Document = JSDOMParser.Document;
global.Element = JSDOMParser.Element;
global.Text = JSDOMParser.Text;
global.dump = console.log;

// download the given URL
function tryRequest(url) {
  return new Promise(function(resolve, reject) {
    reqFast({
      url: url,
      headers: {
        'User-Agent': 'Chrome'
      }
    }, function(err, response) {
      if (err) {
        reject(err);
        return;
      }

      resolve(response.body);
    });
  });
}

// extract content using readability
function tryParse(url, body) {
  var dom = Parser.parse(body);
  var xhtml = xmlserializer.serializeToString(dom);
  var doc = new JSDOMParser.JSDOMParser().parse(xhtml);
  var r = new Readability(url, doc);

  return r.parse();
}

function tryHeadless(url) {
  return tryRequest(SCRAPPER_SERVICE_URL + '/?u=' + url)
    .then(function(response) {
      var data = tryParse(url, response);

      // if fails again try to normalize the content
      if (data === null) {
        // tags kept for readability
        var safe = 'a b i strong em p h1 h2 h3 h4 h5 h6 ul ol li dl dt dd'.split(' ');

        // remove unwanted tags first
        response = response.replace(/<(svg|script|style)[^<>]*>[\s\S]*?<\/\1>/g, '');

        // remove attributes from all tags (except <a>)
        response = response.replace(/<((?!a)\w+)[^<>]*?>/g, '<$1>');

        // remove classes and data-* attributes
        response = response.replace(/\s*(?:class|data-[\w-]+)=(["']).*?\1\s*/g, ' ');

        // add blank-lines between tags
        response = response.replace(/>\s*(<\w+>)/g, '>\n$1');

        // remove all tags but safe and top-level tags
        response = stripTags(response, safe.concat(['body', 'html', 'head', 'title']), '\n');

        // normalize all white-space
        response = response.replace(/(\s)+/g, '$1');

        // OK, try to read an "article" from the given markup
        return readArt(response).then(function(article) {
          var fallback;

          // no content was understood, creating a fallback one
          if (!article.content) {
            fallback = (response.indexOf('<body>') > -1 && response.indexOf('</body>') > -1)
              ? response.match(/<body>([\s\S]+?)<\/body>/)[1]
              : stripTags(response, safe, '');
          }

          return {
            uri: {},
            title: article.title,
            content: article.content || fallback,
            length: article.length || fallback.length,
            excerpt: article.excerpt || fallback.split('\n').slice(0, 3).join('\n'),
            byline: '',
            dir: '',
          };
        });
      }

      return data;
    });
}

function ReadabilityParser(url) {
  // first try to load the original URL with a simple request(),
  return tryRequest(url)
    .then(function(response) {
      var data = tryParse(url, response);

      if (data === null) {
        // if the result is null try again with javascript enabled,
        return tryHeadless(url);
      }

      return data;
    });
}

module.exports = ReadabilityParser;
