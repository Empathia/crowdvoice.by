var VoicesController = Class('VoicesController').inherits(RestfulController)({
  prototype : {
    init : function () {
      this._initRouter();
      return this;
    },

    _initRouter : function () {
      application.router.route('/voices').get(this.index);
      application.router.route('/voice').post(this.create);
      application.router.route('/voice/new').get(this.new);

      application.router.route('/voice/:id*').all(this.getActiveVoice);
      application.router.route('/voice/:id').get(this.show);
      application.router.route('/voice/:id').put(this.update);
      application.router.route('/voice/:id/edit').get(this.edit);
    },

    getActiveVoice : function (req, res, next) {
      Voice.find({ id: req.params.id }, function (err, result) {
        if (err) { return next(err); }
        if (result.length === 0) { next(new NotFoundError('Not Found')); }

        res.locals.voice = new Voice(result[0]);
        req.activeVoice = new Voice(result[0]);

        next();
      });
    },

    index : function index (req, res, next) {
      var query = {
        ownerId: req.body.ownerId,
        topics: req.body.topics,
        createdBefore: req.body.createdBefore,
        createdAfter: req.body.createdAfter
      };

      Voice.filterBy(query, function (err, result) {
        if (err) { return next(err); }

        res.format({
          'text/html': function () {
            res.locals.voices = result;
            res.render('voices/index.html');
          },
          'application/json': function () {
            res.json(result);
          }
        });
      });
    },

    show : function show (req, res) {
      res.format({
        'text/html': function () {
          res.render('voices/show.html', {});
        },
        'application/json': function () {
          res.json(req.activeVoice);
        }
      });
    },

    new : function (req, res) {
      res.render('voices/new.html', {errors: null});
    },

    create : function create (req, res) {
      var voice = new Voice({
        title: req.body.title,
        status: req.body.status,
        description: req.body.description,
        type: req.body.type,
        ownerId: req.body.ownerId,
        twitterSearch: req.body.twitterSearch,
        rssUrl: req.body.rssUrl,
        latitude: req.body.latitude,
        longitude: req.body.longitude
      });
      voice.save(function (err) {
        if (err) {
          res.render('voices/new.html', {errors: err});
        } else {
          res.redirect('/voice/' + voice.id);
        }
      });
    },

    edit : function edit (req, res) {
      res.render('voices/edit.html', {errors: null});
    },

    update : function update (req, res) {
      var voice = req.activeVoice;
      voice.setProperties({
        title: req.body.title || voice.title,
        status: req.body.status || voice.status,
        description: req.body.description || voice.description,
        type: req.body.type || voice.type,
        ownerId: req.body.ownerId || voice.ownerId,
        twitterSearch: req.body.twitterSearch || voice.twitterSearch,
        rssUrl: req.body.rssUrl || voice.rssUrl,
        latitude: req.body.latitude || voice.latitude,
        longitude: req.body.longitude || voice.longitude
      });
      voice.save(function (err) {
        if (err) {
          res.render('voices/edit.hml', {errors: err});
        } else {
          res.redirect('/voice/' + voice.id);
        }
      });
    },

    destroy : function destroy (req, res) {
      var voice = req.activeVoice;
      voice.deleted = true;
      voice.save(function (err) {
        if (err) { return next(err); }
        res.redirect('/voices');
      });
    }
  }
});

module.exports = new VoicesController();
