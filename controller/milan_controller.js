const express = require('express')
const path = require('path')
const app = express();
var db = require('../connection/mysql');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const body = require('body-parser');

app.set("view engine", "ejs");
app.use(cookieParser());
app.use(body.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '/public')));

const selectedcategory = async function(req,res){
    try {
        let arr = [];
    
        let exam_id = req.query.exam_id;
        let sql1 = `select category_id from exam_category where exam_id='${exam_id}'`;
        let [data1] = await db.execute(sql1);
    
        for (i = 0; i < data1.length; i++) {
    
          let sql2 = `select * from category where category_id='${data1[i].category_id}' `;
          let [data2] = await db.execute(sql2);
    
          arr.push(data2);
        }
    
        res.send(arr);
      } catch (err) {
        console.log(err);
      }
}

const edit = async function(req,res){
    try {
        let id = req.query.exam_id;
        let sql1 = `select * from exam_system.exam where exam_id=${id};`
        let [data1] = await db.execute(sql1);
        console.log(data1);
        res.render("examedit", { data1 });
      } catch (err) {
        console.log(err);
      }
}

const post_edit = async function(req,res){
    try {
        let exam = req.body.exam_name;
        let category = req.body.category;
        let question = req.body.question;
        let time = req.body.time;
        let start_date = req.body.start_date;
        let exam_id = req.body.exam_id;
    
        let strcat = ''; //str for store category in one line
    
        for (i = 0; i < category.length; i++) {
    
          sql3 = `select category_name from category where category_id='${category[i]}'`;
          let [data3] = await db.execute(sql3);
    
          strcat += data3[0].category_name;
          strcat += ', ';
        }
    
        let categories = strcat.substring(0, strcat.length - 2);
    
        let sql1 = `update exam_system.exam set exam_name='${exam}',total_questions='${question}',exam_time='${time}',exam_date='${start_date}',category_name='${categories}' where exam_id='${exam_id}';`;
        let [data1] = await db.execute(sql1);
    
        let appid = data1.insertId;
    
        for (i = 0; i < category.length; i++) {
    
          let sql2 = `insert into exam_category (exam_id,category_id) values ('${appid}',${category[i]});`;
          let [data2] = await db.execute(sql2);
    
        }
        res.redirect("/examlist");
      } catch (err) {
        console.log(err);
      }
}

const editoption = async(req, res) => {
    try {
        let sql1 = `select * from exam_system.exam where exam_id=${req.query.exam_id};`
        let [data1] = await db.execute(sql1);
        res.send(data1);
      } catch (err) {
        console.log(err)
      }
}

const categories = async(req, res) => {

  try {
    let sql1 = `SELECT * FROM exam_system.category;`;
    let [data1] = await db.execute(sql1);
    let arr = [];
    let arr2 = [];

    for (let i = 0; i < data1.length; i++) {
      arr.push(data1[i].category_name)
      arr2.push(data1[i].category_id)
    }

    res.json({ arr, arr2 });
  } catch (err) {
    console.log(err);
  }

}

const examlist = async(req, res) => {
    try {
        if (req.query.exam_name == null || req.query.exam_name == "''") {
    
        } else {
    
          let exam_name = req.query.exam_name;
    
          let sql4 = `select * from exam where exam_name like '%${exam_name}%'`;
    
          let [data1] = await db.execute(sql4);
    
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
    
    
        if (isNaN(offset)) {
          offset = 0;
        }
        sql2 = `select count(*) as numrows from exam_system.exam ;`;
        let [data2] = await db.execute(sql2);
    
        count = Math.ceil(data2[0].numrows / limit);
    
        sql1 = `select * from exam_system.exam limit ${offset},${limit};`;
        let [data1] = await db.execute(sql1);
    
        res.render("examlist", { data1, count, curpage });
      } catch (err) {
        console.log(err);
      }
}

const exam = async function(req, res){
    try {
        res.render("exam");
    
      } catch (err) {
        console.log(err)
      }
}

const post_exam = async (req, res) => {

  try {
    let exam = req.body.exam_name;
    let question = req.body.question;
    let time = req.body.time;

    let start_date = req.body.start_date;
    let category = req.body.category;
    let strcat = ''; //str for store category in one line
    for (i = 0; i < category.length; i++) {
      sql3 = `select category_name from category where category_id='${category[i]}'`;
      let [data3] = await db.execute(sql3);

      strcat += data3[0].category_name;
      strcat += ', ';
    }
    let categories = strcat.substring(0, strcat.length - 2);



    let str = "";
    let num = "0123456789";
    let lan = num.length;
    let random = Math.floor(Math.random() * 6);

    for (let i = 0; i < 6; i++) {
      str += num.charAt(Math.floor(Math.random() * 6));

    }
    sql1 = `INSERT INTO exam_system.exam (exam_name, total_questions, exam_time, exam_access_code, user_id, exam_status, exam_date,  created_date, category_name) VALUES ( '${exam}', '${question}', '${time}', '${str}', '1', '1', '${start_date}',  NOW(),'${categories}');`;
    let [data1] = await db.execute(sql1);
    let appid = data1.insertId;

    for (i = 0; i < category.length; i++) {

      let sql2 = `insert into exam_category (exam_id,category_id) values ('${appid}',${category[i]});`;
      let [data2] = await db.execute(sql2);

    }
    res.redirect("/examlist");
  } catch (err) {
    console.log(err)
  }
}

const examstatus = async (req, res) => {
    try {
        let status = req.query.status;
        let id = req.query.id;
    
        if (status == '1') {
    
          sql1 = `update exam_system.exam set exam_status = 0 where exam_id='${id}' `
          let [data1] = await db.execute(sql1);
          res.send(data1)
        }
        else {
          sql1 = `update exam_system.exam set exam_status = 1 where exam_id='${id}' `
          let [data1] = await db.execute(sql1);
          res.send(data1)
        }
      } catch (err) {
        console.log(err)
      }
}

module.exports = {selectedcategory,edit,post_edit,editoption,categories,examlist,exam,post_exam,examstatus};
