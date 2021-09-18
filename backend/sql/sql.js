const sql = require('mssql')

exports.query = async(query) => {
	await sql.connect({
		server: 'nw-db.database.windows.net',
		database: 'nw-db',
		user: 'superuser',
		password: process.env.SQL_PWD,
		port: 1433
	})

	const result = await sql.query(query)

	sql.close()
	return result
}