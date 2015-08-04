var feed = {
  voiceCreated: function (req, model, callback) {
    callback()
  },

  entityFollowsEntity: function (req, followEntityResult, callback) {
    callback()
  },

  entityFollowsVoice: function (req, followVoiceResult, callback) {
    callback()
  },

  // postponed
  entityArchivesVoice: function (req, res, model, callback) {},

  entityUpdateAvatar: function (req, callback) {
    callback()
  },

  entityUpdateBackground: function (req, callback) {
    callback()
  },

  // postponed
  orgNewPublicMember: function (req, res, model, callback) {},

  voiceNewPosts: function (req, callback) {
    callback()
  },

  voiceUpdateTitle: function (req, callback) {
    callback()
  },

  voiceUpdateDescription: function (req, callback) {
    callback()
  },

  // postponed
  voiceArchived: function (req, res, model, callback) {},

  voiceNewPublicContributor: function (req, res, model, callback) {},
}

module.exports = feed
