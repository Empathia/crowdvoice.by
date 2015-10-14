var EntitiesPresenter = require(path.join(process.cwd(), '/presenters/EntitiesPresenter.js'));

var VoicesPresenter = require(path.join(process.cwd(), '/presenters/VoicesPresenter.js'));

module.exports = function(req, res, next) {
  if (CONFIG.enableRedis) {
    res.locals.csrfToken = req.csrfToken();
  }

  if (CONFIG.enablePassport) {

    res.locals.currentUser = req.user;

    // Sessions and cookie expire;
    if (req.isAuthenticated() && req.session.cookie.expires) {
      if ((Date.now() >  req.session.cookie.expires.getTime())) {
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
      currentUser.shadow(function(err, shadowEntity) {
        if (err) {
          return next(err);
        }

        currentUser.entity(function(err, entity) {
          if (err) {
            return next(err);
          }

          EntitiesPresenter.build([shadowEntity], entity, function(err, presenterResult) {
            if (err) {
              return next(err);
            }

            res.locals.currentPerson = presenterResult[0];
            req.currentPerson = presenterResult[0];

            req.role = 'Anonymous';

            async.series([
              // .ownedOrganizations, always empty
              function (next) {
                res.locals.currentPerson.ownedOrganizations = [];
                req.currentPerson.ownedOrganizations = [];

                return next();
              },

              // .organizations
              function (next) {
                Entity.findById(currentUser.entityId, function (err, currentPerson) {
                  EntityMembership.find({
                    member_id: currentPerson[0].id,
                    is_anonymous: true,
                  }, function (err, members) {
                    if (err) { console.log(err); return next(err); }

                    var ids = members.map(function (record) {
                      return record.entityId;
                    });

                    Entity.whereIn('id', ids, function (err, organizations) {
                      if (err) { return next(err); }

                      EntitiesPresenter.build(organizations, null, function (err, presented) {
                        if (err) { return next(err); }

                        res.locals.currentPerson.organizations = presented;
                        req.currentPerson.organizations = presented;

                        return next();
                      });
                    });
                  });
                });
              },
            ], next);
          });
        });
      });
    } else {
      currentUser.entity(function(err, entity) {
        if (err) {
          return next(err);
        }

        req.role = 'Person';

        var person = new Entity(entity);

        person.id = hashids.decode(person.id)[0];

        if (person.isAdmin === true) {
          req.role = 'Admin';
        }

        EntitiesPresenter.build([person], entity, function(err, presenterResult) {
          if (err) {
            return next(err);
          }

          presenterResult = presenterResult[0];

          res.locals.currentPerson = presenterResult;
          req.currentPerson = presenterResult;

          async.series([function(done) {

            // Get organizations owned by currentPerson or that currentPerson is member of
            person.organizations(function(err, organizations) {
              if (err) {
                return done(err);
              }

              organizations.forEach(function(organization) {
                organization.id = hashids.decode(organization.id)[0];
              });

              EntitiesPresenter.build(organizations, entity, function(err, result) {
                if (err) {
                  return done(err);
                }

                res.locals.currentPerson.organizations = result;
                req.currentPerson.organizations = result;

                done();
              });
            });
          }, function(done) {

            // Get Voices of type TYPE_CLOSED that are owned by currentPerson
            Voice.find({
              owner_id : person.id,
              status : Voice.STATUS_PUBLISHED,
              type : Voice.TYPE_CLOSED
            }, function(err, result) {
              if (err) {
                return done(err);
              }

              VoicesPresenter.build(result, entity, function(err, voices) {
                if (err) {
                  return done(err);
                }

                req.currentPerson.closedVoices = voices;
                res.locals.currentPerson.closedVoices = voices;

                return done();
              });
            });
          }, function(done) {

            // Get Voices Count of status STATUS_PUBLISHED;
            db('Voices').count('*').where({
              'owner_id' : person.id,
              status : Voice.STATUS_PUBLISHED
            }).exec(function(err, result) {
              if (err) {
                return done(err);
              }

              req.currentPerson.voicesCount = parseInt(result[0].count, 10);
              res.locals.currentPerson.voicesCount = parseInt(result[0].count, 10);

              return done();
            });

          }, function(done) {

            // Get the names of the voices owned and published
            Voice.find({
              owner_id: person.id,
              status: Voice.STATUS_PUBLISHED
            }, function (err, voices) {
              if (err) { return done(err); }

              async.map(voices, function (voice, next) {
                next(null, {
                  id: hashids.encode(voice.id),
                  name: voice.title
                });
              }, function (err, voiceTitles) {
                if (err) { return done(err); }

                res.locals.currentPerson.voiceNames = voiceTitles;
                req.currentPerson.voiceNames = voiceTitles;

                done();
              });
            });
          }, function (done) {
            // Get Voices owned directly by user or owned by organizations that
            // user is owner of

            person.ownedOrganizations(function (err, organizations) {
              if (err) { return done(err); }

              // get org IDs
              var ids = organizations.map(function (org) { return org.id });
              // get currentPerson ID
              ids.push(person.id);

              Voice.whereIn('owner_id', ids, function (err, voices) {
                if (err) { return done(err); }

                var result = voices.map(function (voice) { return hashids.encode(voice.id); });

                res.locals.currentPerson.ownedVoices = result;
                req.currentPerson.ownedVoices = result;

                return done();
              });
            });
          }, function(done) {

            // Get Organizations owned by currentUser

            person.ownedOrganizations(function(err, organizations) {
              EntitiesPresenter.build(organizations, entity, function(err, result) {
                if (err) {
                  return done(err);
                }

                res.locals.currentPerson.ownedOrganizations = result;
                req.currentPerson.ownedOrganizations = result;

                done();
              });
            })
          }], function(err) {
            if (err) {
              return next(err);
            }

            req.session.currentPerson = req.currentPerson;

            next();
          });
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
