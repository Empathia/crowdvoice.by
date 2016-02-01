var glob = require('glob');

glob.sync('lib/krypton/models/*.js').forEach(function (file) {
  logger.log('Loading ' + file + '...');
  var model = require(path.join(process.cwd(), file));
});

// Relations

logger.log('Defining Krypton models\' relations');

K.Entity.relations = {
  user: {
    type: 'HasOne',
    relatedModel: K.User,
    ownerCol: 'id',
    relatedCol: 'entity_id'
  },

  voices: {
    type: 'HasMany',
    relatedModel: K.Voice,
    ownerCol: 'id',
    relatedCol: 'owner_id'
  },

  listableVoices: {
    type: 'HasMany',
    relatedModel: K.Voice,
    ownerCol: 'id',
    relatedCol: 'owner_id',
    scope: ['Voices.status', '=', Voice.STATUS_PUBLISHED]
  },

  viewableVoices: {
    type: 'HasMany',
    relatedModel: K.Voice,
    ownerCol: 'id',
    relatedCol: 'owner_id',
    scope: ['Voices.status', 'in', [Voice.STATUS_PUBLISHED, Voice.STATUS_UNLISTED]]
  },

  organizations: {
    type: 'HasManyThrough',
    relatedModel: K.Entity,
    ownerCol: 'id',
    relatedCol: 'id',
    scope: ['Entities.type', '=', 'organization'],
    through: {
      tableName: 'EntityOwner',
      ownerCol: 'owner_id',
      relatedCol: 'owned_id',
      scope: null
    }
  },

  contributedVoices: {
    type: 'HasManyThrough',
    relatedModel: K.Voice,
    ownerCol: 'id',
    relatedCol: 'id',
    through: {
      tableName: 'VoiceCollaborator',
      ownerCol: 'collaborator_id',
      relatedCol: 'voice_id',
      scope: null
    }
  },

  memberOrganizations: {
    type: 'HasManyThrough',
    relatedModel: K.Entity,
    ownerCol: 'id',
    relatedCol: 'id',
    through: {
      tableName: 'EntityMembership',
      ownerCol: 'member_id',
      relatedCol: 'entity_id',
      scope: null
    }
  },

  followedVoices: {
    type: 'HasManyThrough',
    relatedModel: K.Voice,
    ownerCol: 'id',
    relatedCol: 'id',
    through: {
      tableName: 'VoiceFollowers',
      ownerCol: 'entity_id',
      relatedCol: 'voice_id',
      scope: null
    }
  },

  followedEntities: {
    type: 'HasManyThrough',
    relatedModel: K.Entity,
    ownerCol: 'id',
    relatedCol: 'id',
    through: {
      tableName: 'EntityFollower',
      ownerCol: 'follower_id',
      relatedCol: 'followed_id',
      scope: null
    }
  }
};

K.User.relations = {
  entity: {
    type: 'HasOne',
    relatedModel: K.Entity,
    ownerCol: 'entity_id',
    relatedCol: 'id'
  }
};

K.Slug.relations = {
  voice: {
    type: 'HasOne',
    relatedModel: Voice,
    ownerCol: 'voice_id',
    relatedCol: 'id'
  }
};

K.Voice.relations = {
  owner: {
    type: 'HasOne',
    relatedModel: K.Entity,
    ownerCol: 'owner_id',
    relatedCol: 'id'
  },

  slug: {
    type: 'HasOne',
    relatedModel: K.Slug,
    ownerCol: 'id',
    relatedCol: 'voice_id'
  },

  contributors: {
    type: 'HasManyThrough',
    relatedModel: K.Entity,
    ownerCol: 'id',
    relatedCol: 'id',
    through: {
      tableName: 'VoiceCollaborator',
      ownerCol: 'voice_id',
      relatedCol: 'collaborator_id',
      scope: null
    }
  },

  approvedPosts: {
    type: 'HasMany',
    relatedModel: K.Post,
    ownerCol: 'id',
    relatedCol: 'voice_id',
    scope: ['Posts.approved', '=', true]
  },

  unapprovedPosts: {
    type: 'HasMany',
    relatedModel: K.Post,
    ownerCol: 'id',
    relatedCol: 'voice_id',
    scope: ['Posts.approved', '=', false]
  },

  followers: {
    type: 'HasManyThrough',
    relatedModel: K.Entity,
    ownerCol: 'id',
    relatedCol: 'id',
    through: {
      tableName: 'VoiceFollowers',
      ownerCol: 'voice_id',
      relatedCol: 'entity_id',
      scope: null
    }
  },

  topics: {
    type: 'HasManyThrough',
    relatedModel: K.Topic,
    ownerCol: 'id',
    relatedCol: 'id',
    through: {
      tableName: 'VoiceTopic',
      ownerCol: 'voice_id',
      relatedCol: 'topic_id',
      scope: null
    }
  }
};

K.Topic.relations = {
  voices: {
    type: 'HasManyThrough',
    relatedModel: K.Voice,
    ownerCol: 'id',
    relatedCol: 'id',
    related: {
      tableName: 'VoiceTopic',
      ownerCol: 'topic_id',
      relatedCol: 'voice_id',
      scope: null
    }
  }
};

K.VoiceTopic.relations = {
  voice: {
    type: 'HasOne'
    relatedModel: K.Voice,
    ownerCol: 'voice_id',
    relatedCol: 'id'
  },

  topic: {
    type: 'HasOne',
    relatedModel: K.Topic,
    ownerCol: 'topic_id',
    relatedCol: 'id'
  }
};
