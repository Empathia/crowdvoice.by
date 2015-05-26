module.exports = function(req, res) {
  res.format({
    html : function() {
      res.status(404);
      res.render('shared/404.html', {message : "We can't find the page you're looking for!"});
    },
    json : function() {
      res.status(404);
      res.json({error : 'Not Found'});
    }
  })

};
