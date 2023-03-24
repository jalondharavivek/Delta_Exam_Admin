const express = require('express');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const sessions = require('express-session');
var cookie = require('cookie-parser');
var utils = require('util');
const { decode } = require('punycode');
let bodyParser = require('body-parser')
const mysql = require("mysql2/promise");
const flash = require('connect-flash');
var nodemailer = require('nodemailer');

const app = express();
app.use(express.static('public'));
const ejs = require('ejs');
const { signedCookie } = require('cookie-parser');
const { Console } = require('console');
app.use(express.static(__dirname + '/public'));
// app.use(express.static(__dirname + '/public/assets/image'));
// app.use(express.static(__dirname + ''));
const PORT = process.env.PORT || 8765;
app.set('view engine', 'ejs');

app.use(cookie());
app.use(flash());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(sessions({
    secret: "huy7uy7u",
    saveUninitialized: true,
    resave: false
}));


const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "exam_system",
    });

//forget password
app.get("/forget", async(req, res) => {

    res.render("validEmail")
})

//login render
app.get("/login", (req, res) => {

    res.render('login');

})

//login
app.post('/login', async(req, res) => {

    var email = req.body.email;
    var password = req.body.password;

    var selectEmail = `SELECT email, password FROM student where email = '${email}' `
    var [emailResult] = await db.execute(selectEmail);

    var selectUser = `SELECT email, password , user_login_status  , role from user_login where email = '${email}'`;
    var [userData] = await db.execute(selectUser);


    if (userData.length == 0) {
        res.send("email is not match");
    } else {

        var comparePassword = userData[0].password;

        var compare = await bcrypt.compare(password, comparePassword);
        var resultRandom = Math.random().toString(36).substring(2, 7);

        if (!compare) {
            res.send("Password is not match")
        } else {

            if (userData[0].user_login_status == 0) {
                res.render("activation.ejs", { email: email, resultRandom: resultRandom })
            } else {
                req.session.email = email;
                if(userData[0].role == 1) 
                {
                    res.render("dashboard.ejs")
                }
                else
                {
                    res.render("student.ejs");
                }
            }
        }
    }
})

app.get('/setPassword', async(req, res) => {
    res.redirect('/login');
})
app.post('/setPassword', async(req, res) => {
    res.render("setPassword")
})

//nodemailer
app.post('/fetch_api', (req, res) => {

    var email = req.body.email;
    console.log("Send email in post method", email)
    let testAccount = nodemailer.createTestAccount();
    var otp = generateOTP();
    console.log("otp", otp);
   
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        
        auth: {
            type: 'OAUTH2',
            user: 'darshil.parmar.23.esparkbiz@gmail.com',
            clientId: '597640694626-lbhid8to6k077c62vilvcap43spvjlmv.apps.googleusercontent.com',
            clientSecret: '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',
            refreshToken: '1//04W0dHxgn1-jjCgYIARAAGAQSNwF-L9Ir_m55RIE4IM87u6xtEX-h1itLMILck2gLC8eTmhbF-umYCxJO9Jo5W4BmDJSNX-aMIg0',
            accessToken: 'ya29.a0AVvZVsrBfRsp1sK8vyLlLCu_XRKaJBc0kk99E2JeUtrQhhEQOYtPNukeg9gwCq-RUTVR01UM24RgTOGYN8DmNPSNdX-b-mG4Ys4RCIIBmPsg9Wk6BudImI4NN-a79XHbZ1J4vl4KLP01JeQnJUwgSQsGkZ2iQlEaCgYKAToSARMSFQGbdwaIVujzQJMyKZbe0PbdSr0VYQ0166',
        }
    });

    let info = transporter.sendMail({
        from: 'hello <darshil.parmar.23.esparkbiz@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "OTP Validation ✔", // Subject line
        text: "OTP", // plain text body
        html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Your Brand</a>
          </div>
          <p style="font-size:1.1em">Hi,</p>
          <p>Thank you for choosing Your Brand. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
          <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
          <p style="font-size:0.9em;">Regards,<br />EsparkBiz</p>
          <hr style="border:none;border-top:1px solid #eee" />
        </div>
      </div>`
    });
    req.session.email = email;
    res.json({
        otp
    });
})    

app.post("/active/:resultRandom", async(req, res) => {
    var email = req.body.email;
    var resultRandom = req.params.resultRandom;

    var updateQuery1 = `update user_login set user_login_status = 1 where email ="${email}"`;

    var [resultUpdate1] = await db.query(updateQuery1)

    let d = (Array(resultUpdate1))

    let a = d[0].changedRows;
    if (a == 1) {
        res.json({ UpdateStatus: 1 })
    }
})

app.get("/updatePassword", (req, res) => {
    res.redirect("/login");
})

app.post("/updatePassword", async(req, res) => {
    var email = req.session.email;

    var password = req.body.password;


    var set = await bcrypt.genSalt(10);
    var resetPassword = await bcrypt.hash(password, set);


    var updateQuery = `update user_login set password = '${resetPassword}' where email = '${email}'`;
    console.log("update query", updateQuery)
    var [updateResult] = await db.query(updateQuery)
    res.redirect("/login");
})

//fucntion for otp 
function generateOTP() {

    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}



app.get('/result',async (req, res) => {
    let sql = `select ee.exam_id , ee.exam_name ,ee.total_questions ,ee.exam_time ,ee.exam_status  from  exam_system.exam ee inner join 
    exam_system.user_answers uans on ee.exam_id = uans.exam_id;`
     let [query] = await db.execute(sql);
     console.log(query);
     res.render('result',{data : query});
   })
 

app.get('/viewresult',async (req, res) => {
    let sql = `SELECT category_name FROM exam_system.exam  a, exam_system.user_answers b 
    where a.exam_id=b.exam_id`;
     let [query] = await db.execute(sql);
     console.log(query);
     res.render('viewresult',{data : query});
})
 
 app.get('/viewquestion',async (req, res) => {
    let sql = `select q.question_text , q.answer ,uans.user_answers ,  uans.marks from exam_system.questions  q inner join 
    exam_system.user_answers uans on q.question_id=uans.question_id;`;
     let [query] = await db.execute(sql);
     console.log(query);

     //for name

     let sql1 = `select  s.name from exam_system.student s inner join 
     exam_system.result r on s.student_id=r.student_id`;
     let [stu_name] = await db.execute(sql1);
     console.log(stu_name);
 
     res.render('viewquestion',{data : query, stu_name:stu_name});
})
 

module.exports = app; 

//port
app.listen(PORT, (err) => {
    console.log(`http://localhost:${PORT}/login`);
})