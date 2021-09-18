const sql = require('mssql')

const config = {
  server: 'nw-db.database.windows.net',
  database: 'nw-db',
  user: 'superuser',
  password: process.env.SQL_PWD,
  port: 1433
}

module.exports = {
  ...config,
  pool: async () => {
    const pool = await sql.connect(config)

    return pool
  }
}

