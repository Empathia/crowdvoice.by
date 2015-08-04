/*
 * This file merely contains an object with a set of functions that are to be
 * injected wherever the events they describe happen.
 */

var feedInject = {
  // a Voice is created
  voiceCreated: function (req, model, callback) {
    callback()
  },

  // an Entity follows another Entity
  entityFollowsEntity: function (req, followEntityResult, callback) {
    callback()
  },

  // an Entity follows a Voice
  entityFollowsVoice: function (req, followVoiceResult, callback) {
    callback()
  },

  // postponed
  // an Entity archives a Voice
  entityArchivesVoice: function (req, res, model, callback) {},

  // an Entity updates its avatar
  entityUpdateAvatar: function (req, callback) {
    callback()
  },

  // an Entity updates its background image
  entityUpdateBackground: function (req, callback) {
    callback()
  },

  // postponed
  // an Entity (Organization) has a new public member
  orgNewPublicMember: function (req, res, model, callback) {},

  // a Voice has new posts
  voiceNewPosts: function (req, callback) {
    callback()
  },

  // a Voice has an update to its title
  voiceUpdateTitle: function (req, callback) {
    callback()
  },

  // a Voice has an update to its description
  voiceUpdateDescription: function (req, callback) {
    callback()
  },

  // postponed
  // a Voice is archived
  voiceArchived: function (req, res, model, callback) {},

  // a Voice has a new public contributor
  voiceNewPublicContributor: function (req, res, model, callback) {},
}

module.exports = feedInject
