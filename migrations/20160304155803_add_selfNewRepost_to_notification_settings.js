var _ = require('underscore')

exports.up = function(knex, Promise) {
  return knex('NotificationSettings')
    .select('*')
    .then(function (result) {
      return Promise.each(result,
        function (row) {
          var web = _.extend({ selfNewRepost: true }, row.webSettings),
            email = _.extend({ selfNewRepost: true }, row.emailSettings)

          return knex('NotificationSettings')
            .update({
              web_settings: web,
              email_settings: email,
            })
            .where('id', row.id)
        })
    })
}

exports.down = function(knex, Promise) {
  return knex('NotificationSettings')
    .select('*')
    .then(function (result) {
      return Promise.each(result,
        function (row) {
          var web = _.extend({ selfNewRepost: true }, row.webSettings),
            email = _.extend({ selfNewRepost: true }, row.emailSettings)

          delete row.web_settings.selfNewRepost
          delete row.email_settings.selfNewRepost

          return knex('NotificationSettings')
            .update({
              web_settings: row.web_settings,
              email_settings: row.email_settings,
            })
            .where('id', row.id)
        })
    })
}
