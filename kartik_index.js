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

app.get('/category', async (req, res) => {
  let sql = "SELECT category_name,category_status, FORMAT(Date(created_date),'yyyy/mm/dd') AS Created_Date FROM category";
  let [query] = await db.query(sql);
  console.log(query);
  res.render('category', { data: query });
})

app.get('/', (req, res) => {
  res.render("dashboard")
});




app.get('/user', async (req, res) => {
  let sql2 = "select student_id,name,email,contact,gender,address,student_status,city,college_id,created_date from student";
  let [student] = await db.query(sql2);
  // console.log(student);
  res.render("user.ejs", { student });
});


app.get("/edit/:id", async (req, res) => {


  console.log();
  let temp_id = req.params.id;
  let arr = temp_id.split("=");
  console.log(arr[1]);

  let id = req.query.student_id;
  console.log(id)
  let sql3 = `select * from student where student_id='${arr[1]}';`
  let [student3] = await db.query(sql3);

  console.log(sql3);


  res.render("edit.ejs", { student3 });

})

app.post("/update", async (req, res) => {



  let id = req.body.student_id;
  let name = req.body.name;
  let email = req.body.email;
  let contact = req.body.contact;
  let gender = req.body.gender;
  let address = req.body.address;
  let student_status = req.body.student_status;
  let city = req.body.city;
  let college_id = req.body.college_id;
  let created_date = req.body.created_date;


  let sql2 = `update student set name='${name}',email='${email}',contact='${contact}',gender='${gender}',address='${address}',
  student_status='${student_status}',city='${city}',college_id='${college_id}',created_date='${created_date}' where student_id='${id}}';`;
  //   let data2 = await getdata(sql1);
  //   res.redirect("/exam");
  // })

  let [student2] = await db.query(sql2);
  console.log(student2);
  res.render("user.ejs", { student2 });
});



app.listen(port, () => console.log(`  port connected to ${port}!`))