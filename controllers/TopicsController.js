var TopicsController = Class('TopicsController')({
  prototype : {

    getTopicById : function getTopicById (req, res, next) {
      // Check params
      if (isNaN(req.params.id)) {
        next(new Error('Id has to be an integer'));
      }

      console.log(req.params.id);
      Topic.findById(req.params.id, function (err, result) {
        if (err) { next(err); return; }
        if (result.length === 0) { next(new Error('Not found')); }

        res.locals.topic = new Topic(result[0]);
        next();
      });
    },

    index : function index (req, res) {
      Topic.all(function (err, results) {
        if (err) { next(err); return; }

        res.locals.topics = [];

        results.forEach(function (result) {
          res.locals.topics.push(new Topic(result));
        });

        res.format({
          'text/html': function () {
            res.render('topics/index.html', {});
          },
          'application/json': function () {
            res.json(res.locals.topics);
          }
        });
      });
    },

    show : function show (req, res) {
      res.format({
        'text/html': function () {
          res.render('topics/show.html', {});
        },
        'application/json': function () {
          res.json(res.locals.topic);
        }
      });
    },

    new : function (req, res) {
      res.render('topics/new.html');
    },

    create : function create (req, res) {
      var topic = new Topic({
        name: req.body.name
      });

      async.series([
        function (done) {
          topic.save(done);
        },
        function (done) {
          if (!req.files['image']) { return done(); }
          topic.uploadImage('image', req.files['image'].path, function (err) {
            done(err);
          });
        },
        function (done) {
          topic.save(done);
        }
      ], function (err) {
        if (err) {
          res.locals.errors = err;
          res.render('/topics/new.html');
        } else {
          res.redirect('/topics');
        }
      });
    },

    edit : function edit (req, res) {
      res.render('topics/edit.html', {});
    },

    update : function update (req, res) {
      var topic = res.locals.topic;

      topic.name = req.body.name || topic.name;

      async.series([
        function (done) {
          topic.save(done);
        },
        function (done) {
          if (!req.files['image']) { return done(); }
          topic.uploadImage('image', req.files['image'].path, function (err) {
            done(err);
          });  
        }
      ], function (err) {
        if (err) {
          res.locals.topic = topic;
          res.render('topics/edit.html');
        } else {
          res.redirect('/topics');
        }
      });
    },

    destroy : function destroy (req, res) {
      var topic = res.locals.topic;

      topic.destroy(function (err) {
        if (err) { return next(err); }
        res.redirect('/topics');
      });
    }
  }
});

module.exports = new TopicsController();
