 const express = require('express')
 const path = require('path')
 const app = express();
 const mysql = require("mysql2/promise");
 const port = 8765;
 app.set("view engine", "ejs");

 app.use(express.static('public'));
 app.use(express.static(path.join(__dirname, '/public')))

const sejal_indexfile = require('./routes/sejal_index')

app.use('/',sejal_indexfile);



 const db = mysql.createPool({
 host: "localhost",
 user: "root",
 password: "root",
 database: "exam_system",
 });

 app.get('/category',async (req, res) => {
  let sql = "SELECT category_name,category_status, FORMAT(Date(created_date),'yyyy/mm/dd') AS Created_Date FROM category";
   let [query] = await db.query(sql);
   console.log(query);
   res.render('category',{data : query});
 })

 //Question 
 app.get('/question',async (req, res) => {
   res.render('question');
 })



  app.get('/', (req, res) => {
    res.render("dashboard")
 });

  app.listen(port, () => console.log(`  port connected to ${port}!`))