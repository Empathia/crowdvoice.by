var Voice = Class('Voice').inherits(Argon.KnexModel)({

  STATUS_DRAFT:     'STATUS_DRAFT',
  STATUS_UNLISTED:  'STATUS_UNLISTED',
  STATUS_PUBLISHED: 'STATUS_PUBLISHED',

  TYPE_PUBLIC:      'TYPE_PUBLIC',
  TYPE_CLOSED:      'TYPE_CLOSED',

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
    tableName : 'Voices'
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

    /**
    Has Many Posts Association
    @method posts <public>
    @property whereClause <Object> {'voice_id' : 1, approved : true}
    @return undefined
    **/
    posts : function posts(whereClause, callback) {
      var model = this;

      if (!model.id) {
        return callback(null, []);
      }

      if (!whereClause) {
        whereClause = {}
      }

      whereClause['voice_id'] = model.id;

      Post.find(whereClause, callback);
    }
  }
});

module.exports = Voice;
