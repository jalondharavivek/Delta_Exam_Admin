// // const express = require('express')
// const path = require('path')
// const app = express();
var db = require('../connection/mysql');
require('../connection/module');
// app.set("view engine", "ejs");
// var bodyParser=require('body-parser');
// app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json());



// app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, '/public/')))

let student_id_g;
let student_name_g;
const resultget = async (req, res) => {
    let sql = `select distinct(exam_name)  from user_answers a, exam b where a.exam_id=b.exam_id`;
    let [query] = await db.query(sql);
    let exam = `SELECT * FROM exam;`;
    let [exam_q] = await db.query(exam);
    
         
    let exam_id = req.query.exam_id;
  
    let sql2 = `select category_name from exam_category a,category b where a.category_id=b.category_id 
    and exam_id = '${exam_id}'`;
    let [query1] = await db.query(sql2);
  
  
      let category = `SELECT * FROM category;`;
      let [category_q] = await db.query(category);
     
      let cat_id = req.query.category_id;
  
      let sql3 = `select  question_text , user_answers , answer , marks  from user_answers a,questions b where a.question_id=b.question_id and b.category_id= '${cat_id}'`;
       let [query3] = await db.query(sql3);
      
      for(let j=0;j<query3.length;j++)
      {
         student_id_g=query3[j].student_id;
      }


       let sql4 = `SELECT  name FROM student WHERE student_id = '${student_id_g}'`;  
       let [student_name] = await db.query(sql4);

       for(let k=0;k<student_name.length;k++)
       {
          student_name_g=student_name[k].name;
       }

        
    res.render("result", { data: query , exam_q:exam_q , query1 :query1, query3 :query3, category_q :category_q, student_name_g : student_name_g});
  };
  
module.exports = { resultget};