const express = require("express")
const sql = require("mssql")
const router = express.Router();
const { uploadBlob } = require("../blob/blob");
const multer = require("multer");
const upload = multer({ dest: 'uploads/' })
const mime = require('mime-types')

const fs = require('fs');
const { pool } = require("../sql/sql");

router.post("/user/:user", upload.single('file'), async (req, res, next) => {
  const { user } = req.params;

  const callBack = async (err, data) => {
    const url = await uploadBlob(data, mime.extension(req.file.mimetype))

    let poolT = await pool()
    poolT.request()
      .input('userId', sql.Int, parseInt(user))
      .input('urlString', sql.VarChar(255), url)
      .input('createDate', sql.DateTime, new Date())
      .query(`
        INSERT INTO PHOTO (userId, urlString, createDate)
        VALUES (@userId, @urlString, @createDate)
      `)

    res.send(url)
    res.end()
  }
  fs.readFile(req.file.path, callBack)
})

// @route GET /user?user=
// @desc Retrieve all photos for this user
router.get("/user/:user", async (req, res) => {
  const { user } = req.params;
  const rawResponse = await (await pool())
    .request()
    .input('userId', sql.Int, parseInt(user))
    .query(`select * from photo 
        where userId = @userId
        order by createDate desc
        `)

  res.json(rawResponse.recordset)
});

// @route GET /photo/:id
// @desc Retrieve list of photos
router.get("/", async (req, res) => {
  await blob.listBlob();
  res.sendStatus(200);
});

module.exports = router;