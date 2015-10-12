var _ = require('underscore')

// NOTE: WHEN ADDING NEW FEED ACTIONS YOU NEED TO UPDATE THIS!!
var feedSettings = {
    entityFollowsEntity: true,
    entityFollowsVoice: true,
    entityArchivesVoice: true,
    entityUpdatesAvatar: true,
    entityUpdatesBackground: true,
    entityBecomesOrgPublicMember: true,
    voiceIsPublished: true,
    voiceNewPosts: true,
    voiceNewTitle: true,
    voiceNewDescription: true,
    voiceNewPublicContributor: true,
  },
  webSettings = feedSettings,
  emailSettings = _.clone(feedSettings).defaults(feedSettings, {
    selfNewMessage: true,
    selfNewInvitation: true,
    selfNewRequest: true,
    selfNewVoiceFollower: true,
    selfNewEntityFollower: true
  })

exports.seed = function (knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('NotificationSettings').del(),

    knex('NotificationSettings').insert({
      id: 1,
      entity_id: 1,
      web_settings: webSettings,
      email_settings: emailSettings,
    }),

    knex('NotificationSettings').insert({
      id: 9,
      entity_id: 1,
      web_settings: webSettings,
      email_settings: emailSettings,
    }),

    knex('NotificationSettings').insert({
      id: 2,
      entity_id: 1,
      web_settings: webSettings,
      email_settings: emailSettings,
    }),

    knex('NotificationSettings').insert({
      id: 5,
      entity_id: 1,
      web_settings: webSettings,
      email_settings: emailSettings,
    }),

    knex('NotificationSettings').insert({
      id: 7,
      entity_id: 1,
      web_settings: webSettings,
      email_settings: emailSettings,
    })
  );
};
