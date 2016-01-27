var parser = require('parse-rss');
var YouTube = require('youtube-node');

var SearchFrom = Class('SearchFrom')({
  prototype : {

    google : function(req, res, next) {
      parser('https://news.google.com/news?q=' + encodeURIComponent(req.body.query) + '&output=rss', function(err, response) {
        if (err) {
          return next(err);
        }

        var result = [];

        response.forEach(function(item) {
          var obj = {
            title : item.title,
            description : item.description,
            date : item.date,
            sourceUrl : item.link
          }

          result.push(obj);
        });

        res.format({
          json : function() {
            res.json(result);
          }
        });
      });
    },

    youtube : function(req, res, next) {
      /**
       * req.body = {
       *   query: <String>,
       *   nextPageToken: null | <String>,
       * }
       */

      var youtube = new YouTube();
      youtube.setKey(CONFIG.youtube.key);

      if (req.body.nextPageToken) {
        youtube.addParam('pageToken', req.body.nextPageToken)
      }

      youtube.search(req.body.query, 50, function(err, response) {
        if (err) { return next(err); }

        var result = {
          nextPageToken: response.nextPageToken || null,
          pageInfo: response.pageInfo,
          videos: []
        };

        response.items.forEach(function(item) {
          if (item.id.kind === 'youtube#video') {
            var obj = {
              title : item.snippet.title,
              description : item.snippet.description,
              thumb : item.snippet.thumbnails.medium,
              date : item.snippet.publishedAt,
              sourceUrl : 'http://youtube.com/watch?v=' + item.id.videoId
            }

            result.videos.push(obj);
          }
        });

        res.json(result);
      });
    }

  }
});

module.exports = new SearchFrom();
