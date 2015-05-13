var OrganizationsController = Class('OrganizationsController').inherits(RestfulController)({

  routesBlackList: /(signup|login|logout|user|organization|entity|dist)/,

  isBlackListed : function isBlackListed (path) {
    return path.match(this.routesBlackList) ? true : false;
  },

  prototype : {

    _initRouter : function() {
      application.router.route('/organizations').get(this.index);
      application.router.route('/organization').post(this.create);
      application.router.route('/organization/new').get(this.new);

      application.router.route('/:profile_name*').all(this.getOrganization);
      application.router.route('/:profile_name/edit').get(this.edit);
      application.router.route('/:profile_name').get(this.show);
      application.router.route('/:profile_name').put(this.update);
    },

    getOrganization : function getOrganization (req, res, next) {
      if (OrganizationsController.isBlackListed(req.path)) { next(); return; }

      Entity.find({
        type: 'organization',
        profile_name: req.params.profile_name
      }, function (err, result) {
        if (err) { next(err); return; }
        if (result.length === 0) { next(new Error('Not found')); return; }

        res.locals.organization = result[0];
        next();
      });
    },

    index : function index (req, res, next) {
      Entity.find({ type: 'organization' }, function (err, result) {
        if (err) { next(err); return; }
        res.render('organizations/index.html', {organizations: result});
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

      var org = new Entity(res.locals.organization);
      org.setProperties({
        name: req.body['name'],
        profileName: req.body['profileName'],
        isAnonymous: req.body['isAnonymous'] === "true" ? true : false
      });
      org.save(function (err) {
        if (err) {
          res.render('organizations/edit.html', {errors: err});
        } else {
          res.redirect('/' + org.profileName + '/edit');
        }
      });
    }

  }
});

module.exports = new OrganizationsController();
