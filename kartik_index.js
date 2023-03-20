const express = require('express')
const path = require('path')
const app = express();
const mysql = require("mysql2");
const port = 8765;
const bodyParser = require("body-parser");
const { Console } = require('console');
const { get } = require('http');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set("view engine", "ejs");

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '/public')))

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "exam_system",
});

app.get('/category', async (req, res) => {
  let sql = "SELECT category_name,category_status, FORMAT(Date(created_date),'yyyy/mm/dd') AS Created_Date FROM category";
  let [query] = await getdata(sql);
  console.log(query);
  res.render('category', { data: query });
})

app.get('/', (req, res) => {
  res.render("dashboard")
});


app.get('/user', async (req, res) => {
  let sql2 = "select student_id,name,email,contact,gender,address,student_status,city,state_id,college_id,created_date from student";
 

  let student = await getdata(sql2);
  for(i=0;i<student.length;i++){
    console.log(student[i].state_id)
    console.log(student[i].college_id)

  let sql3 =`select state_name from state where state_id=${student[i].state_id}`
  let state_name=await getdata(sql3);
  console.log(state_name)

//   let sql4=`select college_name from colleges where college_id=${student[i].college_id}`
// let collegelist =await getdata(sql4);
// console.log(collegelist);


  res.render("user.ejs", { student ,state_name });

}

  app.get('/student_status', async (req, res) => {

    console.log(req.query)
    let student_id = req.query.id;
    let student_status = req.query.status;


    if (student_status == '0') {
      let status = `update student set student_status = 1 where student_id = ${student_id}`;
      let status_result = await getdata(status);

      res.redirect('/user')
    }
    else {
      let status = `update student set student_status = 0 where student_id = ${student_id}`;
      let status_result = await getdata(status);

      res.redirect('/user')
    }

  });
});

//collage render tghrough ajax
app.get("/collage", async (req, res) => {
  console.log("/collage is active")
  let id = req.query.id;
  console.log(req.query.id);

  sql1 = `select college_id from student where student_id ='${id}'`;
  let data1 = await getdata(sql1);

  res.send(data1);
}

)
app.get("/allcollage", async (req, res) => {
  console.log("allcollage")
  let sql1 = `select * from colleges`;
  let data1 = await getdata(sql1);
  res.send(data1);
})

app.get("/edit/:id", async (req, res) => {

  console.log();
  let temp_id = req.params.id;
  let arr = temp_id.split("=");


  let sql3 = `select * from student where student_id='${arr[1]}';`
  let student2 = await getdata(sql3);


  //  let city_state =`select city.city_name ,state.state_name from city left join state on city.state_id = state.state_id;`
  //  let city_state_result = await getdata(city_state);
  //  console.log(city_state_result);


  let sql1 = `select * from state`;
  let state = await getdata(sql1);

  res.render("edit.ejs", { student2, state });
})



app.get(`/student/allcity`, async (req, res) => {

  let sql1 = `select * from city where state_id='${state_id}';`
  let allcity = await getdata(sql1);

})
app.get("/student/city", async (req, res) => {

  console.log("/studebnt/city")
  let id = req.query.state_id;
  let sql1 = `select city_id,city_name from city where state_id='${id}'`;
  let data1 = await getdata(sql1);
  console.log(data1)
  res.send(data1);

});


app.get("/city", async (req, res) => {
  console.log("/city is active")
  let id = req.query.id;
  console.log(req.query.id);

  sql1 = `select city from student where student_id ='${id}'`;
  let data1 = await getdata(sql1);
  console.log(data1);
  res.send(data1);
})

app.post("/update", async (req, res) => {


  console.log(req.body);
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

  console.log(sql4);

  let student3 = await getdata(sql4);
  console.log(student3);
  res.redirect('/user')


});


async function getdata(sql) {
  return new Promise((res, rej) => {
    db.query(sql, (err, data) => {
      if (err) throw err;
      res(data);
    })
  })
}

app.listen(port, () => console.log(`  port connected to ${port}!`))