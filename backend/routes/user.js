const express = require("express");
const sql = require('mssql')
const router = express.Router();
const { pool } = require("../sql/sql");

router.post("/", async (req, res) => {
	const { user, firstname, lastname } = req.query

	await (await pool()).request()
		.input('id', sql.Int, parseInt(user))
		.input('firstname', sql.VarChar(255), firstname)
		.input('lastname', sql.VarChar(255), lastname)
		.query(`
			UPDATE USERS 
			SET id = @id, FirstName = @firstname, LastName = @lastname
			WHERE id = @id;

			IF NOT EXISTS(SELECT * FROM USERS WHERE id = @id)
			Begin
				INSERT INTO USERS (id, FirstName, LastName)
				VALUES (@id, @firstname, @lastname)
			End;
		`)

	res.statusCode = 200
	res.send("OK")
});

router.get("/", async (req, res) => {
	const { user } = req.query

	const query = await (await pool())
		.request()
		.input('id', sql.Int, parseInt(user))
		.query(`
		SELECT *
		from users
		where id = ${user}
	`)

	return res.json(query.recordset[0])
})

module.exports = router;