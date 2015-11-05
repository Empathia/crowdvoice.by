'use strict'

var path = require('path'),
  knexfile = require(path.join(__dirname, '../knexfile.js')),
  db = require('knex')(knexfile[process.env.NODE_ENV || 'development']),
  decay = require('decay'),
  async = require('async'),
  Promise = require('bluebird')

db('Entities')
  .then(function (rows) {
    console.log(rows)
  })
  .catch(function (err) {
    console.log(err)
  })
