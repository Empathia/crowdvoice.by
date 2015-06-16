var config = {
  appName : 'Neonode',
  environment : process.env.NODE_ENV || 'development',
  logFile : './log/all.log',
  database : {
    development: {
      client: 'postgresql',
      connection: {
        database: 'crowdvoice.by',
        user:     'sgarza',
        password: ''
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'knex_migrations'
      },
      seeds : {
        directory : './seeds/dev'
      },
      logQueries  : true
    }
  },
  port            : process.env.PORT || 3000,
  enableLithium   : false,
  enableHashids   : false, // https://github.com/hashids/
  enablePassport  : false,
  sessionKey      : 'session',
  sessionSecret   : 'EDIT ME ctYArFqrrXy4snywpApkTcfootxsz9Ko',
  enableRedis     : false,
  siteUrl : {
    production: '',
    development : 'http://localhost:3000'
  }
}

module.exports = config;
