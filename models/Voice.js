var Voice = Class('Voice').inherits(Argon.KnexModel).includes(ImageUploader)({

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
      if (!query[key]) { return; };
      switch (key) {
        case 'topics':
          kxquery.leftJoin('VoiceTopic', 'VoiceTopic.voice_id', 'Voices.id');
          kxquery.leftJoin('Topics', 'VoiceTopic.topic_id', 'Topics.id');
          kxquery.whereIn('Topics.name', query[key]);
          break;
        case 'created_after':
          kxquery.whereRaw("created_at >= '" + moment(new Date(query[key]).toISOString()).format() + "'");
          break;
        case 'created_before':
          kxquery.whereRaw("created_at <= '" + moment(new Date(query[key]).toISOString()).format() + "'");
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

  findBySlug : function findBySlug (slugString, done) {
    Slug.find(["url = lower(trim( ' ' from ?))", [slugString]], function (err, result) {
      if (err) { done(err); return; }

      if (result.length === 0) { done(new NotFoundError('Voice not found')); }

      var slug = new Slug(result[0]);

      slug.voice(function (err, result) {
        done(err, new Voice(result));
      });
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
    createdAt : null,
    updatedAt : null,

    init : function (config) {
      var model = this;
      Argon.KnexModel.prototype.init.call(this, config);

      // Add image attachment
      this.hasImage({
        propertyName: 'background',
        versions: {
          card: function (readStream) {
            return readStream.pipe(sharp().resize(340));
          },
          bluredCard: function (readStream) {
            return gm(readStream.pipe(sharp().resize(340))).gaussian(5, 5).stream();
          },
          big: function (readStream) {
            return gm(readStream.pipe(sharp().resize(2560,1113))).gaussian(10, 10).stream();
          }
        },
        bucket: 'crowdvoice.by',
        basePath: '{env}/{modelName}_{id}/{property}_{versionName}.{extension}'
      });
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

    toJSON : function toJSON() {
      var model = this;
      var json = {};

      Object.keys(this).forEach(function(property) {
        if (property === 'id' || property === 'ownerId') {
          json[property] = hashids.encode(model[property]);
        } else {
          json[property] = model[property];
        }
      });

      return json;
    },

    getSlug : function () {
      return this.title.toLowerCase().replace(/ /g, '_');
    },

    /* Add slug for a voice.
     * Makes sure there only exist maximum of 3 slugs per voice.
     */
    addSlug : function (slugString, done) {
      if (typeof(slugString) === 'function') {
        done = slugString;
        slugString = this.getSlug();
      }

      var voice = this;
      var slug = new Slug({
        voiceId : voice.id,
        url: slugString
      });
      slug.save(function (err) {
        if (err) { done (err); return; }
        var subquery = db('Slugs');
        subquery.where({voice_id: voice.id});
        subquery.select('id');
        subquery.orderBy('created_at', 'desc');
        subquery.limit(3);

        subquery.exec(function () {
          console.log(arguments);
        });

        var query = db('Slugs');
        query.where({voice_id: voice.id});
        query.where('id', 'not in', subquery);
        query.del();
        query.exec(done);
      });
    }
  }
});

module.exports = Voice;
