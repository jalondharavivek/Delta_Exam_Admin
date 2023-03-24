// const express = require('express')
// const path = require('path')
// const app = express();
var db = require('../connection/mysql');
require('../connection/module')
// app.set("view engine", "ejs");
// var bodyParser=require('body-parser');
// app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json());



// app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, '/public/')))


const resultget = async(req,res) =>{
    let sql = `select ee.exam_id , ee.exam_name ,ee.total_questions ,ee.exam_time ,ee.exam_status  from  exam_system.exam ee inner join 
    exam_system.user_answers uans on ee.exam_id = uans.exam_id;`
     let [query] = await db.query(sql);
     console.log(query);
     res.render('result',{data : query});
}

const viewresultget =  async(req,res) =>{
    let sql = `SELECT category_name FROM exam_system.exam  a, exam_system.user_answers b 
    where a.exam_id=b.exam_id`;
     let [query] = await db.query(sql);
     console.log(query);
     res.render('viewresult',{data : query});
}



 
const viewquestionget = async (req,res) =>{
    let sql = `select q.question_text , q.answer ,uans.user_answers ,  uans.marks from exam_system.questions  q inner join 
    exam_system.user_answers uans on q.question_id=uans.question_id;`;
     let [query] = await db.query(sql);
     console.log(query);
     res.render('viewquestion',{data : query});
}


 

module.exports = { viewquestionget,viewresultget,resultget}; 
