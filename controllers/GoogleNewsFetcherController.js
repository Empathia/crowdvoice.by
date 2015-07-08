var parser = require('parse-rss');
var GoogleNewsFetcherController = Class('GoogleNewsFetcherController')({
  prototype : {
    search : function(req, res, next) {
      var q = req.params.q;

      parser('https://news.google.com/news?q=' +  q + '&output=rss', function(err, response) {
        if (err) {
          return next(err);
        }

        res.format({
          json : function() {
            res.json(response);
          }
        });
      });
    }
  }
});

module.exports = new GoogleNewsFetcherController();
