'use strict'

// this should simply check if the profile name is already in use somewhere.

module.exports = function (requestedProfileName, callback) {
  Entity.find({ profile_name: requestedProfileName }, function (err, result) {
    if (err) { return callback(err) }

    // false by default
    var isAvailable = false

    if (result.length === 0) {
      isAvailable = true
    }

    return callback(null, isAvailable)
  })
}
