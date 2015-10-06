var mandrill = require('mandrill-api/mandrill'),
  client = new mandrill.Mandrill(CONFIG.mandrill.key || false)

var notificationViewFile = fs.readFileSync('./views/mailers/notification/notification.html', 'utf8'),
  newMessageViewFile = fs.readFileSync('./views/mailers/notification/newMessage.html', 'utf8'),
  newInvitationViewFile = fs.readFileSync('./views/mailers/notification/newInvitation.html', 'utf8'),
  newRequestViewFile = fs.readFileSync('./views/mailers/notification/newRequest.html', 'utf8'),
  newEntityFollowerViewFile = fs.readFileSync('./views/mailers/notification/newEntityFollower.html', 'utf8'),
  newVoiceFollowerViewFile = fs.readFileSync('./views/mailers/notification/newVoiceFollower.html', 'utf8')

var NotificationMailer = Module('NotificationMailer')({

  // Send feed notification with email
  notification: function (user, notificationInfo, callback) {
    var template = new Thulium({ template: notificationViewFile }),
      message = {
        html: '',
        subject: 'CrowdVoice.by - You have a new notification',
        from_email: 'notifications@crowdvoice.by',
        from_name: 'CrowdVoice.by',
        to: [],
        important: true,
        auto_text: true,
        inline_css: true,
      }

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

  // Send notification about new message
  newMessage: function (user, info, callback) {
    // CHECK IF THERE'S BEEN A MESSAGE WITHIN THE LAST 24 HOURS BY THE SAME
    // USER TO THE SAME USER, IF YES THEN DON'T SEND MESSAGE, IF NOT THEN DO.

    // get newest message that was sent to the receiver that is not the message
    // we just sent and that is part of the same thread
    Message.find(['thread_id = ? AND receiver_entity_id = ? ORDER BY created_at DESC LIMIT ?',
                 [info.message.threadId, info.message.receiverEntityId, 2]], function (err, messages) {
      if (err) { return callback(err); }

      var isSender = new MessageThread(info.thread).isPersonSender(user.entityId)
        isReceiver = !isSender,
        isUnread = false

      if (isSender && info.thread.lastSeenSender === null) {
        isUnread = true
      } else if (isReceiver && info.thread.lastSeenReceiver === null) {
        isUnread = true
      }

      if (!isUnread) {
        isUnread = (
          // message createdAt is newer than
          moment(messages[1].createdAt).format('X')
          >
          // last read by involved party
          moment(info.thread['lastSeen' + (isSender ? 'Sender' : 'Receiver')]).format('X')
        )
      }

      // oh wait it's not read, well was it sent within the last 24 hours?
      if (isUnread) {
        var time = moment().diff(moment(messages[0].createdAt), 'hours')

        // too soon, let's bail
        if (time <= 24) {
          return callback()
        }
      }

      // SEND EMAIL LIKE NORMAL

      var template = new Thulium({ template: newMessageViewFile }),
        message = {
          html: '',
          subject: 'CrowdVoice.by - You have received a new message from ' + info.message.senderEntityId,
          from_email: 'notifications@crowdvoice.by',
          from_name: 'CrowdVoice.by',
          to: [],
          important: true,
          auto_text: true,
          inline_css: true,
        }

      template.parseSync().renderSync({
        params: {
          user: user,
          info: info,
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
        logger.log('NotificationMailer newMessage():')
        logger.log(result)

        return callback(null, result)
      }, function (err) {
        logger.err('NotificationMailer newMessage(): A mandrill error occurred: ' + err.name + ' - ' + err.message)
        return callback(err)
      })
    })

  },

  // Send on new invitation
  newInvitation: function (user, info, callback) {
    var template = new Thulium({ template: newInvitationViewFile }),
      message = {
        html: '',
        subject: 'CrowdVoice.by - You have received a new invitation from ' + info.message.senderEntityId, // TODO placeholder
        from_email: 'notifications@crowdvoice.by',
        from_name: 'CrowdVoice.by',
        to: [],
        important: true,
        auto_text: true,
        inline_css: true,
      }

    template.parseSync().renderSync({
      params: {
        user: user,
        info: info,
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
      logger.log('NotificationMailer newInvitation():')
      logger.log(result)

      return callback(null, result)
    }, function (err) {
      logger.err('NotificationMailer newInvitation(): A mandrill error occurred: ' + err.name + ' - ' + err.message)
      return callback(err)
    })
  },

  // Send on new request
  newRequest: function (user, info, callback) {
    var template = new Thulium({ template: newRequestViewFile }),
      message = {
        html: '',
        subject: 'CrowdVoice.by - You have received a new request from ' + info.message.senderEntityId, // TODO placeholder
        from_email: 'notifications@crowdvoice.by',
        from_name: 'CrowdVoice.by',
        to: [],
        important: true,
        auto_text: true,
        inline_css: true,
      }

    template.parseSync().renderSync({
      params: {
        user: user,
        info: info,
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
      logger.log('NotificationMailer newRequest():')
      logger.log(result)

      return callback(null, result)
    }, function (err) {
      logger.err('NotificationMailer newRequest(): A mandrill error occurred: ' + err.name + ' - ' + err.message)
      return callback(err)
    })
  },

  // Send on new follow of your voice
  newVoiceFollower: function (user, newFollowerEntity, callback) {
    var template = new Thulium({ template: newVoiceFollowerViewFile }),
      message = {
        html: '',
        subject: 'CrowdVoice.by - Your voice has a new follower',
        from_email: 'notifications@crowdvoice.by',
        from_name: 'CrowdVoice.by',
        to: [],
        important: true,
        auto_text: true,
        inline_css: true,
      }

    template.parseSync().renderSync({
      params: {
        user: user,
        info: newFollowerEntity,
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
      logger.log('NotificationMailer newVoiceFollower():')
      logger.log(result)

      return callback(null, result)
    }, function (err) {
      logger.err('NotificationMailer newVoiceFollower(): A mandrill error occurred: ' + err.name + ' - ' + err.message)
      return callback(err)
    })
  },

  // Send on new follow you
  newEntityFollower: function (user, newFollowerEntity, callback) {
    var template = new Thulium({ template: newEntityFollowerViewFile }),
      message = {
        html: '',
        subject: 'CrowdVoice.by - You have a new follower',
        from_email: 'notifications@crowdvoice.by',
        from_name: 'CrowdVoice.by',
        to: [],
        important: true,
        auto_text: true,
        inline_css: true,
      }

    template.parseSync().renderSync({
      params: {
        user: user,
        info: newFollowerEntity,
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
      logger.log('NotificationMailer newEntityFollower():')
      logger.log(result)

      return callback(null, result)
    }, function (err) {
      logger.err('NotificationMailer newEntityFollower(): A mandrill error occurred: ' + err.name + ' - ' + err.message)
      return callback(err)
    })
  },
})

module.exports = NotificationMailer
