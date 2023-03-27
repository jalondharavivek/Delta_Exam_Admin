// const express = require('express')
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


const resultget = async(req,res) =>{
let sql = `select ee.exam_id , ee.exam_name ,ee.total_questions ,ee.exam_time ,ee.exam_status from exam_system.exam ee inner join
exam_system.user_answers uans on ee.exam_id = uans.exam_id;`
let [query] = await db.query(sql);
res.render('result',{data : query});
}
const page=async(req,res)=>{
    var i2=req.body.i2;
    var i1=i2-10;
    console.log(i1);
    console.log(i2);
    var text=req.body.text;

    var sql=`select * from user_answers a, exam b where a.exam_id=b.exam_id and  exam_name like      '%${text}%'  limit ${i1},${i2};`

    let [query] = await db.query(sql);
    console.log("mysql",query);
    res.json({query});
}

const viewresultget = async(req,res) =>{
let sql = `SELECT category_name FROM exam_system.exam a, exam_system.user_answers b
where a.exam_id=b.exam_id `;
let [query] = await db.query(sql);
res.render('viewresult',{data : query});
}




const viewquestionget = async (req,res) =>{
let sql = `select q.question_text , q.answer ,uans.user_answers , uans.marks from exam_system.questions q inner join
exam_system.user_answers uans on q.question_id=uans.question_id;`;
let [query] = await db.query(sql);
let sql1 = `select s.name from exam_system.student s inner join
exam_system.result r on s.student_id=r.student_id`;
let [stu_name] = await db.execute(sql1);
console.log(stu_name);

res.render('viewquestionresult',{data : query, stu_name:stu_name});
}




module.exports = { viewquestionget,viewresultget,resultget,page};