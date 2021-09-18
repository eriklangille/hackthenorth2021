const express = require("express")
const sql = require("mssql")
const router = express.Router();
const data = require('../data/reminders.json')
const config = require("../sql/sql")

router.get("/", async (req, res) => {
  await sql.connect(config).then(pool => {
    return pool.request()
    .query("select * from todo order by createDate desc")
  }).then(result => {
    return res.json(result.recordset);
  })
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  await sql.connect(config).then(pool => {
    return pool.request()
    .input('id', sql.Int, id)
    .query("select * from todo where id = @id")
  }).then(result => {
    return res.json(result.recordset);
  })
});

module.exports = router;