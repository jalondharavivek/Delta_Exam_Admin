const express = require('express')
const path = require('path')
const app = express();
const mysql = require("mysql2/promise");

const bodyParser = require("body-parser");
const { Console, log } = require('console');
const { get } = require('http');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set("view engine", "ejs");

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '/public')))

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "exam_system",
});


// app.get('/user', async (req, res) => {


//   let sql1 = `select student_id,name,email,contact,gender,address,student_status,city,state_name,college_name 
//   from student a, state b, colleges c where a.state_id=b.state_id and a.college_id=c.college_id`;

//   [student]= await db.execute(sql1);
//   res.render("user.ejs", { student  });

// });

app.get('/user',async (req, res) => {

  let sql = `select student_id,name,email,contact,gender,address,student_status,city,state_name,college_name 
  from student a, state b, colleges c where a.state_id=b.state_id and a.college_id=c.college_id`;

  let page = req.query.page || 1;
  let limit = req.query.limit || 3;
  if (req.query.page > 1)
      sql += ` LIMIT ${((page - 1) * limit)}, ${limit}`;
  else
      sql += ` LIMIT ${limit} `;
  let [student] = await db.execute(sql);
  let sql1 = "select count(*) as total from student";
  let [result1] = await db.execute(sql1);
  res.render('user',{ student , page : page, total: result1[0].total, limit: limit });
})

app.post('/userpage', async (req,res) => {

  let sql = `select student_id,name,email,contact,gender,address,student_status,city,state_name,college_name 
  from student a, state b, colleges c where a.state_id=b.state_id and a.college_id=c.college_id `;

  console.log(req.body.page);
  let page=parseInt(req.body.page)||1;
  let limit=parseInt(req.body.limit)||3;
  let startindex=(page-1)*limit;
  let endindex=page*limit-startindex;
  if (req.body.page > 1)
      sql += ` LIMIT ${((page - 1) * limit)}, ${limit}`;
  else
      sql += ` LIMIT ${limit} `;
  let [student] = await db.execute(sql);

  let sql1 = "select count(*) as total from student";
  let [result1] = await db.execute(sql1);

  let pages = `select * from student where name limit ${startindex},${endindex}`;
  console.log(pages );
  let [pages1] = await db.execute(pages);
  res.json({ student, page: page, total: result1[0].total, limit: limit, pages : pages1 });
})





app.get('/student_status', async (req, res) => {
  console.log("this is call")
  console.log(req.query)
  let student_id = req.query.id;
  let student_status = req.query.status;

  if (student_status == '0') {
    let status = `update student set student_status = 1 where student_id = ${student_id}`;
    let [student_result] = await db.execute(status);

    res.json({ student_result })


  }
  else {
    let status = `update student set student_status = 0 where student_id = ${student_id}`;
    let student_result = await db.execute(status);
    res.json({ student_result })




  }


});
//collage render tghrough ajax
app.get("/collage", async (req, res) => {
  console.log("/collage is active")
  let id = req.query.id;
  console.log(req.query.id);

  sql1 = `select college_id from student where student_id ='${id}'`;
  let [data1] = await db.execute(sql1);

  res.send(data1);
}

)
app.get("/allcollage", async (req, res) => {
  console.log("allcollage")
  let sql1 = `select * from colleges`;
  let [data1] = await db.execute(sql1);
  res.send(data1);
})

app.get("/edit/:id", async (req, res) => {

  console.log();
  let temp_id = req.params.id;
  let arr = temp_id.split("=");


  let sql3 = `select * from student where student_id='${arr[1]}';`
  let [student2] = await db.execute(sql3);


  let sql1 = `select * from state`;
  let [state] = await db.execute(sql1);

  res.render("edit.ejs", { student2, state });
})



app.get(`/student/allcity`, async (req, res) => {

  let sql1 = `select * from city where state_id='${state_id}';`
  let [allcity] = await db.execute(sql1);

})
app.get("/student/city", async (req, res) => {

  console.log("/studebnt/city")
  let id = req.query.state_id;
  let sql1 = `select city_id,city_name from city where state_id='${id}'`;
  let [data1] = await db.execute(sql1);
 
  res.send(data1);

});


app.get("/city", async (req, res) => {
  console.log("/city is active")
  let id = req.query.id;
 

  sql1 = `select city from student where student_id ='${id}'`;
  let [data1] = await db.execute(sql1);
 
  res.send(data1);
})

app.post("/update", async (req, res) => {



  let student_id = req.body.student_id;
  let name = req.body.name;
  let email = req.body.email;
  let contact = req.body.contact;
  let gender = req.body.gender;
  let address = req.body.address;
  let city = req.body.city;
  let state_id = req.body.state;
  let college_id = req.body.col;



  let sql4 = `update student set name='${name}',email='${email}',contact='${contact}',gender='${gender}',
     address='${address}',city='${city}', state_id = '${state_id}' ,college_id='${college_id}' where student_id=${student_id};`
  let [student3] = await db.execute(sql4);
  res.redirect('/user')


});






module.exports = app;