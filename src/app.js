// 'use strict'
require('dotenv').config()
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