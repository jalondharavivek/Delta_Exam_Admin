const express = require('express')
const path = require('path')
const app = express();
const mysql1 = require('mysql2')
const mysql = require("mysql2/promise");
const port = 8000;
app.set("view engine", "ejs");
const session = require('express-session');
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const body = require('body-parser');

// let cookieParser = require('cookie-parser');
// const bcrypt = require("bcryptjs");

app.use(body.urlencoded({ extended: false }));

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '/public')))

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

//delete in exam
app.get("/delete",async (req,res)=>{
  // console.log(req.query.exam_id);
  let sql1 = `update  exam_system.exam set isdelete = '1' where exam_id ='${req.query.exam_id}';`
  let data1 = await getdata(sql1);
  res.redirect("/examlist");
})

app.get("/edit",async(req,res)=>{
  console.log("enter in exam edit endpoint")
  console.log(req.query);

  let sql1 = `select * from exam_system.exam where exam_id=${req.query.exam_id};`
  
  let data1 = await getdata(sql1);
  console.log(data1);

  
  res.render("examedit",{data1});
})

app.post("/edit/:id",async (req,res)=>{
    console.log(req.body);
    // console.log(req.params)
    let id = req.params.id;
   
    let arr = id.split("=");
    let exam_id=  arr[1];
    

    let exam = req.body.exam_name;
    let category = req.body.category;
    let question = req.body.question;
    let time = req.body.time;
    let start_date = req.body.start_date;
    console.log(exam)
    console.log(category)
    console.log(question)
    console.log(time)
    console.log(start_date)

    let sql1 = `update exam_system.exam set exam_name='${exam}',category_id='${category}',total_questions='${question}',exam_time='${time}',exam_date='${start_date}' where exam_id='${exam_id}';`;
    let data1 = await getdata(sql1);
    res.redirect("/examlist");
})

app.get("/edit/option",async(req,res)=>{
  console.log("enter in exam edit endpoint")
  console.log(req.query);

  let sql1 = `select * from exam_system.exam where exam_id=${req.query.exam_id};`
  
  let data1 = await getdata(sql1);
  console.log(data1);

  res.send(data1);

})


//category loaded end-point through ajax
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

// exam app module end-points 
app.get("/examlist", async (req, res) => {

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

  console.log(req.query.num);
  

  if (isNaN(offset)) {
      offset = 0;
  }
  sql2 = `select count(*) as numrows from exam_system.exam where isdelete = '0';`;
  let data2  = await getdata(sql2);
  
  count = Math.ceil(data2[0].numrows / limit);

  console.log("count",count);

  sql1 = `select * from exam_system.exam where isdelete = '0' limit ${offset},${limit};`;
  let data1 = await getdata(sql1);
  console.log(data1);
  // con.query(`select * from insertdata  limit ${offset},${limit};`, function (err, result1) {
  //     if (err) throw err;
  //     data[1] = result1;
  //     res.render('pagination', { id, data: data, count: count, curpage, });
    
  // })

  // sql3 = `SELECT * FROM exam_system.exam where isdelete = '0';`;
  // let data3 = await getdata(sql3);
  // console.log(data1)
  console.log(curpage)
  console.log(data1)
  console.log(count)
  res.render("examlist", { data1 ,count, curpage });
})

app.get("/exam", async (req, res) => {
 
  res.render("exam");
})

app.post("/exam", async (req, res) => {
  console.log("vbjfdejfjhbg")
  console.log(req.body)
  let exam = req.body.exam_name;
  let question = req.body.question;
  let time = req.body.time;
  // let total_mark = req.body.total_mark;
  // let passing_mark = req.body.passing_mark;
  let start_date = req.body.start_date;
  let category = req.body.category;
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
    let str ="";
    let num = "0123456789";
    let lan = num.length;
    let random =  Math.floor(Math.random()*6);
   
    for(let i=0 ;i<6 ;i++){
      str += num.charAt(Math.floor(Math.random()*6)); 
      
    }
  sql1 = `INSERT INTO exam_system.exam (exam_name, total_questions, exam_time, exam_access_code, user_id, exam_status, exam_date, category_id, created_date) VALUES ( '${exam}', '${question}', '${time}', '${str}', '1', '1', '${start_date}', '${category}', NOW());`;

  let data1 = await getdata(sql1);
  console.log(data1);
  res.redirect("/examlist");
})

app.get("/exam/status",async (req,res)=>{
  console.log(req.query)
  let status = req.query.status;
  let id = req.query.id;

    if(status=='1'){
    
    sql1 = `update exam_system.exam set exam_status = 0 where exam_id='${id}' `
    let data1 = await getdata(sql1);

    }
    else{
      sql1 = `update exam_system.exam set exam_status = 1 where exam_id='${id}' `
      let data1 = await getdata(sql1);

    }
    res.redirect("/examlist")
})
// question page module end points by milan
app.get("/questionmilan", async (req, res) => {
  let sql1 = `SELECT * FROM exam_system.questions`;
  let data1 = await getdata(sql1);
  res.render("questionmilan", { data1 });
})
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


async function getdata(sql) {
  return await new Promise((res, rej) => {
    con.query(sql, (err, data) => {
      if (err) throw err;
      res(data);
    })
  })
}


app.listen(port, () => console.log(`port connected to ${port}!`))
