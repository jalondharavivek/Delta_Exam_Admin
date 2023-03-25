// const express = require('express')
// const path = require('path')
// const app = express();
// var bodyParser=require('body-parser');
// app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json());

var db = require('../connection/mysql');
require('../connection/module')
// app.set("view engine", "ejs");

// app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, '/public')))














const question = async(req,res)=>{
    let que = `select * from questions where question_status = '1'`
    let quecat = ``
    let page = req.query.page || 1;
    let limit = req.query.limit || 10;
    if (req.query.page > 1)
     que += ` LIMIT ${((page - 1) * limit)}, ${limit}`;
    else
     que += ` LIMIT ${limit} `;
  let [questiontab] = await db.execute(que);
  let sql1que = `select count(*) as total from questions  `;
  let [resultque] = await db.query(sql1que);
  res.render("question", { data: questiontab,page : page, totalque: resultque[0].totalque, limit: limit })
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
  let [category] = await db.query(`select category_name,a.category_id from category a,questions b where a.category_id=b.category_id and question_id='${viewid}' and question_status='1' `)
  let [viewques] = await db.query(viewsql);

 
  res.render("viewquestion", { data : viewques , data1:category});
}

const editquestionget = async(req,res)=>{
    
    let id = req.query.question_id;
   
    let editquesql = `select * from  questions  where question_id = ${id}`;
    let [editques] = await db.query(editquesql);
    let [category] = await db.query(`select category_name,a.category_id from category a,questions b where a.category_id=b.category_id and question_id='${id}' and question_status='1' `)
    let catque = `select * from category where category_status = 1`
    let [catfque1] = await db.execute(catque);
    // console.log(catfque1,":::::::cat")
    res.render("editquestion", { data: editques , data1: catfque1 , data2:category})
// console.log(category,":::::222")
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


const deletquestion = async(req,res) =>{
    try{
    let id = req.query.question_id;
   
    let deletquesql = `update questions set question_status = '0' where question_id = '${id}'; `
    let [deletquesql1] = await db.query(deletquesql)
   
    res.redirect("/question")
    }catch(err){
        err
    }
   
}




const searchget = async(req,res)=>{
    let page=parseInt(req.query.page)||1;
    let limit=parseInt(req.query.limit)||10;
    let startindex=(page-1)*limit;
    let endindex=page*limit-startindex;
    let sqlque = `select * from questions where question_status = '1'`
    let name1 = req.query.nameque;
    console.log(name1,"::::name search")
    console.log(name1, "search name in js ")
    let [queryque] = await db.execute(sqlque)
    
    let sqlquet = `select count(*) as total from questions where question_text like '%${name1}%' and question_status = '1'`;
    let [resultque] = await db.query(sqlquet);
    let pagesq = `select * from questions where question_status = '1' AND question_status = '1' limit ${startindex},${endindex}`;
    let [pagesques] = await db.query(pagesq);
    let sqlque1 = `select * from questions where question_text like '%${name1}%' AND question_status = '1' limit ${startindex},${endindex}; `
    let [sqlque2] = await db.execute(sqlque1)

    res.json({ datas : queryque, search: sqlque2, page: page, totalque: resultque[0].totalque, limit: limit, pages : pagesques});
}




///retrive question (deleted questiob)


const retrivequestions = async(req,res)=>{
    let sqlretrivequery = `select * from questions where question_status =  '0' `
    let [sqlretriveexecute] = await db.query(sqlretrivequery)

    res.json({data :sqlretriveexecute })
}


//rertrivequestion post question
const retrivequestionpost = async(req,res)=>{
    try{
    id = req.query.requeid;
    let sqlretpost = `update questions set question_status = '1' where question_id = ${id}`
   let [retquext] = db.execute(sqlretpost)
    res.redirect("/question")
    }catch(err){
        err
    }
}

module.exports = {question,addquestion,addquestionpost,viewdetail,editquestionget,editquestionpost,deletquestion,
searchget,retrivequestions,retrivequestionpost}; 