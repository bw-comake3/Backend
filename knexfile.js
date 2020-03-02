// Update with your config settings.
require('dotenv').config()

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/comake.db3'
    }, 
    migrations: {
      directory: './data/migrations'
    }, 
    seeds:{
      directory: './data/seeds'
    }
  },
  testing: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/cm_test.sqlite3'
    },
    migrations: {
      directory: './data/migrations'
    }, 
    seeds: {
      directtory: './data/seeds'
    }
  },

  staging: {
    client: 'pg',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  }

};
