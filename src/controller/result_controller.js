var db = require('../connection/mysql');
require('../connection/module');

const studentlist = async (req, res) => {
  try {
    var sql1 = `select distinct a.name,b.user_id from student a, user_answers b, user_login c where b.user_id=c.user_id and c.email = a.email;`
    let [query1] = await db.query(sql1);
    res.render('../src/views/result', { data: query1});
  } catch (err) {
    res.send(err);
  }
}

const companylist = async (req, res) => {
  try 
  {
    var id = req.query.id;
    var sql = `select distinct a.exam_id,exam_name from user_answers a, exam b where a.exam_id=b.exam_id and a.user_id=${id}`

    let [query] = await db.query(sql);
    res.json({ query});
  } 
  catch (err) {
    res.send(err);
  }
}

const getexamdetail = async (req, res) => {

  try {
    var id = req.query.id;
    let sql = `select distinct a.category_id,category_name from exam_category a,category b where a.category_id=b.category_id and exam_id=${id}`;
    let [query] = await db.query(sql);
    res.json({ query });
  } 
  catch (err) {
    res.send(err);
  }

}

const viewquestionget = async (req, res) => {

  try {
   
    var id = req.body.exam_id;
    var user_id = req.body.user_id;
    let sql = `select b.question_id ,question_text,answer,user_answers from questions a,user_answers b where a.question_id=b.question_id AND b.exam_id=${id} AND b.user_id=${user_id}`;
    let [query] = await db.query(sql);
    res.json({ query});
  } catch (err) {
    res.send(err);
  }


}

const search = async (req,res) => {
  try
  {
    let search_value = req.body.search_value;
    let sql = `select distinct b.user_id,name from student a, user_answers b, user_login c where b.user_id=c.user_id and c.email = a.email and name like '%${search_value}%'`;
    let [query] = await db.query(sql);
    res.json({query})
  }
  catch(err)
  {
    console.log(err);
  }
}

module.exports = { viewquestionget, getexamdetail, studentlist, companylist,search};