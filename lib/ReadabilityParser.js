'use strict'

var readability = require(path.join(__dirname, '../node_modules/readability/index.js')),
  Readability = readability.Readability,
  JSDOMParser = readability.JSDOMParser,
  request = require('superagent'),
  xmlserializer = require('xmlserializer'),
  Parser = require('parse5').Parser

// From http://stackoverflow.com/a/21553982

var getLocation = function (href) {
  var match = href.match(new RegExp([
    '^(https?:)//', // protocol
    '(([^:/?#]*)(?::([0-9]+))?)', // host (hostname and port)
    '(/[^?#]*)', // pathname
    '(\\?[^#]*|)', // search
    '(#.*|)$' // hash
  ].join('')))

  return match && {
    protocol: match[1],
    host: match[2],
    hostname: match[3],
    port: match[4],
    pathname: match[5],
    search: match[6],
    hash: match[7],
  }
}

var ReadabilityParser = Module('ReadabilityParser')({

  prototype: {

    parse: function (url, callback) {
      var dom,
        xhtml,
        location = getLocation(url),
        doc,
        article

      var parser = new Parser()

      async.series([
        // Get document
        function (nextSeries) {
          request
            .get(url)
            .end(function (err, response) {
              if (err) { return nextSeries(err) }

              dom = parser.parse(response.text)
              xhtml = xmlserializer.serializeToString(dom)
              doc = new JSDOMParser().parse(xhtml)

              return nextSeries()
            })
        },

        // Parse with Readability
        function (nextSeries) {
          var uri = {
            spec: location.href,
            host: location.host,
            prePath: location.protocol + '//' + location.host,
            scheme: location.protocol.substr(0, location.protocol.indexOf(':')),
            pathBase: location.protocol + '//' + location.host + location.pathname.substr(0, location.pathname.lastIndexOf('/') + 1)
          }

          article = new Readability(uri, doc).parse()

          return nextSeries()
        },
      ], function (err) {
        if (err) { return callback(err) }

        return callback(null, article)
      })
    },

  },

})

module.exports = ReadabilityParser
