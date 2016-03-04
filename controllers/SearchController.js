var SearchController = Class('SearchController')({
  prototype : {
    index : function(req, res, next) {
      var query = req.params.query;

      // query = query.replace(/[^A-Za-z0-9\p{L}\p{Nd}]+/g, ' | ');
      //
      // if (query.substr(0, 3) === ' | ') {
      //   query = query.substr(3, query.length);
      // }
      //
      // if (query.substr(query.length - 3, query.length) === ' | ') {
      //   query = query.substr(0, query.length - 3);
      // }

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
        SearchController.prototype._searchVoices(query, [], req.currentPerson, function(err, result) {
          if (err) {
            return done(err);
          }

          response.preview.voices = result.slice(0, 3);
          response.full.voices = result;

          done();
        });
      }, function(done) {
        SearchController.prototype._searchPeople(query, [], req.currentPerson, function(err, result) {
          if (err) {
            return done(err);
          }

          response.preview.people = result.slice(0, 3);
          response.full.people = result;

          done();
        });
      }, function(done) {
        SearchController.prototype._searchOrganizations(query, [], req.currentPerson, function(err, result) {
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
            res.locals.totals = response.totals;
            res.locals.searchQuery = query.replace(/\|/g, '');

            res.render('search/index.html');
          },
          json : function() {
            delete response.full;

            res.json(response);
          }
        });
      });
    },

    searchVoices : function searchVoices(req, res, next) {
      var query = req.body.query;
      var exclude = req.body.exclude || [];

      SearchController.prototype._searchVoices(query, exclude, req.currentPerson, function(err, result) {
        if (err) { return next(err); }

        res.json({voices : result});
      });
    },

    searchPeople : function (req, res, next) {
      var query = req.body.query;
      var exclude = req.body.exclude;

      if (!exclude) {
        exclude = [];
      }

      SearchController.prototype._searchPeople(query, null, exclude, function(err, result) {
        if (err) {
          return next(err);
        }

        res.json({people : result});
      });
    },

    searchOrganizations : function (req, res, next) {
      var query = req.body.query;
      var exclude = req.body.exclude;

      if (!exclude) {
        exclude = [];
      }

      SearchController.prototype._searchOrganizations(query, exclude, req.currentPerson, function(err, result) {
        if (err) {
          return next(err);
        }

        res.json({organizations : result});
      });
    },

    _searchVoices : function _searchVoices(queryString, whereQuery, excludeIds, callback) {
      var searchQuery = '%' + queryString.toLowerCase().trim() + '%';

      var dbQuery = K.Voice.query()
        .select('Voices.*')
        .join('Entities', 'Entities.id', 'Voices.owner_id')
        .where('Voices.title', 'ilike', searchQuery)
        .orWhere('Voices.description', 'ilike', searchQuery)
        .orWhere('Voices.location_name', 'ilike', searchQuery)
        .orWhere('Entities.name', searchQuery)
        .andWhere('Voices.status', K.Voice.STATUS_PUBLISHED)
        .andWhere('Voices.deleted', false);

      if (whereQuery) {
        dbQuery.andWhere(whereQuery)
      }

      if (excludeIds.length > 0) {
        dbQuery.andWhere('Voices.id', 'not in', excludeIds)
      }

      dbQuery
        .then(function (result) {
          return K.VoicesPresenter.build(result, null);
        })
        .then(function (pres) {
          return callback(null, pres);
        })
        .catch(callback);
    },

    _searchPeople : function (query, exclude, currentPerson, callback) {
      var searchQuery = query.toLowerCase().trim();

      K.Entity.query()
      .where({
        is_anonymous : false,
        type : 'person',
        deleted : false
      })
      .andWhere(function() {
        this.whereRaw('name ilike ? OR profile_name ilike ? OR description ilike ? OR location ilike ?', ['%' + searchQuery + '%', '%' + searchQuery + '%', '%' + searchQuery + '%', '%' + searchQuery + '%'])
      })
      .then(function(result) {
        EntitiesPresenter.build(result, currentPerson, function(err, people) {
          if (err) {
            return callback(err);
          }

          if (exclude.length > 0) {
            people = people.filter(function(item) {
              if (exclude.indexOf(item.id) === -1) {
                return true;
              }
            });
          }

          callback(null, people);
        });
      });
    },

    _searchOrganizations : function _searchOrganizations(query, exclude, currentPerson, callback) {
      var searchQuery = query.toLowerCase().trim();

      K.Entity.query()
      .where({
        is_anonymous : false,
        type : 'organization',
        deleted : false
      })
      .andWhere(function() {
        this.whereRaw('name ilike ? OR profile_name ilike ? OR description ilike ? OR location ilike ?', ['%' + searchQuery + '%', '%' + searchQuery + '%', '%' + searchQuery + '%', '%' + searchQuery + '%'])
      })
      .then(function(result) {
        EntitiesPresenter.build(result, currentPerson, function(err, people) {
          if (err) {
            return callback(err);
          }

          if (exclude.length > 0) {
            people = people.filter(function(item) {
              if (exclude.indexOf(item.id) === -1) {
                return true;
              }
            });
          }

          callback(null, people);
        });
      });
    }
  }
});

module.exports = new SearchController();
