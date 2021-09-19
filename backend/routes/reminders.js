const express = require("express")
const sql = require("mssql")
const router = express.Router();
const data = require('../data/reminders.json')
const config = require("../sql/sql")

// @route GET /reminders/:id
// @desc Retrieve all reminders in order of creation
router.get("/", async (req, res) => {
  await sql.connect(config).then(pool => {
    return pool.request()
      .query("select * from todo order by createDate desc")
  }).then(result => {
    return res.json(result.recordset);
  })
});

// @route POST /reminders/:id
// @desc Create a new reminder
router.post("/", async (req, res) => {
  const title = req.body.title
  const userId = req.body.userId;
  await sql.connect(config).then(pool => {
    return pool.request()
      .input('title', sql.VarChar(255), title)
      .input('userId', sql.Int, parseInt(userId))
      .query("insert into todo(title, userId, createDate) values (@title, @userId, getdate())")
  }).then(() => {
    res.sendStatus(200);
  }).catch(() => {
    res.sendStatus(400);
  })
});

// @route GET /reminders/:id
// @desc Retrieve a specific reminder
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  await sql.connect(config).then(pool => {
    return pool.request()
      .input('id', sql.Int, parseInt(id))
      .query("select * from todo where id = @id")
  }).then(result => {
    return res.json(result.recordset);
  })
});

// @route POST /reminders/:id
// @desc Update an existing reminder
router.post("/:id", async (req, res) => {
  const { id } = req.params;
  const title = req.body.title;
  const setComplete = req.body.setComplete;
  await sql.connect(config).then(pool => {
    if (setComplete) {
      return pool.request()
        .input('id', sql.Int, parseInt(id))
        .input('title', sql.VarChar(255), title)
        .query("update todo set title = @title, completeDate = getdate() where id = @id")
    }
    return pool.request()
      .input('id', sql.Int, parseInt(id))
      .input('title', sql.VarChar(255), title)
      .query("update todo set title = @title, completeDate = null where id = @id")
  }).then(result => {
    return res.json(result.recordset);
  })
});

module.exports = router;