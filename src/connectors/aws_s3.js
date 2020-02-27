const AWS = require('aws-sdk');
const Jimp = require('jimp')
require('dotenv').config()

const credentials = {
   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
   secretAccessKey: process.env.AWS_SECRET_KEY,
}

const s3Server = process.env.AWS_S3_SERVER || 'http://localhost:4572';
const bucketName = process.env.AWS_BUCKET_NAME

const s3client = new AWS.S3({
   credentials,
   endpoint: s3Server,
   s3ForcePathStyle: true
})

exports.uploadFile = (data, fileName) => {
   let extn = fileName.split('.').pop();
   var contentType = "jpeg"
   if (extn == 'png' || extn == 'jpg' || extn == 'jpeg' || extn == 'gif') 
     contentType = "image/" + extn;
   console.log(contentType);
   return new Promise((resolve, reject) => {require('dotenv').config()
   const express = require("express");
   const http = require('http');
   const bodyParser = require('body-parser');
   const routes = require("./routes/route");
   
   const app = express();
   app.use(bodyParser.json());
   //Define context root and mount the routes
   app.use("/api", routes);
   
   const port = process.env.NODE_PORT || 4000;
   http.createServer(app)
   .listen(port, function(){
     console.log('Server running locally on port ', port);
   })
      s3client.upload(
         {
            Bucket: bucketName,
            Key: fileName,
            Body: data,
            ContentType: contentType,
            ACL: 'public-read',
         },
         (err, data) => {
            if (err) return reject(err)
            resolve(data)
         },
      )
   })
}
