const express = require('express')
const path = require('path')
const app = express();
var db = require('../connection/mysql');
app.set("view engine", "ejs");
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '/public/')))


let limit = 1;
const studentlist = async (req, res) => {

  var data = [];
  let count1;

  // let id = req.query.id;
  let page = req.query.num || 1;

  // string to int 
  let curpage = parseInt(req.query.num) || 1;

  // declare limit and offset 

  let offset = (page - 1) * limit;


  if (isNaN(offset)) {
    offset = 0;
  }


  var sql1 = `select distinct a.name,b.user_id,exam_id from student a, user_answers b, user_login c where b.user_id=c.user_id and c.email = a.email limit ${offset},${limit};`
  let [query1] = await db.query(sql1);


  var sql2 = `select distinct a.name,b.user_id from student a, user_answers b, user_login c where b.user_id=c.user_id and c.email = a.email;`;
  let [query2] = await db.query(sql2);

  let count = query2.length / limit;

  res.render('result', { data: query1, count, limit, curpage });


}

const studentlistpage = async (req, res) => {

  var data = [];
  let count1;

  // let id = req.query.id;
  let page = req.query.num || 1;

  // string to int 
  let curpage = parseInt(req.query.num) || 1;

  // declare limit and offset 

  let offset = (page - 1) * limit;


  if (isNaN(offset)) {
    offset = 0;
  }


  var sql1 = `select distinct a.name,b.user_id from student a, user_answers b, user_login c where b.user_id=c.user_id and c.email = a.email limit ${offset},${limit};`
  let [query1] = await db.query(sql1);

  var sql2 = `select distinct a.name,b.user_id from student a, user_answers b, user_login c where b.user_id=c.user_id and c.email = a.email;`;
  let [query2] = await db.query(sql2);

  let count = query2.length / limit;


  res.json({ data: query1, count, limit, curpage });


}

const companylist = async (req, res) => {


  var data = [];
  let count1;

  // let id = req.query.id;
  let page = req.query.num || 1;

  // string to int 
  let curpage = parseInt(req.query.num) || 1;

  // declare limit and offset 

  let offset = (page - 1) * limit;


  if (isNaN(offset)) {
    offset = 0;
  }


  var id = req.query.id;
  var sql = `select distinct a.exam_id,exam_name from user_answers a, exam b where a.exam_id=b.exam_id and a.user_id=${id} limit ${offset},${limit};`

  let [query] = await db.query(sql);


  var sql2 = `select  distinct a.exam_id,exam_name from user_answers a, exam b where a.exam_id=b.exam_id and a.user_id=${id};`;

  let [query2] = await db.query(sql2);


  let count = query2.length / limit;



  res.render("companylist.ejs",{ data: query, count, limit, curpage, id });

}
const companylistpage = async (req, res) => {


  var data = [];
  let count1;

  // let id = req.query.id;
  let page = req.query.num || 1;

  // string to int 
  let curpage = parseInt(req.query.num) || 1;

  // declare limit and offset 

  let offset = (page - 1) * limit;


  if (isNaN(offset)) {
    offset = 0;
  }


  var id = req.query.id;
  var sql = `select distinct a.exam_id,exam_name from user_answers a, exam b where a.exam_id=b.exam_id and a.user_id=${id} limit ${offset},${limit};`

  let [query] = await db.query(sql);


  var sql2 = `select  distinct a.exam_id,exam_name from user_answers a, exam b where a.exam_id=b.exam_id and a.user_id=${id};`;

  let [query2] = await db.query(sql2);


  let count = query2.length / limit;



  res.json({ data: query, count, limit, curpage, id });

}

const getexamdetaile = async (req, res) => {
  var data = [];
  let count1;

  // let id = req.query.id;
  let page = req.query.num || 1;

  // string to int 
  let curpage = parseInt(req.query.num) || 1;

  // declare limit and offset 

  let offset = (page - 1) * limit;


  if (isNaN(offset)) {
    offset = 0;
  }

  var id = req.query.id;
  let sql = `select distinct a.category_id,category_name from exam_category a,category b where a.category_id=b.category_id and exam_id=${id} limit ${offset},${limit}`;
  let [query] = await db.query(sql);

  var sql2 = `select distinct a.category_id,category_name from exam_category a,category b where a.category_id=b.category_id and exam_id=${id}`;
  let [query2] = await db.query(sql2);


  let count = query2.length / limit;

  res.render('getexamdetaile', { data: query, count, limit, curpage, id });
}
const getexamdetailepage = async (req, res) => {
  var data = [];
  let count1;

  // let id = req.query.id;
  let page = req.query.num || 1;

  // string to int 
  let curpage = parseInt(req.query.num) || 1;

  // declare limit and offset 

  let offset = (page - 1) * limit;


  if (isNaN(offset)) {
    offset = 0;
  }

  var id = req.query.id;
  let sql = `select distinct a.category_id,category_name from exam_category a,category b where a.category_id=b.category_id and exam_id=${id} limit ${offset},${limit}`;
  let [query] = await db.query(sql);


  var sql2 = `select distinct a.category_id,category_name from exam_category a,category b where a.category_id=b.category_id and exam_id=${id}`;
  let [query2] = await db.query(sql2);


  let count = query2.length / limit;



  res.json({ data: query, count, limit, curpage, id });
}
const viewquestionget = async (req, res) => {
  var data = [];
  let count1;

  // let id = req.query.id;
  let page = req.query.num || 1;

  // string to int 
  let curpage = parseInt(req.query.num) || 1;

  // declare limit and offset 

  let offset = (page - 1) * limit;


  if (isNaN(offset)) {
    offset = 0;
  }

  var id = req.query.id;
  let sql = `select distinct question_text,answer,user_answers from questions a, user_answers b where a.question_id=b.question_id and category_id=${id} limit ${offset},${limit}`;
  let [query] = await db.query(sql);

  var sql2 = `select distinct question_text,answer,user_answers from questions a, user_answers b where a.question_id=b.question_id and category_id=${id}`;
  let [query2] = await db.query(sql2);

  let counter = query2.length / limit;


  res.render('viewquestionresult', { data: query, counter, limit, curpage, id });
}
const viewquestiongetpage = async (req, res) => {
  var data = [];
  let count1;

  // let id = req.query.id;
  let page = req.query.num || 1;

  // string to int 
  let curpage = parseInt(req.query.num) || 1;

  // declare limit and offset 

  let offset = (page - 1) * limit;


  if (isNaN(offset)) {
    offset = 0;
  }

  var id = req.query.id;
  let sql = `select distinct question_text,answer,user_answers from questions a, user_answers b where a.question_id=b.question_id and category_id=${id} limit ${offset},${limit}`;
  let [query] = await db.query(sql);

  var sql2 = `select distinct question_text,answer,user_answers from questions a, user_answers b where a.question_id=b.question_id and category_id=${id}`;
  let [query2] = await db.query(sql2);

  let counter = query2.length / limit;

  res.json({ data: query, counter, limit, curpage, id });
}

module.exports = { viewquestionget, getexamdetaile, studentlist, companylist, studentlistpage, companylistpage, getexamdetailepage, viewquestiongetpage };