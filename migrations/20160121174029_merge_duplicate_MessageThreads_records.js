var async = require('async'),
  _ = require('underscore')

exports.up = function(knex, Promise) {
  return knex('Entities').where('type', '=', 'organization').then(function (err, organizations) {
    // async.each, with promises
    return new Promise.all(organizations.map(function (organization) {
      return new Promise(function (resolve1, reject1) {
        return knex('MessageThreads').where('receiver_entity_id', '=', organization.id).then(function (threads) {
          var senderIds = threads.map(function (t) { return t.sender_entity_id })

          return knex('MessageThreads').where('sender_entity_id', '=', organization.id).andWhere('receiver_entity_id', 'in', senderIds).then(function (totalThreads) {
            var uniqueOldestThreads = []

            var receiverGroups = {} // receiver IDs will be the properties

            totalThreads.forEach(function (thread) {
              if (receiverGroups[thread.receiver_entity_id]) {
                receiverGroups[thread.receiver_entity_id].push(thread)
              } else {
                receiverGroups[thread.receiver_entity_id] = [thread]
              }
            })

            Object.keys(receiverGroups).forEach(function (key) {
              var arr = receiverGroups[key]

              arr.sort(function (a, b) {
                return new Date(a.created_at) - new Date(b.created_at)
              })

              uniqueOldestThreads.push(arr[0]) // push the oldest thread
            })

            // async.each, with promises
            return new Promise.all(uniqueOldestThreads.map(function (thread) {
              return new Promise(function (resolve2, reject2) {
                var loopThreads = _.tail(receiverGroups[thread.receiver_entity_id])

                var ids = loopThreads.map(function (t) { return t.id })

                return knex('Messages').whereIn('thread_id', ids).then(function (messages) {
                  var threadsToDeleteIds = ids

                    return new Promise.all(messages.map(function (message) {
                      return new Promise(function (resolve3, reject3) {
                        knex('Messages').where('id', '=', message.id)
                      })
                    }))
                }).catch(reject2)
              })
            }))
          }).catch(reject1)
        }).catch(reject1)
      })
    }))
  })
}

exports.down = function(knex, Promise) {

}
