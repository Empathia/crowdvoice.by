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

    isOwnerOfEntities: function (entities) {
      var that = this

      return new Promise(function (res, rej) {
        if (!that.id) {
          return rej(new Error('K.Entity doesn\'t have an ID.'))
        }

        K.EntityOwner.query()
          .where('owned_id', 'in', entities.map(function (e) { return e.id }))
          .then(function (rows) {
            if (entities.length === rows.length) {
              return res(rows.map(function (e) {
                return (e.ownerId === that.id)
              }))
            } else {
              // Need to apply special logic, some of these don't have an owner
              var result = []

              entities.forEach(function (e) {
                result.push(_.contains(rows.map(function (r) {
                  return r.ownedId
                }), e.id))
              })

              return res(result)
            }
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

    isOwnerOfVoices: function (voices) {
      var that = this

      return new Promise(function (res, rej) {
        if (!that.id) {
          return rej(new Error('K.Entity doesn\'t have an ID.'))
        }

        K.Voice.query()
          .where('id', 'in', voices.map(function (v) { return v.id }))
          .then(function (rows) {
            return res(rows.map(function (v) {
              return (v.ownerId === that.id)
            }))
          })
      })
    }

  }
})

module.exports = new K.Entity()
