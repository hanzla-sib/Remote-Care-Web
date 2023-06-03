const express = require("express"); // Importing the Express module

const app = express(); // Creating an instance of the Express application
const cors = require('cors'); // Importing the CORS middleware

let bodyParser = require('body-parser'); // Importing the body-parser middleware
router = express.Router(); // Creating an instance of Express router

const userrouter = require('./Userfunction'); // Importing the Userfunction module
const mysqldb = require('./Mysql/database'); // Importing the Mysql database module
// const firebase_realtime=require("./Firebase_realtime/firebase"); // Importing the Firebase Realtime module (commented out)

app.use(bodyParser.json()); // Parsing the request body as JSON
app.use(bodyParser.urlencoded({
  extended: true
})); // Parsing the request body with URL-encoded data

app.use(cors()); // Using the CORS middleware to enable cross-origin resource sharing

app.use('/Usersfunctions', userrouter); // Using the Userfunction module for routes starting with '/Usersfunctions'
app.use('/mysql', mysqldb); // Using the Mysql database module for routes starting with '/mysql'
// app.use('/firebase_realtime',firebase_realtime); // Using the Firebase Realtime module for routes starting with '/firebase_realtime' (commented out)

app.listen(5000, () => {
  console.log(`Server started on port ${5000}.`); // Starting the server and logging a message when it's running
});
