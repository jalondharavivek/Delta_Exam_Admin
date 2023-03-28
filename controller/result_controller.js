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

const studentlist= async(req,res) =>{
    var sql=`select exam_id,name,b.user_id from student a, user_answers b, user_login c where b.user_id=c.user_id;`
    let [query] = await db.query(sql);
    res.render('result',{data : query});
}
const companylist= async(req,res) =>{
    var id=req.query.id;
    var sql=`select  a.exam_id,exam_name from user_answers a, exam b where a.exam_id=b.exam_id and a.user_id=${id};`
    let [query] = await db.query(sql);
    res.render('companylist',{data : query});
}

 const getexamdetaile=async(req,res) =>{
    var id=req.query.id;
    let sql = `select a.category_id,category_name from exam_category a,category b where a.category_id=b.category_id and exam_id=${id}`;
    let [query] = await db.query(sql);
    res.render('getexamdetaile',{data : query});
}
const viewquestionget = async (req,res) =>{
    var id=req.query.id;
    let sql = `select question_text,answer,user_answers from questions a, user_answers b where a.question_id=b.question_id and category_id=${id}`;
    let [query] = await db.query(sql);
    res.render('viewquestionresult',{data : query});
}

module.exports = { viewquestionget,getexamdetaile,studentlist,companylist};