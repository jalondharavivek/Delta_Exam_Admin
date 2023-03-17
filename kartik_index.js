const express = require('express')
const path = require('path')
const app = express();
const mysql = require("mysql2/promise");
const port = 8765;
app.set("view engine", "ejs");
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '/public/')))
const db = mysql.createPool({
host: "localhost",
user: "root",
password: "root",
database: "exam_system",
});

app.get('/category',async (req, res) => {
  let sql = "SELECT * FROM category";
  let [query] = await db.query(sql);
  res.render('category',{data : query});
})

app.post('/categorystatus',async (req, res) => {
  let id = req.body.id;
  let status = req.body.status
  // console.log(i);
  if(status == 0)
  {
    let sql = `update category set category_status = '1' where category_id = ${id}`;
    let [query] = await db.query(sql);
    res.json(query);
  }
  else if(status == 1)
  {
    let sql = `update category set category_status = '0' where category_id = ${id}`;
    let [query] = await db.query(sql);
    res.json(query);
  }
})

app.post('/editcategory',async (req, res) => {
  let b = req.body;
  let sql = `update category set category_name = '${b.category_name}' where category_id = ${b.category_id}`;
  let [query] = await db.query(sql);
  res.redirect('category');
  // console.log(b);
})

app.get('/editCategory',async (req, res) => {
  let id = req.query.id;
  let sql = `select category_id, category_name from category where category_id = ${id}`;
  let [ans] = await db.query(sql);
  res.json(ans);
  // console.log(ans);
  // console.log(id);
})

app.post('/addcategory',async (req, res) => {
  let sql = `insert into category (category_name,category_status,created_date) values ('${req.body.category_name}','0',now())`;
  let [query] = await db.query(sql);
  res.redirect('category');
  console.log(query);
})

app.get('/', (req, res) => {
  res.render("dashboard")
});

app.listen(port, () => console.log(`  port connected to ${port}!`))