var _ = require('underscore')

K.Entity = Class(K, 'Entity').inherits(Krypton.Model)({
  tableName: 'Entities',

  attributes: [
    'id',
    'type',
    'name',
    'lastname',
    'profileName',
    'isAnonymous',
    'isAdmin',
    'description',
    'location',
    'imageBaseUrl',
    'imageMeta',
    'backgroundBaseUrl',
    'backgroundMeta',
    'createdAt',
    'updatedAt',
    'deleted'
  ],

  prototype: {
    getAnonymousEntity: function () {
      var that = this

      return new Promise(function (res, rej) {
        if (!that.id) {
          return rej(new Error('K.Entity doesn\'t have an ID.'))
        }

        K.Entity.query()
          .select('*')
          .from('Entities')
          .leftJoin('EntityOwner', 'Entities.id', '=', 'EntityOwner.owned_id')
          .where('Entities.is_anonymous', '=', true)
          .andWhere('EntityOwner.owner_id', '=', that.id)
          .then(res)
      })
    },

    getOwner: function () {
      var that = this

      return new Promise(function (res, rej) {
        if (!that.id) {
          return rej(new Error('K.Entity doesn\'t have an ID.'))
        }

        K.Entity.query()
          .select('*')
          .from('Entities')
          .leftJoin('EntityOwner', 'Entities.id', '=', 'EntityOwner.owner_id')
          .where('Entities.type', '=', 'person')
          .andWhere('EntityOwner.owned_id', '=', that.id)
          .then(res)
      })
    },

    getRealEntity: function () {
      return this.getOwner()
    },

    isOwnerOfEntity: function (entity) {
      var that = this

      return new Promise(function (res, rej) {
        if (!that.id) {
          return rej(new Error('K.Entity doesn\'t have an ID.'))
        }

        K.EntityOwner.query()
          .where('owner_id', '=', that.id)
          .andWhere('owned_id', '=', entity.id)
          .then(function (rows) {
            return res((rows.length > 0))
          })
      })
    },

    isOwnerOfVoice: function (voice) {
      var that = this

      return new Promise(function (res, rej) {
        if (!that.id) {
          return rej(new Error('K.Entity doesn\'t have an ID.'))
        }

        K.Voice.query()
          .where('owner_id', '=', that.id)
          .andWhere('id', '=', voice.id)
          .then(function (rows) {
            return res((rows.length > 0))
          })
      })
    },

  }
})

module.exports = new K.Entity()
