const express = require("express")
const sql = require("mssql")
const router = express.Router();
const data = require('../data/reminders.json')
const config = require("../sql/sql")
const blob = require("../blob/blob")

// @route GET /photo/:id
// @desc Retrieve list of photos
router.get("/", async (req, res) => {
  await blob.listBlob();
  res.sendStatus(200);
});

module.exports = router;