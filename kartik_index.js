const express = require('express')
const path = require('path')
const app = express();
const mysql = require("mysql2/promise");
const port = 8765;
app.set("view engine", "ejs");
var bodyParser=require('body-parser');
const Query = require('mysql2/promise');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const vivek_indexfile = require('./routes/vivek_index')
app.use("/",vivek_indexfile)

const category = require('./routes/manoj_index');
app.use("/", category)

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '/public/')))
const db = mysql.createPool({
host: "localhost",
user: "root",
password: "root",
database: "exam_system",
});


app.get('/', (req, res) => {
  res.render("dashboard")
});

app.listen(port, () => console.log(`  port connected to ${port}!`))