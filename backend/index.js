require("dotenv").config();
var http = require("http");
var express = require("express");
var path = require("path");
const bodyParser = require("body-parser");
const hostname = "localhost";
const { connectDB } = require("./config/db");
const port = 5000;
const app = express();
const adminRouter = require('./routes/admin')
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
  app.use(express.json({limit:'50mb'}));
  app.use(express.urlencoded({limit:'200mb', extended: true })); 
  app.use(bodyParser.json({ limit: "200mb" }));
  app.use(
    bodyParser.urlencoded({
      limit: "50mb",
      extended: true,
      parameterLimit: 50000,
    })
  );
app.use("/",adminRouter)

module.exports = app;