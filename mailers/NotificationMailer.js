var mandrill = require('mandrill-api/mandrill'),
  client = new mandrill.Mandrill(CONFIG.mandrill.key || false),
  viewFile = fs.readFileSync('./views/mailers/notification/notification.html', 'utf8')

var message = {
  html: '',
  subject: 'CrowdVoice.by - You have a new notification',
  from_email: 'notifications@crowdvoice.by',
  from_name: 'CrowdVoice.by',
  to: [],
  important: true,
  auto_text: true,
  inline_css: true,
}

var NotificationsMailer = Module('NotificationsMailer')({

  // Send email notification
  notification: function (user, notificationInfo, callback) {
    var template = new Thulium({ template: viewFile })

    template.parseSync().renderSync({
      params: {
        user: user,
        notificationInfo: notificationInfo,
      },
    })

    var view = template.view

    message.html = view
    message.to = [] // reset

    message.to.push({
      email: user.email,
      name: user.name,
      type: 'to'
    })

    client.messages.send({ message: message, async: true }, function (result) {
      logger.log('NotificationMailer notification():')
      logger.log(result)

      return callback(null, result)
    }, function (err) {
      logger.err('NotificationMailer notification(): A mandrill error occurred: ' + err.name + ' - ' + err.message)
      return callback(err)
    })
  },

})

module.exports = NotificationsMailer
