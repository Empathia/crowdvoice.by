var _ = require('underscore')

exports.up = function(knex, Promise) {
  return knex('Entities')
    .where('type', '=', 'organization')
    .then(function (organizations) {
      return Promise.all(organizations.map(function (organization) {
        return knex('MessageThreads')
          .where('receiver_entity_id', '=', organization.id)
          .then(function (organizationThreads) {
            var senderIds = organizationThreads.map(function (t) { return t.sender_entity_id })

            return knex('MessageThreads')
              .where('sender_entity_id', '=', organization.id)
              .andWhere('receiver_entity_id', 'in', senderIds)
          })
          .then(function (totalThreads) {
            var uniqueOldestThreads = []

            var receiverGroups = {} // duplicate threads receiver IDs will be the properties

            // create or add new receiver ID to object
            totalThreads.forEach(function (thread) {
              if (receiverGroups[thread.receiver_entity_id]) {
                receiverGroups[thread.receiver_entity_id].push(thread)
              } else {
                receiverGroups[thread.receiver_entity_id] = [thread]
              }
            })

            // go over each group, sort it and grab the oldest one
            Object.keys(receiverGroups).forEach(function (key) {
              var arr = receiverGroups[key]

              arr.sort(function (a, b) {
                return new Date(a.created_at) - new Date(b.created_at)
              })

              uniqueOldestThreads.push(arr[0])
            })

            return Promise.resolve({
              uniqueOldestThreads: uniqueOldestThreads,
              receiverGroups: receiverGroups,
            })
          })
          .then(function (threadsInfo) {
            return Promise.all(threadsInfo.uniqueOldestThreads.map(function (thread) {
              var loopThreads = _.tail(threadsInfo.receiverGroups[thread.receiver_entity_id]),
                ids = loopThreads.map(function (t) { return t.id })

              return new Promise(function () {
                return knex('Messages')
                  .whereIn('thread_id', ids)
              }).then(function (messages) {
                var threadsToDeleteIds = ids

                return new Promise.all(messages.map(function (message) {
                  return new Promise(function () {
                    var newThread = _.first(threadsInfo.receiverGroups[thread.receiver_entity_id])

                    return knex('Messages')
                      .where('id', '=', message.id)
                      .update('thread_id', newThread.id)
                  }).then(function () {
                    return knex('MessageThreads')
                      .where('id', 'in', threadsToDeleteIds)
                      .delete()
                  })
                }))
              })
            }))
          })
      }))
    })
}

exports.down = function(knex, Promise) {
  return Promise.resolve()
}
