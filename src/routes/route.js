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
    lenna.greyscale(async (err, pic) => {
      if (err) throw err;
      console.log(pic);

      pic.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
        uploadConnector
          .uploadFile(buffer, `upload/newpicture103.png`)
          .then(response => {
            console.log("<<Uploaded file to S3>>");
            let filelocation = response.Location;
            res.status(200).send({ filelocation });
          })
          .catch(err => {
            console.log(err);
            res.status(400).send("Error");
          });
      });
    });
  });
});

module.exports = router;
