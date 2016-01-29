var glob = require('glob');

glob.sync('lib/krypton/models/*.js').forEach(function (file) {
  logger.log('Loading ' + file + '...');
  var model = require(path.join(process.cwd(), file));
});

// Relations

logger.log('Defining Krypton models\' relations');

K.Entity.relations = {
  voices: {
    type: 'HasMany',
    relatedModel: K.Voice,
    ownerCol: 'id',
    relatedCol: 'owner_id'
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
};

K.User.relations = {
  entity: {
    type: 'HasOne',
    relatedModel: K.Entity,
    ownerCol: 'entity_id',
    relatedCol: 'id'
  }
};
