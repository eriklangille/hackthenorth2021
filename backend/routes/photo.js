const express = require("express");
const { uploadBlob } = require("../blob/blob");
const router = express.Router();
const data = require('../data/reminders.json')

router.put("/:userid", (req, res) => {
	uploadBlob()
	return res
});

module.exports = router;