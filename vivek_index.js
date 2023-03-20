const express = require('express')
const path = require('path')
const app = express();
const mysql = require("mysql2/promise");
const port = 8760;

app.set("view engine", "ejs");

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '/public')))

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "exam_system",
});
app.get('/question', (req, res) => {
    res.render("question")
  });
  app.get('/addquestion',(req,res)=>{
    res.render("addquestion")
  });
  
  // app.listen(port, () => console.log(`  port connected to ${port}!`))
  module.exports = app; 