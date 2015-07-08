module.exports = function(req, res, next) {
  if (CONFIG.enableRedis) {
    res.locals.csrfToken = req.csrfToken();
  }

  if (CONFIG.enablePassport) {

    res.locals.currentUser = req.user;

    // Sessions and cookie expire;
    if (req.isAuthenticated() && req.session.cookie.expires) {
      if ((Date.now() >  req.session.cookie.expires.getTime() )) {
        req.session.destroy(); // Session is expired
      } else {
        var expires;

        expires =  new Date(Date.now() + 3600000 * 24 * 365); //Add one more year

        req.session.cookie.expires = expires;

      }
    }
  }

  if (CONFIG.enableHashids) {
    res.locals.hashids = global.hashids;
  }

  req.session.backURL = req.header('Referrer') || '/';

  // Add currentPerson
  if (req.user) {
    var currentUser = new User(req.user);

    if (req.session.isAnonymous) {
      currentUser.entity(function(err, person) {
        if (err) {
          return next(err);
        }

        db('Entities')
          .where({id : db('EntityOwner').where('id', '=', currentUser.entityId).select('owned_id')})
          .andWhere('is_anonymous', '=', true)
          .andWhere('type', '=', 'person')
          .exec(function(err, result) {
            if (err) {
              return next(err);
            }

            var result = result[0]

            var shadowEntity = new Entity({
              id : result.id,
              name : result.name,
              lastname : result.lastname,
              profileName : person.profileName,
              isAnonymous : result.is_anonymous,
              createdAt : result.created_at,
              updatedAt : result.updated_at
            });

            res.locals.currentPerson = shadowEntity;
            req.currentPerson = shadowEntity;
            req.role = 'Anonymous';

            req.currentPerson.organizations = [];
            res.locals.currentPerson.organizations = [];

            return next();
          });
      })
    } else {
      currentUser.entity(function(err, entity) {
        if (err) {
          return next(err);
        }

        var person = new Entity(entity);

        person.id = hashids.decode(person.id)[0];

        person.organizations(function(err, organizations) {

          res.locals.currentPerson = entity;
          req.currentPerson = entity;

          res.locals.currentPerson.organizations = organizations;
          req.currentPerson.organizations = organizations;

          req.role = 'Person';

          var images = {};

          for (var version in person.imageMeta) {
            images[version] = {
              url : person.image.url(version),
              meta : person.image.meta(version)
            };
          }

          req.currentPerson.images = images;
          res.locals.currentPerson.images = images;

          var backgrounds = {};

          for (var version in person.backgroundMeta) {
            backgrounds[version] = {
              url : person.background.url(version),
              meta : person.background.meta(version)
            };
          }

          req.currentPerson.backgrounds = images;
          res.locals.currentPerson.backgrounds = images;

          return next();
        });
      });
    }

  } else {
    res.locals.currentPerson = null;
    req.currentPerson = null;
    req.role = 'Visitor'
    next();
  }

}
