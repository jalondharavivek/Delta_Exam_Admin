const express = require('express')
const path = require('path')
const app = express();
const mysql1 = require('mysql2')
const mysql = require("mysql2/promise");
const port = 8765;
app.set("view engine", "ejs");
const session = require('express-session');
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const body = require('body-parser');
// const { get } = require('http');
// const { emit } = require('process');

// let cookieParser = require('cookie-parser');
// const bcrypt = require("bcryptjs");

app.use(body.urlencoded({ extended: false }));

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '/public')));

// const db = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "root",
//   database: "exam_system",
// });

const con = mysql1.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'exam_system'
});

con.connect(function (err) {
  if (err) throw err;
  console.log('connected!')
})

//new work is start
//register page
//register page render
app.get("/mregister", async (req, res) => {
  let sql1 = `SELECT * FROM state`;
  let data1 = await getdata(sql1);



  let sql3 = 'select * from colleges';
  let data3 = await getdata(sql3);
  res.render("mregister", { data1, data3 });
})
//register page form submit on post end-point
app.post("/mregister", async (req, res) => {
  let { name, email, psw, gender, state, city, collage, address, phone } = req.body;
  console.log(req.body);

  let sql1 = `INSERT INTO student ( name, email, password, contact, gender, address, city, state_id,  college_id, created_date) VALUES ('${name}', '${email}', '${psw}', '${phone}', '${gender}', '${address}', '${city}', '${state}', '${collage}', current_timestamp());`;
  let data1 = await getdata(sql1);

  let appid = data1.insertId;

  sql2 = `update student set student_status='1' where student_id='${appid}'`;
  let data2 = await getdata(sql2);

  let sql3 = `INSERT INTO user_login (  email, password) VALUES ('${email}', '${psw}');`;
  let data3 = await getdata(sql3);

  let insertid = data3.insertId;

  let sql4 = `update user_login set  role = '1' , user_login_status='1' where user_id='${insertid}' `;
  let data4 = await getdata(sql4);

  res.json({ data4 });

})

//city render emdpoint
app.get("/mcity", async (req, res) => {
  let state = req.query.state;
  console.log(req.query);
  sql1 = `select state_id from state where state_id = ${state}`
  let data1 = await getdata(sql1);
  let state_id = data1[0].state_id;

  let sql2 = `select * from city where state_id = ${state_id}`;
  let data2 = await getdata(sql2);
  console.log(data2);
  res.send(data2);
})


//show already selected category in exam edit page keje already save chhe
app.get('/selected/category', async (req, res) => {
  let arr = [];
  console.log(req.query);
  let exam_id = req.query.exam_id;
  let sql1 = `select category_id from exam_categoty where exam_id='${exam_id}'`;
  let data1 = await getdata(sql1);

  for (i = 0; i < data1.length; i++) {
    let sql2 = `select * from category where category_id='${data1[i].category_id}' `;
    let data2 = await getdata(sql2);
    // console.log(data2);
    arr.push(data2);
  }
  console.log(arr);
  res.send(arr);

})


//extra feature end point
app.get('/admin/permission',async(req,res)=>{

  let sql1 = `select * from user_login where role = '1'`;
  let data1 = await getdata(sql1);
  console.log(data1);
  res.render("adminpermission",{data1});
})
//new work is enddedd
// manoj category  section
app.get('/category', async (req, res) => {
  let sql = "SELECT category_name,category_status, FORMAT(Date(created_date),'yyyy/mm/dd') AS Created_Date FROM category";
  let [query] = await db.query(sql);
  // console.log(query);
  res.render('category', { data: query });
})

//dashboard endpoints
app.get('/', (req, res) => {
  // req.session.name = "john";

  res.render("dashboard")


});

//delete in exam extra feature delete end-pont
app.get("/delete", async (req, res) => {
  // console.log(req.query.exam_id);
  let sql1 = `update  exam_system.exam set isdelete = '1' where exam_id ='${req.query.exam_id}';`
  let data1 = await getdata(sql1);
  res.redirect("/examlist");
})
//edit exam endpoint page render end-pont
app.get("/edit", async (req, res) => {
  console.log("enter in exam edit endpoint")
  console.log(req.query);

  let sql1 = `select * from exam_system.exam where exam_id=${req.query.exam_id};`

  let data1 = await getdata(sql1);
  console.log(data1);


  res.render("examedit", { data1 });
})


//finally edit exam post method end-pont
app.post("/edit/:id", async (req, res) => {

  console.log("/edit/:id");
  console.log(req.body);
  console.log(req.params)
  let id = req.params.id;

  let arr = id.split("=");
  let exam_id = arr[1];

  let exam = req.body.exam_name;
  let category = req.body.category;
  let question = req.body.question;
  let time = req.body.time;
  let start_date = req.body.start_date;
  // console.log(exam)
  // console.log(category)
  // console.log(question)
  // console.log(time)
  // console.log(start_date)
  let strcat = ''; //str for store category in one line
  for(i=0 ;i<category.length ;i++){
  sql3 = `select category_name from category where category_id='${category[i]}'`;
  let data3 = await getdata(sql3);
    console.log(data3[0].category_name);
    strcat+= data3[0].category_name;
    strcat += ', ';
  }
   let categories = strcat.substring(0,strcat.length-2);
   console.log(categories);

  let sql1 = `update exam_system.exam set exam_name='${exam}',total_questions='${question}',exam_time='${time}',exam_date='${start_date}',category='${categories}' where exam_id='${exam_id}';`;
  let data1 = await getdata(sql1);
  let appid = data1.insertId;

  for (i = 0; i < category.length; i++) {

    let sql2 = `insert into exam_categoty (exam_id,category_id) values ('${appid}',${category[i]});`;
    let data2 = await getdata(sql2);

  }
  res.redirect("/examlist");


})


//unknown end-point where is this use this database
app.get("/edit/option", async (req, res) => {
  console.log("enter in exam edit endpoint")
  console.log(req.query);

  let sql1 = `select * from exam_system.exam where exam_id=${req.query.exam_id};`

  let data1 = await getdata(sql1);
  console.log(data1);

  res.send(data1);

})

//category loaded end-point through ajax
// category loaded in exam create and exam upadte or edit page
app.get("/categories", async (req, res) => {
  let sql1 = `SELECT * FROM exam_system.category;`;
  let data1 = await getdata(sql1);
  let arr = [];
  let arr2 = [];

  for (let i = 0; i < data1.length; i++) {
    arr.push(data1[i].category_name)
    arr2.push(data1[i].category_id)
  }

  res.json({ arr, arr2 });
})

// exam app module end-points with pagination 
app.get("/examlist", async (req, res) => {

  if (req.query.exam_name == null || req.query.exam_name == "''") {
    
  } else {

    let exam_name = req.query.exam_name;
    console.log(req.query.exam_name)
    console.log("value aavi gay")
    let sql4 = `select * from exam where exam_name like '%${exam_name}%'`;
    // console.log(sql4);
    let data1 = await getdata(sql4);
    console.log(data1);
    res.send(data1);

  }
  var data = [];
  let count;

  // let id = req.query.id;
  let page = req.query.num || 1;

  // string to int 
  let curpage = parseInt(req.query.num);

  // declare limit and offset 
  let limit = 2;
  let offset = (page - 1) * limit;

  // declare and access curorder and odrtype
  // let curorder = req.query.curorder;
  // let odrtype = req.query.odrtype;

  // if (req.query.curorder) {
  //     curorder = req.query.curorder;
  //     odrtype = req.query.odrtype;

  // } else { // first time loading the url by default value
  //     curorder = id;
  //     curpage = 1;
  //     odrtype = 'ASC';
  // }

  // console.log(req.query.num);


  if (isNaN(offset)) {
    offset = 0;
  }
  sql2 = `select count(*) as numrows from exam_system.exam where isdelete = '0';`;
  let data2 = await getdata(sql2);

  count = Math.ceil(data2[0].numrows / limit);

  // console.log("count",count);

  sql1 = `select * from exam_system.exam limit ${offset},${limit};`;
  let data1 = await getdata(sql1);
  
  // console.log(data1);
  // con.query(`select * from insertdata  limit ${offset},${limit};`, function (err, result1) {
  //     if (err) throw err;
  //     data[1] = result1;
  //     res.render('pagination', { id, data: data, count: count, curpage, });

  // })

  // sql3 = `SELECT * FROM exam_system.exam where isdelete = '0';`;
  // let data3 = await getdata(sql3);
  // console.log(data1)
  // console.log(curpage)
  // console.log(data1)
  // console.log(count)
   

  

  res.render("examlist", { data1, count, curpage });

})
//exam serching
app.get("")

//show exam create page
app.get("/exam", async (req, res) => {

  res.render("exam");
})
//create exam endpoint on post method
app.post("/exam", async (req, res) => {

  console.log(req.body)
  let exam = req.body.exam_name;
  let question = req.body.question;
  let time = req.body.time;
  // let total_mark = req.body.total_mark;
  // let passing_mark = req.body.passing_mark;
  let start_date = req.body.start_date;
  let category = req.body.category;
   let strcat = ''; //str for store category in one line
  for(i=0 ;i<category.length ;i++){
  sql3 = `select category_name from category where category_id='${category[i]}'`;
  let data3 = await getdata(sql3);
    console.log(data3[0].category_name);
    strcat+= data3[0].category_name;
    strcat += ', ';
  }
   let categories = strcat.substring(0,strcat.length-2);
   console.log(categories);
  
  // let end_date = req.body.end_date;

  // random string code 
  // function generateRandomString(length) {
  //   const symbols = "!@#$%^&*()_+{}:\"<>?'[]\\;,./";
  //   const alphanumeric = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  //   const characters = symbols + alphanumeric;

  //   let result = '';
  //   for (let i = 0; i < length; i++) {
  //     const randomIndex = Math.floor(Math.random() * characters.length);
  //     result += characters[randomIndex];
  //   }
  //   return result;
  // }

  // const random = generateRandomString(10);
  // console.log(random)
  //random string end
  let str = "";
  let num = "0123456789";
  let lan = num.length;
  let random = Math.floor(Math.random() * 6);

  for (let i = 0; i < 6; i++) {
    str += num.charAt(Math.floor(Math.random() * 6));

  }
  sql1 = `INSERT INTO exam_system.exam (exam_name, total_questions, exam_time, exam_access_code, user_id, exam_status, exam_date,  created_date, category) VALUES ( '${exam}', '${question}', '${time}', '${str}', '1', '1', '${start_date}',  NOW(),'${categories}');`;
  let data1 = await getdata(sql1);
  let appid = data1.insertId;

  for (i = 0; i < category.length; i++) {

    let sql2 = `insert into exam_categoty (exam_id,category_id) values ('${appid}',${category[i]});`;
    let data2 = await getdata(sql2);

  }
  res.redirect("/examlist");
})
//exam ststus enable or disable button endpoint
app.get("/exam/status", async (req, res) => {
  console.log(req.query)
  let status = req.query.status;
  let id = req.query.id;

  if (status == '1') {

    sql1 = `update exam_system.exam set exam_status = 0 where exam_id='${id}' `
    let data1 = await getdata(sql1);
    res.send(data1)


  }
  else {
    sql1 = `update exam_system.exam set exam_status = 1 where exam_id='${id}' `
    let data1 = await getdata(sql1);
    res.send(data1)
  }
 
})


// question page module end points by milan
app.get("/questionmilan", async (req, res) => {
  let sql1 = `SELECT * FROM exam_system.questions`;
  let data1 = await getdata(sql1);
  res.render("questionmilan", { data1 });
});

//question created by milan
app.post("/questionmilan", async (req, res) => {
  let question = req.body.question;
  let option = req.body.option;
  let a = req.body.a;
  let b = req.body.b;
  let c = req.body.c;
  let d = req.body.d;
  let category = req.body.category;

  let sql1 = `INSERT INTO exam_system.questions (question_text, answer, category_id, option_a, option_b, option_c, option_d) VALUES ('${question}', '${option}', '${category}', '${a}', '${b}', '${c}', '${d}');`;
  let data1 = await getdata(sql1);

  res.redirect("/questionmilan");
})



//function for query execute
async function getdata(sql) {
  return await new Promise((res, rej) => {
    con.query(sql, (err, data) => {
      if (err) throw err;
      res(data);
    })
  })
}


app.listen(port, () => console.log(`port connected to ${port}!`))
module.exports = app;
