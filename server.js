// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server

const port = 8000;

app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});

// adding routes

app.get("/allData", getData);

function getData(req, res) {
  res.send(projectData);
}

app.post("/addData", addData);

function addData(req, res) {
  console.log(req.body);

  projectData.temp = req.body.temp;
  projectData.date = req.body.date;
  projectData.content = req.body.content;

  console.log(projectData);
}
