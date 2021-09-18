const express = require("express");
const sql = require('mssql')
const router = express.Router();
const { pool } = require("../sql/sql");
const { phoneNumberFormatter } = require("../util/phone");
const { create, validate } = require("../util/validate");

router.post("/", async (req, res) => {
	const { phone, password, firstname, lastname, user } = req.query

	let formattedPhone = phoneNumberFormatter(phone)
	const checkIfPhonenumberExists = await (await pool())
		.request()
		.query(`
		SELECT *
		from family
		where phone = ${formattedPhone}
	`)

	if (checkIfPhonenumberExists.recordset.length === 0) {
		const pwdHash = create(formattedPhone, password)

		const p = (await pool()).request()
			.input('phone', sql.VarChar(255), formattedPhone)
			.input('password', sql.VarChar(255), pwdHash)
			.input('firstname', sql.VarChar(255), firstname)
			.input('lastname', sql.VarChar(255), lastname)
			.input('user', sql.Int, parseInt(user))
			.query(`
			INSERT INTO FAMILY (phone, pwdHash, FirstName, LastName, userId)
			VALUES (@phone, @password, @firstname, @lastname, @user)
		`)
	}

	res.statusCode = 200
	res.send("OK")
});

router.get("/", async (req, res) => {
	const { phone, password } = req.query

	let formattedPhone = phoneNumberFormatter(phone)
	const query = await (await pool())
		.request()
		.query(`
		SELECT *
		from family
		where phone = ${formattedPhone}
	`)

	if (query.recordset.length === 1 && validate(formattedPhone, password, query.recordset[0].pwdHash)) {
		return res.json({
			...query.recordset[0],
			pwdHash: null
		})
	} else {
		res.statusCode = 403
		res.send("Unauthorized")
	}
})

module.exports = router;