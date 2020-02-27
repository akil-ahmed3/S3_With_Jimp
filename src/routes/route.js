// 'use strict'
const express = require("express");
const multer = require("multer");
const uploadConnector = require("../connectors/aws_s3");
const Jimp = require("jimp");

const router = express.Router();
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

router.post("/document", upload.single("file"), function(req, res) {
  const file = req.file;

  Jimp.read(file.buffer, (err, lenna) => {
    if (err) throw err;
    // lenna
    //   .resize(256, 256)
    //   let filelocation;
    lenna.greyscale((err, pic) => {
      if (err) throw err;
      console.log(pic)
      uploadConnector
        .uploadFile(pic.bitmap.data, `upload/newpicture1030.png`)
        .then(response => {
          console.log("<<Uploaded file to S3>>");
          filelocation = response.Location;
          res.status(200).send({ filelocation });
        })
        .catch(err => {
          console.log(err);
          res.status(400).send("Error");
        });
    });
  });
});

module.exports = router;
