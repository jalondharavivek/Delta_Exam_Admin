const express = require('express')
const path = require('path')
const app = express();
const mysql = require("mysql2/promise");
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
// const port = 8765;

app.set("view engine", "ejs");

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '/public')))

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "exam_system",
});

//question module get request


app.get('/question', async (req, res) => {
  console.log("dwuihdyuwhfyushyushdfhuwhfyuhryu");
  let que = `select * from questions `
  let [questiontable] = await db.execute(que);
  console.log(questiontable, "question table log");
  
  res.render("question", { data : questiontable })
});



// add question get request
app.get('/addquestion', async (req, res) => {
  let catque = `select * from category where category_status = 1`
  let [catfque] = await db.execute(catque);
  console.log(catfque, "category log ");
  res.render("addquestion", { data: catfque });

});


// add question post request
app.post('/addquestion', async (req, res) => {
  console.log("vvivdvv")
  var category_id = req.body.category;
  console.log(category_id,"category id for store in db");
  var question_text = req.body.question_text;
  console.log("request body :::::::", req.body);
  console.log(question_text, "fsdfsdfsdf");
  var option_a = req.body.option_a;
  var option_b = req.body.option_b;
  var option_c = req.body.option_c;
  var option_d = req.body.option_d;
  var answer = req.body.answer;
  console.log(Array.isArray(question_text));
  // if (Array.isArray(question_text)) {

  //   for (var i = 0; i < question_text.length; i++) {
  //     var addquestionquery = `insert into questions(question_text,option_a,option_b,option_c,option_d,answer) values("${question_text[i]}"
  //    ,"${option_a[i]}","${option_b[i]}","${option_c[i]}","${option_d[i]}","${answer[i]}")`

  //     console.log("question  dvbsdvgsdvfallinsertted")
  //     let execute = await db.execute(addquestionquery);
  //     if (execute[0].length) {
  //       console.log("question allinsertted")
  //     }
  //   }

  // } else {
    console.log("up ");
    var addquestionquery = `insert into questions(question_text,option_a,option_b,option_c,option_d,answer,category_id) values('${question_text}','${option_a}','${option_b}','${option_c}','${option_d}','${answer}','${category_id}')`;
    console.log("down");

    let execute = await db.execute(addquestionquery);
    if (execute.length) {
      console.log("question  1  insertted")
    }


  // }
// res.end();
res.redirect("/question");

})





// edit question get request
app.get('/editquestion',async (req,res)=>{
 let id = req.query.question_id;
 console.log(id,"edit question id in get request");
  let editquesql = `select * from  questions  where question_id = ${id}`;
  let [editques] = await db.query(editquesql);
  let [category] = await db.query(`select category_name , category.category_id from category join questions on questions.question_id = category.category_id where category_status = '1'`)
  console.log(editques,"edit question data log")
  res.render("editquestion" , {data : editques , data1 : category })

})



//edit question post request

app.post('/editquestion', async(req,res)=>{
   var question_id = req.body.question_id; 
   console.log(question_id,"question id for edit queastion :::::::::");
  console.log("vvivdvv")
  var category_id = req.body.category;
  console.log(category_id,"update id for store in db");
  var question_text = req.body.question_text;
  console.log("request body for update :::::::", req.body);
  console.log(question_text, "for update");
  var option_a = req.body.option_a;
  var option_b = req.body.option_b;
  var option_c = req.body.option_c;
  var option_d = req.body.option_d;
  var answer = req.body.answer;

let updateque = `update questions set question_text = '${question_text}' , option_a = '${option_a}' , option_b = '${option_b}' , option_c = '${option_c}', option_d = '${option_d}' , answer = '${answer}' , category_id = '${category_id}' where question_id = ${question_id} `
let [editquepost] = await db.query(updateque);
if (editquepost.length) {
  console.log("updated question")
}

res.redirect("/question")
})





// delet question get request
app.get('/deletequestion',async (req,res)=>{
  let id = req.query.question_id;
  let deletquesql = `select * from questions where `
})





// app.listen(port, () => console.log(`  port connected to ${port}!`))
module.exports = app; 