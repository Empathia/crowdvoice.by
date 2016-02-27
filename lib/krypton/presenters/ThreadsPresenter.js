K.ThreadsPresenter = Module(K, 'ThreadsPresenter')({

  build: function (threads, currentPerson) {
    return new Promise(function (resolve, reject) {
      if (!currentPerson) {
        throw new Error('K.ThreadsPresenter requires the \'currentPerson\' argument')
      }

      var response = []

      async.eachLimit(threads, 1, function (thread, nextThread) {
        var threadInstance = new K.MessageThread(thread)

        // skip if hidden for sender/receiver

        var fetchThread, fetchCurrentPerson

        // Hashids

        threadInstace.id = hashids.encode(thread.id)

        // Other stuff

        Promise.resolve()
          .then(function () {
            return K.MessageThread.query()
              .where('id', thread.id)
              .include('[messages,senderEntity,receiverEntity]')
              .then(function (thread) {
                fetchThread = thread[0]

                return Promise.resolve()
              })
          })
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

            // TODO lastSeen
          })
          .then(function () {
            return Promise.resolve()

            // TODO messageCount
          })
          .then(function () {
            return Promise.resolve()

            // TODO unreadCount
          })
          .then(function () {
            return Promise.resolve()

            // TODO senderEntity
          })
          .then(function () {
            return Promise.resolve()

            // TODO senderPerson
          })
          .then(function () {
            return Promise.resolve()

            // TODO receiverEntity
          })
          .then(function () {
            return Promise.resolve()

            // TODO lastSeen
          })
          .then(function () {
            delete threadInstance.lastSeenSender
            delete threadInstance.lastSeenReceiver
            delete threadInstance.messageCountSender
            delete threadInstance.messageCountReceiver
            delete threadInstance.hiddenForSender
            delete threadInstance.hiddenForReceiver
            delete threadInstance.senderPersonId
            delete threadInstance.senderEntityId
            delete threadInstance.receiverEntityId
            delete threadInstance.messages

            response.push(threadInstance)

            return nextThread()
          })
          .catch(nextThread)
      }, function (err) {
        if (err) { return reject(err) }

        return resolve(response)
      })
    })
  },

})

module.exports = K.ThreadsPresenter
