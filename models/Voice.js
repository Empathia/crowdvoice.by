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

  findByOwnerId : function findByOwnerId (ownerId, callback) {
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

  filterBy : function filterBy (query, done) {
    var model = this;
    var kxquery = db('Voices');
    var i;

    for (i = 0; i < this.storage.preprocessors.length; i++) {
      query = this.storage.preprocessors[i](query);
    }

    Object.keys(query).forEach(function (key) {
      switch (key) {
        case 'topics':
          kxquery.leftJoin('VoiceTopic', 'VoiceTopic.voice_id', 'Voices.id');
          kxquery.leftJoin('Topics', 'VoiceTopic.topic_id', 'Topics.id');
          kxquery.whereIn('Topics.name', query[key]);
          break;
        case 'created_after':
          kxquery.whereRaw("created_at >= DATE '" + (new Date(query[key])).toISOString() + "'");
          break;
        case 'created_before':
          kxquery.whereRaw("created_at <= DATE '" + (new Date(query[key])).toISOString() + "'");
          break;
        case 'trending':
          if (query[key]) {
            kxquery.orderBy('post_count', 'desc');
          }
          break;
        default:
          kxquery.where(key, '=', query[key]);
      }
    });

    kxquery.exec(function(err, data) {
      for (i = 0; i < model.storage.processors.length; i++) {
        data = model.storage.processors[i](data);
      }

      return done(err, data);
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
    },

    /**
     * Relates topics to this voice
     */
    addTopics : function (topics, done) {
      var voice = this;
      topics.forEach(function (topic) {
        Topic.find({name: topic}, function (err, result) {
          if (err) { done(err); return; }
          if (result.length === 0) { done(new Error('Topic (' + topic + ') not found when adding topics to voice')); return; }

          db('VoiceTopic').insert({
            voice_id: voice.id,
            topic_id: result[0].id
          }).exec(function (err, result) {
            done(err);
          });
        });
      });
    },
  }
});

module.exports = Voice;
