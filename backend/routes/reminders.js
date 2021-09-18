const express = require("express")
const router = express.Router();
const data = require('../data/reminders.json')

router.get("/", (req, res) => {
  return res.json(data);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  return res.json(data[id]);
});

module.exports = router;