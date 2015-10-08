'use strict'

var agent = require('superagent').agent(),
  credentials = {
    username: 'cersei',
    password: '12345678'
  }

module.exports = {
  login: function (req, callback) {
    req
      .post('localhost:3000/login')
      .send(credentials)
      .end(function (err, res) {
        if (err) { throw err }

        agent.saveCookies(res)

        return callback(agent)
      })
  },
}
