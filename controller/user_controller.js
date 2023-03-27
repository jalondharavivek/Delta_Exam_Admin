var db = require('../connection/mysql');
require('../connection/module')

const user = async (req, res) =>{
    
  try {
    let sql = `select a.created_date,a.student_id,a.name,a.email,a.contact,a.gender,a.address,a.student_status,a.city,b.state_name,c.college_name 
    from student a, state b, colleges c where a.state_id=b.state_id and a.college_id=c.college_id`;

    let page = req.query.page || 1;
    let limit = req.query.limit || 5;
    if (req.query.page > 1)
      sql += ` LIMIT ${((page - 1) * limit)}, ${limit}`;
    else
      sql += ` LIMIT ${limit} `;
    let [student] = await db.execute(sql);
console.log(student);

    let sql1 = "select count(*) as total from student";


    let [result1] = await db.execute(sql1);

    res.render('user', { student, page: page, total: result1[0].total, limit: limit });
  }
  catch (err) {
    console.log(err);
  }
}

const userpage = async (req, res) =>{

  try {


    let sql = `select student_id,name,email,contact,gender,address,student_status,city,state_name,college_name 
  from student a, state b, colleges c where a.state_id=b.state_id and a.college_id=c.college_id `;


    let page = parseInt(req.body.page) || 1;
    // let limit=parseInt(req.body.limit)||3;
    let limit = 5;
    let startindex = (page - 1) * limit;
    let endindex = page * limit - startindex;


    if (req.body.page > 1)
      sql += ` LIMIT ${((page - 1) * limit)}, ${limit}`;
    else
      sql += ` LIMIT ${limit} `;
    let [student] = await db.execute(sql);


    let sql1 = "select count(*) as total from student";
    let [result1] = await db.execute(sql1);




      let pages =`select student_id,name,email,contact,gender,address,student_status,city,state_name,college_name 
      from student a, state b, colleges c where( a.state_id=b.state_id AND a.college_id=c.college_id) and name
       like '%${req.body.name}%' limit ${startindex},${endindex}`;

    let [pages1] = await db.execute(pages);



    res.json({ student, page: page, total: result1[0].total, limit: limit, pages: pages1 });
  }
  catch (err) {
    console.log(err);
  }
}

const student_status = async (req, res) => {
  try {

    let sql = `select student_id,name,email,contact,gender,address,student_status,city,state_name,college_name 
    from student a, state b, colleges c where a.state_id=b.state_id and a.college_id=c.college_id`;

    let page = req.query.page || 1;
    let limit = req.query.limit || 5;
    if (req.query.page > 1)
      sql += ` LIMIT ${((page - 1) * limit)}, ${limit}`;
    else
      sql += ` LIMIT ${limit} `;



    let student_id = req.query.id;
    let student_status = req.query.status;

    if (student_status == '0') {
      let status = `update student set student_status = 1 where student_id = ${student_id}`;
      let [student_result] = await db.execute(status);
      let [student] = await db.execute(sql);
      
      res.json({ student_result })


    }
    else {
      let status = `update student set student_status = 0 where student_id = ${student_id}`;
      let student_result = await db.execute(status);
      let [student] = await db.execute(sql);
      res.json({ student_result })




    }
  }
  catch (err) {
    console.log(err);
  }
}

const college = async (req, res) => {

  try {
   


    let id = req.query.id;


    sql1 = `select college_id from student where student_id ='${id}'`;
    let [data1] = await db.execute(sql1);

    res.send(data1);
  }
  catch (err) {
    console.log(err);
  }
}

const allcollege = async (req, res) => {
  try {



    let sql1 = `select * from colleges`;
    let [data1] = await db.execute(sql1);

    res.send(data1);
  }
  catch (err) {
    console.log(err);
  }
}

const editid = async (req, res) => {
  try {

    let temp_id = req.params.id;
    let arr = temp_id.split("=");


    let sql3 = `select * from student where student_id='${arr[1]}';`
    let [student2] = await db.execute(sql3);


    let sql1 = `select * from state`;
    let [state] = await db.execute(sql1);

    res.render("edit.ejs", { student2, state });

  }
  catch (err) {
    console.log(err);
  }
}

const allcity = async (req, res) => {
    
  try {
   


    let sql1 = `select * from city where state_id='${state_id}';`
    let [allcity] = await db.execute(sql1);

    res.send(allcity);
  }
  catch (err) {
    console.log(err);
  }
}

const city = async (req,res) => {
  try {
   
  
    let id = req.query.state_id;
    let sql1 = `select city_id,city_name from city where state_id='${id}'`;
    let [data1] = await db.execute(sql1);


    res.send(data1);

  }
  catch (err) {
    console.log(err);
  }
}

const getcity = async (req, res) => {
  try {
   
    let id = req.query.id;


    sql1 = `select city from student where student_id ='${id}'`;
    let [data1] = await db.execute(sql1);


    res.send(data1);

  }
  catch (err) {
    console.log(err);
  }
}

const update = async (req, res) => {
  try {

    let student_id = req.body.student_id;
    let name = req.body.name;
    let email = req.body.email;
    let contact = req.body.contact;
    let gender = req.body.gender;
    let address = req.body.address;
    let city = req.body.city;
    let state_id = req.body.state;
    let college_id = req.body.col;



    let sql4 = `update student set name='${name}',email='${email}',contact='${contact}',gender='${gender}',
     address='${address}',city='${city}', state_id = '${state_id}' ,college_id='${college_id}' where student_id=${student_id};`
  
    let [student3] = await db.execute(sql4);
    res.redirect('/user')

  }
  catch (err) {
    console.log(err);
  }
}

const search =async(req,res)=>{

try{


  let sql = `select student_id,name,email,contact,gender,address,student_status,city,state_name,college_name 
  from student a, state b, colleges c where a.state_id=b.state_id and a.college_id=c.college_id`;

  let page = parseInt(req.query.page) || 1;
  // let limit=parseInt(req.query.limit)||3;
  let limit = 5;
  let startindex = (page - 1) * limit;
  let endindex = page * limit - startindex;
  let name = req.query.name;



  let [query] = await db.execute(sql);

  let sql1 = `select count(*) as total from student where name like '%${name}%'`;
  let [result1] = await db.execute(sql1);

  let pages = `select student_id,name,email,contact,gender,address,student_status,city,state_name,college_name 
  from student a, state b, colleges c where( a.state_id=b.state_id AND a.college_id=c.college_id) and name like '%${name}%' limit ${startindex},${endindex}`;
  let [pages1] = await db.execute(pages);


  let srch = `select student_id,name,email,contact,gender,address,student_status,city,state_name,college_name 
  from student a, state b, colleges c where( a.state_id=b.state_id AND a.college_id=c.college_id) and name like '%${name}%' limit ${startindex},${endindex}`;

  let [query1] = await db.query(srch);


  res.json({search: query1, data: query, page: page, total: result1[0].total, limit: limit, pages: pages1} );
}
catch (err) {
  console.log(err);
}
}








module.exports = {user,userpage,student_status,college,allcollege,editid,allcity,city,getcity,update,search}

