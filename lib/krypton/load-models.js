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
