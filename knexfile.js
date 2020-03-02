// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: '.data/comake.db3',
    migrations: {
      directory: './data/migrations'
    }, 
    seeds:{
      directory: './data/seeds'
    }
  },
  testing: {
    client: 'sqlite3',
    connection: { 
      filename: './database/test.db3' 
  },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
    },
    seeds: { directory: './database/seeds' },
  },
  staging: {
    client: 'sqlite3',
    connection: {
      filename: './data/staging.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
  }

};
