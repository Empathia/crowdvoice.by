var VoicesPresenter = require(path.join(process.cwd(), '/presenters/VoicesPresenter.js'));

var EntitiesPresenter = require(path.join(process.cwd(), '/presenters/EntitiesPresenter.js'));

var SearchController = Class('SearchController')({
  prototype : {
    index : function(req, res, next) {
      var query = req.params.query;

      var response = {

        preview : {
          voices : [],
          people : [],
          organizations : []
        },
        full : {
          voices : [],
          people : [],
          organizations : []
        },
        totals : 0
      }

      async.series([function(done) {
        SearchController.prototype._searchVoices(query, req.currentPerson, function(err, result) {
          if (err) {
            return done(err);
          }

          response.preview.voices = result.slice(0, 3);
          response.full.voices = result;

          done();
        });
      }, function(done) {
        SearchController.prototype._searchPeople(query, req.currentPerson, function(err, result) {
          if (err) {
            return done(err);
          }

          response.preview.people = result.slice(0, 3);
          response.full.people = result;

          done();
        });
      }, function(done) {
        SearchController.prototype._searchOrganizations(query, req.currentPerson, function(err, result) {
          if (err) {
            return done(err);
          }

          response.preview.organizations = result.slice(0, 3);
          response.full.organizations = result;

          done();
        });
      }], function(err) {
        if (err) {
          return next(err);
        }

        response.totals = response.full.voices.length + response.full.people.length + response.full.organizations.length;

        res.format({
          html : function() {
            req.searchResults = response.full;
            res.locals.searchResults = response.full;

            res.render('search/index.html');
          },
          json : function() {
            delete response.full;

            res.json(response);
          }
        });
      });
    },

    _searchVoices : function _searchVoices(query, currentPerson, callback) {
      db.raw('SELECT * FROM ( \
        SELECT "Voices".*, \
        setweight(to_tsvector("Voices".title), \'A\') || \
        setweight(to_tsvector("Voices".description), \'B\') || \
        setweight(to_tsvector("Voices".location_name), \'C\') || \
        setweight(to_tsvector("Entities".name || "Entities".lastname), \'C\') \
        AS document \
        FROM "Voices" \
        JOIN "Entities" ON "Entities".id = "Voices".owner_id \
        WHERE "Voices".status = \'' + Voice.STATUS_PUBLISHED + '\') search \
        WHERE search.document @@ to_tsquery(\'*' + query + '*\') \
        ORDER BY ts_rank(search.document, to_tsquery(\'*' + query + '*\')) DESC;').exec(function(err, result) {
          if (err) {
            return callback(err);
          }

          result = Argon.Storage.Knex.processors[0](result.rows);

          VoicesPresenter.build(result, currentPerson, function(err, voices) {
            if (err) {
              return callback(err);
            }

            callback(null, voices);
          });
        });
    },

    _searchPeople : function _searchPeople(query, currentPerson, callback) {
      db.raw('SELECT * FROM ( \
        SELECT "Entities".*, \
        setweight(to_tsvector("Entities".name || "Entities".lastname), \'A\') || \
        setweight(to_tsvector("Entities".profile_name), \'B\') || \
        setweight(to_tsvector("Entities".description), \'C\') || \
        setweight(to_tsvector("Entities".location), \'D\') \
        AS document \
        FROM "Entities" \
        WHERE "Entities".is_anonymous = false AND "Entities".type = \'person\') search \
        WHERE search.document @@ to_tsquery(\'*' + query + '*\') \
        ORDER BY ts_rank(search.document, to_tsquery(\'*' + query + '*\')) DESC;').exec(function(err, result) {
          if (err) {
            return callback(err);
          }

          result = Argon.Storage.Knex.processors[0](result.rows);

          EntitiesPresenter.build(result, currentPerson, function(err, people) {
            if (err) {
              return callback(err);
            }

            callback(null, people);
          });
        });
    },

    _searchOrganizations : function _searchOrganizations(query, currentPerson, callback) {
      db.raw('SELECT * FROM ( \
        SELECT "Entities".*, \
        setweight(to_tsvector(concat("Entities".name, "Entities".lastname)), \'A\') || \
        setweight(to_tsvector("Entities".profile_name), \'B\') || \
        setweight(to_tsvector("Entities".description), \'C\') || \
        setweight(to_tsvector("Entities".location), \'D\') \
        AS document \
        FROM "Entities" \
        WHERE "Entities".is_anonymous = false AND "Entities".type = \'organization\') search \
        WHERE search.document @@ to_tsquery(\'*' + query + '*\') \
        ORDER BY ts_rank(search.document, to_tsquery(\'*' + query + '*\')) DESC;').exec(function(err, result) {
          if (err) {
            return callback(err);
          }

          result = Argon.Storage.Knex.processors[0](result.rows);

          EntitiesPresenter.build(result, currentPerson, function(err, organizations) {
            if (err) {
              return callback(err);
            }

            callback(null, organizations);
          });
        });
    }
  }
});

module.exports = new SearchController();
