var parser = require('parse-rss');

var SourcesSearchController = Class('SourcesSearchController')({
  prototype : {
    googleNews : function(req, res, next) {

      res.format({
        json : function() {
          var query = req.params.query;

          var url = 'https://news.google.com/news?q=' + query + '&output=rss';

          parser(url, function(err, results) {
            if (err) {
              return next(err);
            }

            var articles = [];

            results.forEach(function(result) {
              var article = {
                title : result.title,
                description : result.summary,
                date : result.date,
                link : result.link
              }

              articles.push(article);
            })

            res.json(articles);
          })
        }
      })
    },


  }
});

module.exports = new SourcesSearchController();
