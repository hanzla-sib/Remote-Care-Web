
const express=require("express");

const app=express();
const cors = require('cors');

let bodyParser = require('body-parser');
router = express.Router();
const userrouter = require('./Userfunction');
const mysqldb = require('./Mysql/database');
// const firebase_realtime=require("./Firebase_realtime/firebase");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors());

app.use('/Usersfunctions', userrouter);
app.use('/mysql', mysqldb);
// app.use('/firebase_realtime',firebase_realtime)

app.listen(5000, () => {
    console.log(`Server started on port ${5000}.`);
});