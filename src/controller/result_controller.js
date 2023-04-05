var db = require('../connection/mysql');
require('../connection/module');

let limit = 1;
const studentlist = async (req, res) => {
  try {
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

    let count = Math.ceil(query2.length / limit);

    res.render('../src/views/result', { data: query1, count, limit, curpage });
  } catch (err) {
    res.send(err);
  }



}

const studentlistpage = async (req, res) => {

  try {
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

    let count = Math.ceil(query2.length / limit);


    res.json({ data: query1, count, limit, curpage });

  } catch (err) {
    res.send(err);
  }



}

const companylist = async (req, res) => {
  try {
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


    let count = Math.ceil(query2.length / limit);

    
    res.render("../src/views/companylist.ejs", { data: query, count, limit, curpage, id });
  } catch (err) {
    res.send(err);
  }



}
const companylistpage = async (req, res) => {

  try {
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


    let count = Math.ceil(query2.length / limit);



    res.json({ data: query, count, limit, curpage, id });
  } catch (err) {
    res.send(err);
  }


}

const getexamdetaile = async (req, res) => {

  try {
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
    let userid=req.query.userid;
    var id = req.query.id;
    let sql = `select distinct a.category_id,category_name from exam_category a,category b where a.category_id=b.category_id and exam_id=${id} limit ${offset},${limit}`;
    let [query] = await db.query(sql);

    var sql2 = `select distinct a.category_id,category_name from exam_category a,category b where a.category_id=b.category_id and exam_id=${id}`;
    let [query2] = await db.query(sql2);


    let count = Math.ceil(query2.length / limit);

    res.render('../src/views/getexamdetaile', { data: query, count, limit, curpage, id ,userid});
  } catch (err) {
    res.send(err);
  }

}
const getexamdetailepage = async (req, res) => {

  try {
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
    let userid=req.query.userid;
    var id = req.query.id;
    let sql = `select distinct a.category_id,category_name from exam_category a,category b where a.category_id=b.category_id and exam_id=${id} limit ${offset},${limit}`;
    let [query] = await db.query(sql);


    var sql2 = `select distinct a.category_id,category_name from exam_category a,category b where a.category_id=b.category_id and exam_id=${id}`;
    let [query2] = await db.query(sql2);


    let count = Math.ceil(query2.length / limit);



    res.json({ data: query, count, limit, curpage, id ,userid});
  } catch (err) {
    res.send(err);
  }

}
const viewquestionget = async (req, res) => {

  try {
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
    var userid=req.query.userid;
    var id = req.query.id;
    
    let sql = `select distinct question_text,answer,user_answers from questions a, user_answers b where a.question_id=b.question_id and category_id=${id} limit ${offset},${limit}`;
    let [query] = await db.query(sql);

    var sql2 = `select distinct question_text,answer,user_answers from questions a, user_answers b where a.question_id=b.question_id and category_id=${id}`;
    let [query2] = await db.query(sql2);

    let counter = Math.ceil(query2.length / limit);


    res.render('../src/views/viewquestionresult', { data: query, counter, limit, curpage, id });
  } catch (err) {
    res.send(err);
  }


}
const viewquestiongetpage = async (req, res) => {

  try {
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

    let counter = Math.ceil(query2.length / limit);

    res.json({ data: query, counter, limit, curpage, id });

  } catch (err) {
    res.send(err);
  }

}

module.exports = { viewquestionget, getexamdetaile, studentlist, companylist, studentlistpage, companylistpage, getexamdetailepage, viewquestiongetpage };
