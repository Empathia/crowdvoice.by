var parser = require('parse-rss');

// Youtube API
var YouTube = require('youtube-node');

var youtube = new YouTube();

youtube.setKey(CONFIG.youtube.key);

var SearchFrom = Class('SearchFrom')({
  prototype : {
    google : function(req, res, next) {
      var q = req.params.q;

      parser('https://news.google.com/news?q=' +  q + '&output=rss', function(err, response) {
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
      var q = req.params.q;

      youtube.search('mexico', 50, function(err, response) {
        if (err) {
          return next(err);
        }

        var result = [];

        response.items.forEach(function(item) {
          var obj = {
            title : item.snippet.title,
            description : item.snippet.description,
            date : item.snippet.publishedAt,
            sourceUrl : 'http://youtube.com/watch?v=' + item.id.videoId
          }

          result.push(obj);
        });

        res.json(result);
      })

    }
  }
});

module.exports = new SearchFrom();
