const express = require('express')
const path = require('path')
const app = express();
const mysql = require("mysql2");
const port = 8765;

app.set("view engine", "ejs");


app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '/public')))

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "exam_system",
});

// Connect to the database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to database");
});

app.get('/dashboard', (req, res) => {
  
    res.render("dashboard")
  });

  app.get('/category', (req, res) => {
  
    res.render("category")
  });

  app.get('/user', (req, res) => {
  
    res.render("user")
  });



  app.listen(port, () => console.log(`  port connected to ${port}!`))