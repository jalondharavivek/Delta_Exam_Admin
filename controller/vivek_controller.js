const express = require('express')
const path = require('path')
const app = express();
var bodyParser = require('body-parser');

var db = require('../connection/mysql');
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '/public')))




const question = async(req,res)=>{
    let que = `select * from questions`
  let [questiontab] = await db.execute(que);
  
  res.render("question", { data: questiontab })
}



const addquestion = async(req,res)=>{
    let catque = `select * from category where category_status = 1`
  let [catfque] = await db.execute(catque);
 
  res.render("addquestion", { data: catfque });
}

const addquestionpost = async(req,res)=>{

    var category_id = req.body.category;
    
    var question_text = req.body.question_text;
    
    var option_a = req.body.option_a;
    var option_b = req.body.option_b;
    var option_c = req.body.option_c;
    var option_d = req.body.option_d;
    var answer = req.body.answer;
  
    var addquestionquery = `insert into questions(question_text,option_a,option_b,option_c,option_d,answer,category_id) values('${question_text}','${option_a}','${option_b}','${option_c}','${option_d}','${answer}','${category_id}')`;
    
  
    let execute = await db.execute(addquestionquery);
    if (execute.length) {
      
    }
  
  
   
    res.redirect("/question");



}

const viewdetail = async(req,res)=>{
    let viewid = req.query.question_id
  console.log(viewid, "::::view id ")
  let viewsql = `select * from questions where question_id = ${viewid}`
  let [viewques] = await db.query(viewsql);
 
  res.render("viewquestion", { data : viewques });
}

const editquestionget = async(req,res)=>{
    
    let id = req.query.question_id;
   
    let editquesql = `select * from  questions  where question_id = ${id}`;
    let [editques] = await db.query(editquesql);
    let [category] = await db.query(`select category_name , category.category_id from category join questions on questions.question_id = category.category_id where category_status = '1'`)
    
    res.render("editquestion", { data: editques, data1: category })

}

const editquestionpost = async(req,res)=>{
    var question_id = req.body.question_id;
  
    var category_id = req.body.category;
    
    var question_text = req.body.question_text;
 
    var option_a = req.body.option_a;
    var option_b = req.body.option_b;
    var option_c = req.body.option_c;
    var option_d = req.body.option_d;
    var answer = req.body.answer;
  
    let updateque = `update questions set question_text = '${question_text}' , option_a = '${option_a}' , option_b = '${option_b}' , option_c = '${option_c}', option_d = '${option_d}' , answer = '${answer}' , category_id = '${category_id}' where question_id = ${question_id} `
    let [editquepost] = await db.query(updateque);
    if (editquepost.length) {
     
    }
  
    res.redirect("/question")
}


const deletquestionget = async(req,res) =>{
    let id = req.query.question_id;
    let deletquesql = `select * from questions where question_id = '${id}' `
    let [quedlt] = await db.execute(deletquesql)
}




const searchget = async(req,res)=>{
    let sqlque = `select * from questions`
    let name = req.query.name;
    console.log(name, "search name 9in js ")
    let [queryque] = await db.execute(sqlque)
    let sqlque1 = `select * from questions where question_text like '%${name}%' `
    let [sqlque2] = await db.execute(sqlque1)
  
    res.json({ datas : queryque, search: sqlque2 });
}



//search module 




// app.listen(port, () => console.log(`  port connected to ${port}!`))
module.exports = {question,addquestion,addquestionpost,viewdetail,editquestionget,editquestionpost,deletquestionget
,searchget
}; 