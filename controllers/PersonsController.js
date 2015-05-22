var PersonsController = Class('PersonsController').inherits(RestfulController)({
  prototype : {
    _initRouter : function() {
      application.router.route('/persons').get(this.index);
      application.router.route('/person').post(this.create);
      application.router.route('/person/new').get(this.new);

      application.router.route('/person/:id*').all(this.getPerson);
      application.router.route('/person/:id').get(this.show);
      application.router.route('/person/:id').put(this.update);
      application.router.route('/person/:id/edit').get(this.edit);

      application.router.route('/person/:id/follow').post(this.follow);
      application.router.route('/person/:id/voices').get(this.voices);
    },

    getPerson : function getPerson (req, res, next) {
      Entity.find({
        id: req.params.id,
        type: 'person'
      }, function (err, result) {
        if (err) { next(err); return; }
        if (result.length === 0) {
          res.status(404);
          res.render('shared/404.html');
          return;
        }

        res.locals.person = new Entity(result[0]);
        req.person = new Entity(result[0]);

        next();
      });
    },

    index : function index (req, res) {
      Entity.find({type:'person'}, function (err, result) {
        if (err) { next(err); return; }

        res.format({
          'text/html': function () {
            res.render('persons/index.html', {persons: result});
          },
          'application/json': function () {
            res.json(result);
          }
        });
      });
    },

    show : function show (req, res) {
      res.render('persons/show.html', {layout : false});
    },

    showByProfileName : function showByProfileName (req, res, next) {
      Entity.find({
        type: 'person',
        profile_name: req.params.profile_name
      }, function (err, result) {
        if (err) { next(err); return; }
        if (result.length === 0) {
          res.status(404);
          res.render('shared/404.html');
          return;
        }

        res.locals.person = new Entity(result[0]);
        req.person = new Entity(result[0]);
        res.render('persons/show.html');
      });
    },

    new : function (req, res) {
      res.render('persons/new.html');
    },

    create : function create (req, res) {
      var person = new Entity({
        name: req.body['name'],
        lastname: req.body['lastname'],
        profileName: req.body['profileName'],
        isAnonymous: req.body['isAnonymous'] === "true" ? true : false
      });
      person.type = 'person';
      person.save(function (err) {
        if (err) {
          res.render('persons/new.html', {errors: err});
        } else {
          res.redirect('/' + person.profileName);
        }
      });
    },

    edit : function edit (req, res) {
      res.render('persons/edit.html');
    },

    update : function update (req, res) {
      var person = req.person;
      person.setProperties({
        name: req.body['name'] || person.name,
        lastname: req.body['lastname'] || person.lastname,
        profileName: req.body['profileName'] || person.profileName,
      });
      if (typeof(req.body['isAnonymous']) !== 'undefined') {
        person.isAnonymous = (req.body['isAnonymous'] === "true") ? true : false
      }
      person.save(function (err) {
        if (err) {
          res.render('person/edit.html', {errors: err});
        } else {
          res.redirect('/person/' + person.id + '/edit');
        }
      });
    },

    follow : function follow (req, res, next) {
      var person = req.person, follower;

      Entity.find({ id: req.body.followAs }, function (err, result) {
        if (err) { next(err); return; }
        follower = new Entity(result[0]);

        // TODO: Check if follower is authorized to do this.
        follower.followEntity(person, function (err) {
          if (err) { next(err); }
          res.redirect('/' + person.profileName);
        });
      });
    },

    voices : function voices (req, res, next) {
      var person = req.person;
      Voice.find({owner_id: person.id}, function (err, result) {
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

module.exports = new PersonsController();
