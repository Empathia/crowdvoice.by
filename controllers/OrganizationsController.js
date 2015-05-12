var OrganizationsController = Class('OrganizationsController').inherits(RestfulController)({

  prototype : {
    _initRouter : function() {
      application.router.route('/{profile_name}*').all(this.getOrganization);
      RestfulController.prototype._initRouter.apply(this, arguments);
    },

    getOrganization : function getOrganization (req, res, next) {
      Entity.find({
        type: 'organization',
        profileName: req.params.profile_name
      }, function (err, result) {
        if (err) { next(err); return; }
        if (result.length === 0) { next(new Error('Not found')); return; }

        req.organization = result[0];
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
      res.render('organizations/show.html', {organization: req.organization});
    },

    edit : function edit (req, res, next) {
      res.render('organizations/edit.html', {organization: req.organization});
    },

    create : function show (req, res, next) {
      var org = new Entity(req.body);
      org.type = 'organization';
      org.save(function (err) {
        if (err) { next(err); return; }
        res.render('organizations/new.html');
      });
    },

    edit : function edit(req, res) {
      res.render('organizations/edit.html', {layout : false});
    },

    update : function update (req, res, next) {
      var org = req.organization;
      org.setProperties(req.body);
      org.save(function (err) {
        if (err) { next(err); return; }
        res.redirect('/' + org.profileName + '/edit');
      });
    }

  }
});

module.exports = new OrganizationsController();
