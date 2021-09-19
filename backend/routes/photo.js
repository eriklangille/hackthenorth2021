const express = require("express")
const sql = require("mssql")
const router = express.Router();
const { uploadBlob } = require("../blob/blob");
const multer = require("multer");
const upload = multer({ dest: 'uploads/' })
const mime = require('mime-types')

const fs = require('fs');
const { pool } = require("../sql/sql");

router.post("/user", upload.single('file'), async (req, res, next) => {
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
router.get("/user", async (req, res) => {
  const { user } = req.params;
  await sql.connect(config).then(pool => {
    return pool.request()
      .input('userId', sql.Int, parseInt(id))
      .query(`select * from photo 
        where userId = @userId
        order by createDate desc
        `)
  }).then(result => {
    return res.json(result.recordset);
  })
});

// @route GET /photo/:id
// @desc Retrieve list of photos
router.get("/", async (req, res) => {
  await blob.listBlob();
  res.sendStatus(200);
});

module.exports = router;