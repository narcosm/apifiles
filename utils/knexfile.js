const {
    DB_NAME,
    DB_PASSWORD,
    DB_HOST,
    DB_USER
  } = process.env
  
  module.exports = {
      development: {
          client: 'postgresql',
          connection: {
            host: DB_HOST || 'postgres',
            database: DB_NAME || 'db_apifiles',
            user:     DB_USER || 'postgres',
            password: DB_PASSWORD || 'changeme'
        },
        pool: {
          min: 4,
          max: 16
        },
        migrations: {
          directory: '../migrations',
          tableName: 'knex_migrations'
        }
      },
      staging: {
        client: 'postgresql',
        connection: {
          database: 'my_db',
          user:     'username',
          password: 'password'
        },
        pool: {
          min: 4,
          max: 16
        },
        migrations: {
          tableName: 'knex_migrations'
        }
      },
      production: {
        client: 'postgresql',
        connection: {
          database: 'my_db',
          user:     'username',
          password: 'password'
        },
        pool: {
          min: 4,
          max: 16
        },
        migrations: {
          tableName: 'knex_migrations'
        }
      }
    };