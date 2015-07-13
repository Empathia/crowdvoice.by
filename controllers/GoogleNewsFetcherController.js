var parser = require('parse-rss');
var GoogleNewsFetcherController = Class('GoogleNewsFetcherController')({
  prototype : {
    search : function(req, res, next) {
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
    }
  }
});

module.exports = new GoogleNewsFetcherController();
