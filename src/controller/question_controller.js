var db = require('../connection/mysql');
require('../connection/module')
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/assets/uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });


const upload = multer({ storage });

const question = async(req,res)=>{
  try{
    let que = `select * from questions where question_status = '1'`
    let quecat = `select * from questions join  category on category.category_id = questions.category_id where question_status='1'`
    let page = req.query.page || 1;
    let limit = req.query.limit || 10;
   
   
    if (req.query.page > 1)
     que += ` LIMIT ${((page - 1) * limit)}, ${limit}`;
    else
     que += ` LIMIT ${limit} `;
  let [questiontab] = await db.execute(que);
  let [quecatexecute] = await db.execute(quecat);
  let sql1que = `select count(*) as total from questions where question_status = '1'  `;
  let [resultque] = await db.query(sql1que);
  res.render("../src/views/question", { data: questiontab,data1 : quecatexecute ,page : page, total: resultque[0].total, limit: limit })
  }catch(err){
    err
  }
}


const questionpage = async(req,res)=>{
  try{
  let que = `select * from questions where question_status = '1'`
  let quecat = `select * from questions join  category on category.category_id = questions.category_id where question_status='1'`
  let page=parseInt(req.body.page)||1;
  let limit=parseInt(req.body.limit)||10;
  let startindex=(page-1)*limit;
  let endindex=page*limit-startindex;
  if (req.body.page > 1)
   que += ` LIMIT ${((page - 1) * limit)}, ${limit}`;
  else
   que += ` LIMIT ${limit} `;
let [questiontab] = await db.execute(que);
let [quecatexecute] = await db.execute(quecat);
let sql1que = `select count(*) as total from questions where question_status = '1' `;
let [resultque] = await db.query(sql1que);
let sqlque1 = `select a.question_text,a.question_id,a.answer,a.category_id,b.category_name from questions as a join category as b on a.category_id = b.category_id where a.question_text like '%${req.body.name}%' AND a.question_status = '1' limit ${startindex},${endindex} ; `
let [pagesearch] = await db.execute(sqlque1)
res.json({ data: questiontab, pages :pagesearch ,data1 : quecatexecute , page : page, total: resultque[0].total, limit: limit })
  }catch(err){
    err
  }
}


const addquestion = async(req,res)=>{
  try{
    let catque = `select * from category where category_status = 1`
  let [catfque] = await db.execute(catque);
 
  res.send({ data: catfque });
}catch(err){
  if(err) throw err;
}
}

const addquestionpost = async(req,res)=>{
try{
  var category_id = req.body.category;
  
    var question_text1 = req.body.question_text;
    var question_text = question_text1.trim()
    var option_a1 = req.body.option_a;
    var option_a = option_a1.trim()
    var option_b1 = req.body.option_b;
    var option_b = option_b1.trim();
    var option_c1 = req.body.option_c;
    var option_c = option_c1.trim()
    var option_d1 = req.body.option_d;
    var option_d = option_d1.trim()
    var answer1 = req.body.answer;
    var answer = answer1.trim()
    var description1 = req.body.description
    var description = description1.trim()
    const image = req.file? req.file.filename : "";
    
    
    var addquestionquery = `insert into questions(question_text,option_a,option_b,option_c,option_d,answer,category_id,question_status,description,question_image) values('${question_text}','${option_a}','${option_b}','${option_c}','${option_d}','${answer}','${category_id}','1','${description}','${image}')`;
   
    
  
    let execute = await db.execute(addquestionquery);
   
    if (execute.length) {
      
    }
    
  
  
  
    res.redirect("/question");

  }catch(err){
    err
  }

}

const viewdetail = async(req,res)=>{
  try{
    let viewid = req.query.question_id
  let viewq = `select a.question_text,a.question_id,a.option_a,a.option_b,a.option_c,a.option_d,a.description,a.question_image,a.answer,a.category_id,b.category_name from questions as a join category as b on a.category_id = b.category_id where a.question_id = ${viewid}  `
  let viewsql = `select * from questions where question_id = ${viewid}`
  let [category] = await db.query(`select category_name,a.category_id from category a,questions b where a.category_id=b.category_id and question_id='${viewid}'  `)
  let [viewques] = await db.query(viewq);

 
  res.send( { data : viewques , data1:category});
  }catch(err){
    err
  }
}

const editquestionget = async(req,res)=>{
    try{
    let id = req.query.question_id;
   
    let editquesql = `select * from  questions  where question_id = ${id}`;
    let [editques] = await db.query(editquesql);
    let [category] = await db.query(`select category_name,a.category_id from category a,questions b where a.category_id=b.category_id and question_id='${id}'  `)
    let catque = `select * from category where category_status = 1`
    let [catfque1] = await db.execute(catque);
    res.send({ data: editques , data1: catfque1 , data2:category})
    }catch(err){
      err
    }
  }

const editquestionpost = async(req,res)=>{
  
  try{
    var question_id = req.body.question_id;
  
    var category_id = req.body.category;
    
    var question_text1 = req.body.question_text;
    var question_text = question_text1.trim()
    var option_a1 = req.body.option_a;
    var option_a = option_a1.trim()
    var option_b1 = req.body.option_b;
    var option_b = option_b1.trim();
    var option_c1 = req.body.option_c;
    var option_c = option_c1.trim()
    var option_d1 = req.body.option_d;
    var option_d = option_d1.trim()
    var answer1 = req.body.answer;
 var answer = answer1.trim()
    var description1 = req.body.description
    var description = description1.trim()
    const image = req.file? req.file.filename : "";
    let updateque = `update questions set question_text = '${question_text}' , option_a = '${option_a}' , option_b = '${option_b}' , option_c = '${option_c}', option_d = '${option_d}' , answer = '${answer}' , category_id = '${category_id}', description  = '${description }', question_image = '${image}' where question_id = ${question_id} `
    let [editquepost] = await db.query(updateque);
    // if (editquepost.length) {
     
    // }
  
    res.redirect("/question")
   
    res.end()
  }catch(err){
    console.log(err)
  }
  
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
  try{
    let page=parseInt(req.query.page)||1;
    let limit=parseInt(req.query.limit)||10;
    let startindex=(page-1)*limit;
    let endindex=page*limit-startindex;
    
    let sqlque = `select * from questions where question_status = '1'`
    
    let name1 = req.query.nameque;
   
    let [queryque] = await db.execute(sqlque)
    
    let sqlquet = `select count(*) as total from questions where question_text like '%${name1}%'  and question_status = '1'`;
    let [resultque] = await db.query(sqlquet);
    let pagesq = `select * from questions where question_status = '1' AND question_status = '1' limit ${startindex},${endindex}`;   
    let sqlque1 = `select a.question_text,a.question_id,a.answer,a.category_id,b.category_name from questions as a join category as b on a.category_id = b.category_id where b.category_name like '%${name1}%' or a.question_text like '%${name1}%' or a.answer like '%${name1}%' AND a.question_status = '1' limit ${startindex},${endindex} ; `

    let [pagesques] = await db.query(pagesq);
    let [sqlque2] = await db.execute(sqlque1)

    res.json({ datas : queryque, search: sqlque2, page: page, totalque: resultque[0].totalque, limit: limit, pages : pagesques});
  }catch(err){
    err
  }
  }
// datas  = data done page == page done total done limit done 
//data: questiontab, pages :pagesearch ,data1 : quecatexecute , page : page, total: resultque[0].total, limit: limit


///retrive question (deleted questiob)


const retrivequestions = async(req,res)=>{
  try{
    let sqlretrivequery = `select * from questions join category on questions.category_id = category.category_id where question_status = '0' `

    let [sqlretriveexecute] = await db.query(sqlretrivequery)

    res.json({data :sqlretriveexecute })
  }catch(err){
    err
  }
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
searchget,retrivequestions,retrivequestionpost,storage,upload,questionpage} 