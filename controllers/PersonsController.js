var PersonsController = Class('PersonsController').inherits(RestfulController)({
  prototype : {
    // _initRouter : function() {
    //   RestfulController.prototype._initRouter.apply(this, arguments);
    // },

    index : function index (req, res) {
      res.format({
        'text/html': function () {
          res.render('persons/index.html', {layout : false});
        },
        'application/json': function () {
          res.json([]);
        }
      });
    },

    show : function show (req, res) {
      res.render('persons/show.html', {layout : false});
    },

    new : function (req, res) {
      res.render('persons/new.html');
    },

    create : function create (req, res) {
      res.redirect('/person/id');
    },

    edit : function edit (req, res) {
      res.render('persons/edit.html', {layout : false});
    },

    update : function update (req, res) {
      res.redirect('/person/id');
    },

    destroy : function destroy (req, res) {
      res.redirect('/persons');
    }
  }
});

module.exports = new PersonsController();
