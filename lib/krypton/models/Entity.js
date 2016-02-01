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
          .catch(rej)
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
          .catch(rej)
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
          .catch(rej)
      })
    },

    hasAccessToVoice: function (voice) {
      var that = this

      return new Promise(function (res, rej) {
        var voices = [],
          mapArr = []

        // Gather the voices we can from the model and its relations, so that
        // we can loop through them and see if we can find ^voice in them.

        if (that.voices) {
          voices = voices.concat(that.voices)
        }

        if (that.viewableVoices) {
          voices = voices.concat(that.viewableVoices)
        }

        if (that.contributedVoices) {
          voices = voices.concat(that.contributedVoices)
        }

        if (that.organizations
          && that.organizations.length > 0
          && that.organizations[0].voices) {

          mapArr = that.organizations.map(function (o) {
            return o.voices
          })

          voices = Array.prototype.concat.apply(voices, mapArr)
        }

        if (that.memberOrganizations
          && that.memberOrganizations.length > 0
          && that.memberOrganizations[0].voices) {

          mapArr = that.memberOrganizations.map(function (o) {
            return o.voices
          })

          voices = Array.prototype.concat.apply(voices, mapArr)
        }

        // No voices to handle, so let's return.
        if (voices.length < 1) {
          return rej(new Error('Couldn\'t find any voices to check.'))
        }

        var matchingVoices = []

        matchingVoices = voices.filter(function (v) {
          return (v.id === voice.id)
        })

        if (matchingVoices.length > 0) {
          return res(true)
        } else {
          return res(false)
        }
      })
    }
  }
})

module.exports = new K.Entity()
