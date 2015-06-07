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

##### Prerequisites for OS X

- XQuarts
- libvips

Required for [sharp](https://www.npmjs.com/package/sharp) module.

You can install them via [homebrew](http://brew.sh/):

```sh
brew install Caskroom/cask/xquartz
brew install homebrew/science/vips --with-webp --with-graphicsmagick
```

or check the sharp's module readme for more information.

##### Run the app

```sh
npm install
webpack -d
npm start
```
