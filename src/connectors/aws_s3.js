const AWS = require("aws-sdk");
require("dotenv").config();

const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY
};

const s3Server = process.env.AWS_S3_SERVER || "http://192.168.10.189:4572";
const bucketName = process.env.AWS_BUCKET_NAME;

const s3client = new AWS.S3({
  credentials,
  endpoint: s3Server,
  s3ForcePathStyle: true
});

exports.uploadFile = (data, fileName) => {
  let extn = fileName.split(".").pop();
  console.log(data)

//   var base64data = new Buffer(data, 'binary');
  var contentType = "jpeg";
  if (extn == "png" || extn == "jpg" || extn == "jpeg" || extn == "gif")
    contentType = "image/" + extn;
  return new Promise((resolve, reject) => {
    s3client.upload(
      {
        Bucket: bucketName,
        Key: fileName,
        ContentEncoding: "base64",
        Body: data,
        ContentType: contentType,
        ACL: "public-read",
      //   StorageClass: "REDUCED-REDUNDANCY"
      },
      (err, data) => {
        if (err) return reject(err);
        resolve(data);
      }
    );
  });
};
