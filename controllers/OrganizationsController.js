var OrganizationsController = Class('OrganizationsController').inherits(RestfulController)({

  routesBlackList: /(signup|login|logout|user|organization|entity|dist|session)/,

  isBlackListed : function isBlackListed (path) {
    return path.match(this.routesBlackList) ? true : false;
  },

  prototype : {

    _initRouter : function () {
      application.router.route('/organizations').get(this.index);
      application.router.route('/organization').post(this.create);
      application.router.route('/organization/new').get(this.new);

      application.router.route('/:profile_name*').all(this.getOrganization);
      application.router.route('/:profile_name/edit').get(this.edit);
      application.router.route('/:profile_name').get(this.show);
      application.router.route('/:profile_name').put(this.update);

      application.router.route('/:profile_name/follow').post(this.follow);
      application.router.route('/:profile_name/invite').post(this.invite);
      application.router.route('/:profile_name/voices').get(this.voices);
    },

    getOrganization : function getOrganization (req, res, next) {
      if (OrganizationsController.isBlackListed(req.path)) { next(); return; }

      Entity.find({
        type: 'organization',
        profile_name: req.params.profile_name
      }, function (err, result) {
        if (err) { next(err); return; }
        if (result.length === 0) { 
          res.status(404);
          res.render('shared/404.html');
          return;
        }

        res.locals.organization = new Entity(result[0]);
        req.organization = new Entity(result[0]);

        // Filter sensitive data
        res.locals.organization
        delete(res.locals.organization.id);

        next();
      });
    },

    index : function index (req, res, next) {
      Entity.find({ type: 'organization' }, function (err, result) {
        if (err) { next(err); return; }

        // Filter sensitive data
        result.forEach(function (org) {
          delete(org.id);
        });

        res.format({
          'text/html': function () {
            res.render('organizations/index.html', {organizations: result});
          },
          'application/json': function () {
            res.json(result);
          }
        });
      });
    },

    show : function show (req, res, next) {
      if (OrganizationsController.isBlackListed(req.path)) { next(); return; }
      res.render('organizations/show.html');
    },

    edit : function edit (req, res, next) {
      if (OrganizationsController.isBlackListed(req.path)) { next(); return; }
      res.render('organizations/edit.html', {errors: null});
    },

    new : function (req, res, next) {
      res.render('organizations/new.html', {errors:null});
    },

    create : function show (req, res, next) {
      var org = new Entity({
        name: req.body['name'],
        profileName: req.body['profileName'],
        isAnonymous: req.body['isAnonymous'] === "true" ? true : false
      });
      org.type = 'organization';
      org.save(function (err) {
        if (err) {
          res.render('organizations/new.html', {errors: err});
        } else {
          res.redirect('/' + org.profileName);
        }
      });
    },

    update : function update (req, res, next) {
      if (OrganizationsController.isBlackListed(req.path)) { next(); return; }

      var org = req.organization;
      org.setProperties({
        name: req.body['name'] || org.name,
        profileName: req.body['profileName'] || org.profileName,
      });
      if (typeof(req.body['isAnonymous']) !== 'undefined') {
        org.isAnonymous = (req.body['isAnonymous'] === "true") ? true : false
      }
      org.save(function (err) {
        if (err) {
          res.render('organizations/edit.html', {errors: err});
        } else {
          res.redirect('/' + org.profileName + '/edit');
        }
      });
    },

    follow : function follow (req, res, next) {
      var org = req.organization, follower;
      var afterFollow = function (err) {
        if (err) { next(err); }
        res.redirect('/' + org.profileName);
      };

      Entity.find({ id: req.body.followAs }, function (err, result) {
        if (err) { next(err); return; }
        follower = new Entity(result[0]);

        if (follower.id !== req.user.entityId) {
          follower.owner(function (err, owner) {
            if (err) { next(err); return; }
            if (owner.id !== req.user.entityId) {
              next(new Error('Cannot follow because entity does not belong to user.'));
            } else {
              follower.followEntity(org, afterFollow);
            }
          });
        } else {
          follower.followEntity(org, afterFollow);
        }
      });
    },

    invite : function invite (req, res, next) {
      var org = req.organization, entity;
      Entity.find({id: req.body.entityId}, function (err, result) {
        if (err) { next(err); return; }
        if (result.length === 0) { next(new Error('Not found')); return; }

        entity = result[0];
        org.inviteEntity(entity, function (err) {
          if (err) { next(err); return; }
          res.redirect('/' + org.profileName);
        });
      });
    },

    voices : function voices (req, res, next) {
      var org = req.organization;
      Voice.find({owner_id: org.id}, function (err, result) {
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

module.exports = new OrganizationsController();
