const sql = require('mssql')
require("dotenv").config()

module.exports = {
  server: 'nw-db.database.windows.net',
  database: 'nw-db',
  user: 'superuser',
  password: process.env.SQL_PWD,
  port: 1433
}