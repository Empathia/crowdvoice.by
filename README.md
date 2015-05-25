## Install instructions for OSX

#### Apps
- Download and install [Postgress App](http://postgresapp.com)
- Download [Navicat Premium](https://www.dropbox.com/s/xqzrhopznmbviwj/Navicat%20Premium%2011.1.5%20v2.dmg?dl=0) 
	- To connecto use your OSX username w/out password, the default database is "postgres" otherwise it will not connect
	- Create a database for the app: "__crowdvoice.by__"
- Install Redis | brew install redis

#### Config

- cp ./config/config-example.js to config/config.js
- Edit config.js
	- set database.development to "postgres://your_user@localhost/crowdvoice.by",
	- set enableRedis to true
	- set enablePassport to true

#### Knex

- run **npm install knex -g**
- run **knex init**
- open ./knexfile.js and edit :

```javascript
development: {
    client: 'postgresql',
    connection: {
      database: 'crowdvoice.by',
      user:     'your_user',
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
    }
  },
```

- run **knex migrate:latest**
- run **knex seed:run**

#### Application

- npm install
- npm start
