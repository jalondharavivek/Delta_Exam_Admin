const express = require('express')
const path = require('path')
const app = express();
const mysql = require("mysql2");
var nodemailer = require('nodemailer');
const port = 8765;
const bodyParser = require("body-parser");
const { Console, log } = require('console');
const { get } = require('http');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '/public')))

const kartik_indexfile = require('./routes/user_kartik_index')
app.use("/",kartik_indexfile);

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "exam_system",
});

app.get('/', (req, res) => {
  res.render("login")
});

app.listen(port, () => console.log(`port connected to ${port}!`))