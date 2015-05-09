var Voice = Class('Voice').inherits(Argon.KnexModel)({

  validations : {
    ownerId : ['required'],
    title : [
      'required',
      {
        rule: function (val) {
          if (val && val.length > 512) {
            throw new Checkit.FieldError('The title must be less than 512 characters.')
          }
        },
        message: 'The title must be less than 512 characters.'
      }
    ],
    twitterSearch : [
      {
        rule: function (val) {
          if (val && val.length > 512) {
            throw new Checkit.FieldError('The Tweeter Search String (twitterSearch) must be less than 512 characters.')
          }
        },
        message: 'The Tweeter Search String (twitterSearch) must be less than 512 characters.'
      }
    ],
    rssUrl : [
      {
        rule: function (val) {
          if (val && val.length > 512) {
            throw new Checkit.FieldError('The RSS URL (rssUrl) must be less than 512 characters.')
          }
        },
        message: 'The RSS URL (rssUrl) must be less than 512 characters.'
      }
    ]
  },

  storage : (new Argon.Storage.Knex({
    tableName : 'Voices',
    queries : {
      findPosts : function(requestObj, callback) {
        switch (requestObj.clauseType) {
          case 'where':
            db(requestObj.model.storage.tableName).where(requestObj.params).andWhere('voice_id', requestObj.voiceId).exec(callback);
            break;
          case 'whereRaw':
            db(requestObj.model.storage.tableName).whereRaw(requestObj.params[0], requestObj.params[1]).andWhere('voice_id', requestObj.voiceId).exec(callback);
            break;
          default:
            db(requestObj.model.storage.tableName).where('voice_id', requestObj.voiceId).exec(callback)
        }
      }
    }
  })),

  findByOwnerId : function findByOwnerId(ownerId, callback) {
    var Model, request;

    Model = this;

    request = {
      action : 'findByOwnerId',
      model : Model,
      params : {
        'owner_id' : ownerId
      }
    };

    this.dispatch('beforeFindByOwnerId');

    this.storage.findById(request, function(err, data) {
      callback(err, data);
      Model.dispatch('afterFindByOwnerId');
    });
  },

  prototype : {
    id : null,
    title : null,
    description : '',
    latitude : null,
    longitude : null,
    locationName : null,
    ownerId : null,
    status : null,
    type : null,
    twitterSearch : null,
    tweetLastFetchAt : null,
    rssUrl : null,
    rssLastFetchAt : null,
    firstPostDate : null,
    lastPostDate : null,
    postCount : 0,
    createdAt : null,
    updatedAt : null,


    updatePostCount : function updatePostCount(param, callback) {
      if (param) {
        this.postCount++;
      } else {
        this.postCount--;
      }

      this.save(callback);
    },

    // Has Many Posts Association
    posts : function posts(whereClause, callback) {
      var model = this;

      if (!model.id) {
        return [];
      }

      var request = {
        action : 'findPosts',
        voiceId : model.id
      }

      switch (whereClause.constructor) {
        case Object:
          request.clauseType = 'where';
          break;
        case Array:
          if (whereClause.length === 2) {
            request.clauseType = 'whereRaw';
          }
          break;
      }

      request.params = whereClause;

      this.constructor.dispatch('beforeFindPosts');

      this.constructor.storage.findPosts(request, function(err, data) {
        callback(err, data);
        model.constructor.dispatch('afterFindPosts');
      });
    }
  }
});

module.exports = Voice;
