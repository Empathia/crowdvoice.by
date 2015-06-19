var PagesController = Class('PagesController').includes()({
  prototype : {

    about : function index (req, res, next) {
      res.render('pages/about.html', {
        layout : 'application'
      });
    }

  }
});

module.exports = new PagesController();
