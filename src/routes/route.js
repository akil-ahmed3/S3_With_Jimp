// 'use strict'
const express = require("express");
const multer = require("multer");
// import { uploadConnector } from '../connectors';
const uploadConnector = require("../connectors/aws_s3")

const router = express.Router();

//Middleware for handling multipart/form-data for uploading files
// Multer provides memory and disk storage engine. We are using
// memory storage which stores the files in memory as Buffer objects 
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

// upload.single("file") - file is the name in the form-data request
router.post("/document", upload.single("file"), function(req, res) {
    const file = req.file;
    let filelocation;
    uploadConnector.uploadFile(file.buffer, `upload/${file.originalname}`)
    .then((response) => {
        console.log("<<Uploaded file to S3>>")
        console.log(response);
        filelocation = response.Location;
        //return { filelocation, filename, mimetype, encoding };
        res.status(200).send({filelocation})
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send('Error')
    })
});

module.exports = router;