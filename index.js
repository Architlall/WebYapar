require("dotenv").config();
var http = require("http");
var express = require("express");
var path = require("path");
const bodyParser = require("body-parser");
const hostname = "localhost";
const { connectDB } = require("./config/db");
const port = 5000;
const app = express();

const cors = require("cors");

connectDB();


const server = http.createServer(app);

app.listen(port, () => console.log(`Server running on port ${port}`));
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
  });

module.exports = app;