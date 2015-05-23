var EntitiesController = Class('EntitiesController')({
  routesWhiteList: /^\/(person|people|signup|login|logout|user|organization|entity|dist|session)(es|s|$|\/)/,

  isWhiteListed : function isWhiteListed (path) {
    return path.match(this.routesWhiteList) ? true : false;
  },

  prototype : {
    init : function () {
      this._initRouter();
      return this;
    },

    _initRouter : function () {
      application.router.route('/:profile_name')
        .get(this.showRouter);
    },

    // This is the only method exclusive of EntitiesController
    showRouter : function (req, res, next) {
      if (EntitiesController.isWhiteListed(req.path)) {
        return next();
      }

      Entity.find({
        profile_name: req.params.profile_name
      }, function (err, result) {
        if (err) { next(err); return; }
        if (result.length === 0) { next(new Error('Not found')); return; }

        var entity = result[0];
        req.entityType = entity.type;
        EntitiesController.prototype.showByProfileName(req, res, next);
      });
    },

    getEntity : function getEntity (req, res, next) {
      var controller = this;

      Entity.find({
        id: req.params.id,
        type: req.entityType
      }, function (err, result) {
        if (err) { next(err); return; }
        if (result.length === 0) {
          res.status(404);
          res.render('shared/404.html');
          return;
        }

        res.locals[req.entityType] = new Entity(result[0]);
        req.entity = new Entity(result[0]);

        next();
      });
    },

    index : function index (req, res) {
      var controller = this;
      Entity.find({type:req.entityType}, function (err, result) {
        if (err) { next(err); return; }

        res.format({
          'text/html': function () {
            res.locals[inflection.pluralize(req.entityType)] = result;
            res.render(req.entityType + '/index.html', {});
          },
          'application/json': function () {
            res.json(result);
          }
        });
      });
    },

    show : function show (req, res) {
      var controller = this;
      res.render(inflection.pluralize(req.entityType) + '/show.html', {layout : false});
    },

    showByProfileName : function showByProfileName (req, res, next) {
      var controller = this;
      Entity.find({
        type: req.entityType,
        profile_name: req.params.profile_name
      }, function (err, result) {
        if (err) { next(err); return; }
        if (result.length === 0) {
          res.status(404);
          res.render('shared/404.html');
          return;
        }

        res.locals[req.entityType] = new Entity(result[0]);
        req.entity = new Entity(result[0]);
        res.render(inflection.pluralize(req.entityType) + '/show.html');
      });
    },

    new : function (req, res) {
      res.render(inflection.pluralize(req.entityType) + '/new.html', {errors: null});
    },

    create : function create (req, res) {
      var controller = this;
      var entity = new Entity({
        name: req.body['name'],
        lastname: req.body['lastname'],
        profileName: req.body['profileName'],
        isAnonymous: req.body['isAnonymous'] === "true" ? true : false
      });
      entity.type = req.entityType;
      entity.save(function (err) {
        if (err) {
          res.render(req.entityType + '/new.html', {errors: err});
        } else {
          res.redirect('/' + entity.profileName);
        }
      });
    },

    edit : function edit (req, res) {
      res.render(inflection.pluralize(req.entityType) + '/edit.html', {errors: null});
    },

    update : function update (req, res) {
      var controller = this;
      var entity = req.entity;
      entity.setProperties({
        name: req.body['name'] || entity.name,
        lastname: req.body['lastname'] || entity.lastname,
        profileName: req.body['profileName'] || entity.profileName,
      });
      if (typeof(req.body['isAnonymous']) !== 'undefined') {
        entity.isAnonymous = (req.body['isAnonymous'] === "true") ? true : false
      }
      entity.save(function (err) {
        if (err) {
          res.render(req.entityType + '/edit.html', {errors: err});
        } else {
          res.redirect('/' + req.entityType + '/' + entity.id + '/edit');
        }
      });
    },

    follow : function follow (req, res, next) {
      var controller = this;
      var entity = req.entity, follower;

      Entity.find({ id: req.body.followAs }, function (err, result) {
        if (err) { next(err); return; }
        follower = new Entity(result[0]);

        // TODO: Check if follower is authorized to do this.
        follower.followEntity(entity, function (err) {
          if (err) { next(err); }
          res.redirect('/' + entity.profileName);
        });
      });
    },

    voices : function voices (req, res, next) {
      var controller = this;
      var entity = req.entity;
      Voice.find({owner_id: entity.id}, function (err, result) {
        if (err) { next(err); return; }

        // Filter hidden info.
        result.forEach(function (voice) {
          delete(voice.ownerId);
        });

        res.format({
          'application/json': function () {
            res.send(result);
          },
          'text/html': function () {
            next(new Error('Not found'));
          }
        });
      });
    }
  }
});

module.exports = new EntitiesController();
