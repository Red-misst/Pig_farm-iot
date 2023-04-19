const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const WebSocket = require("ws");
const dotenv = require("dotenv").config();
const dbConnect = require("./config/db");
dbConnect();
const {dbPush, dbCreate }= require("./config/dbPush");

const sendSMS = require("./config/twilio");


const ws = new WebSocket("ws://192.168.137.156:81/");

const app = express();
const port = 4000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));
app.set("view engine", "ejs");

// Store data in variables
let noiseData = [];
let coughingData = [];
let _noise;
let _coughing;

//variables to be used in app
let time = 0;
setInterval(() => {
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  time = hours + ":" + minutes;
}, 1000);

// WebSocket data receive
ws.on("open", function () {
  console.log("Connected to loraTTGO WebSocket server");
});

ws.on("message", function (data) {
  const dataString = data.toString();
  const dataObject = JSON.parse(dataString);

  //dynamically change the values of temp and turbidity and water level
  _noise = dataObject.noise;
  _coughing = dataObject.coughing;

  console.log("Received data from loraTTGO");
  console.log("Noise: " + _noise);
  console.log("Coughing: " + _coughing);

  // Add data to arrays
  noiseData.push(_noise);
  coughingData.push(_coughing);

  dbPush(_noise);
});

// Route to serve JSON data
app.get("/data", (req, res) => {
  res.json({
    noise: noiseData,
    time: time,
  });
});

// Renders HTML page
app.get("/", (req, res) => {
  res.render("index", {
    noise: _noise,
    coughing: _coughing,
  });
});

// Route to send SMS
app.get("/sms", (req, res) => {
  sendSMS();
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
