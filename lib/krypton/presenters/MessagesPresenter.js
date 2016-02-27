// *** means it differs from original

K.MessagesPresenter = Module(K, 'MessagesPresenter')({

  build: function (messages, currentPerson) {
    return new Promise(function (resolve, reject) {
      if (!currentPerson) {
        throw new Error('K.MessagesPresenter requires the \'currentPerson\' argument')
      }

      var response = []

      async.eachLimit(messages, 1, function (message, nextMessage) {
        var msgInstance = new K.Message(message)

        // skip if hidden for sender/receiver

        var fetchMessage, fetchCurrentPerson

        // Hashids

        msgInstance.id = hashids.encode(message.id)
        msgInstance.threadId = hashids.encode(message.threadId)

        // Other stuff

        Promise.resolve()
          .then(function () {
            return K.Entity.query()
              .where('id', hashids.decode(currentPerson.id)[0])
              .then(function (entity) {
                fetchCurrentPerson = entity[0]

                return Promise.resolve()
              })
          })
          .then(function () {
            return Promise.resolve()

            // TODO senderEntity
          })
          .then(function () {
            return Promise.resolve()

            if (!message.voiceId) {
              return Promise.resolve()
            }

            // TODO
            // .voice { title, slug }
          })
          .then(function () {
            return Promise.resolve()

            if (!message.organizationId) {
              return Promise.resolve()
            }

            // TODO
            // .organization { name, profileName }
          })
          .then(function () {
            // NOTE:
            //   - msgInstance.threadId could be deleted in the future, after
            //     some changes from the front end

            delete msgInstance.invitationRequestId // *** also removed invitationRequest property
            delete msgInstance.reportId
            delete msgInstance.voiceId
            delete msgInstance.organizationId
            delete msgInstance.senderPersonId
            delete msgInstance.senderEntityId
            delete msgInstance.receiverEntityId
            delete msgInstance.hiddenForSender
            delete msgInstance.hiddenForReceiver

            response.push(msgInstance)

            return nextMessage()
          })
          .catch(nextMessage)
      }, function (err) {
        if (err) { return reject(err) }

        return resolve(response)
      })
    })
  },

})

module.exports = K.MessagesPresenter
