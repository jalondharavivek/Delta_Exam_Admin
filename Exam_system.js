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
const path = require('path')
const app = express();
app.use(express.static('public'));
const ejs = require('ejs');
const { signedCookie } = require('cookie-parser');
const { Console } = require('console');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/assets/image'));
app.use(express.static(__dirname + ''));
const PORT = process.env.PORT || 8765;
app.set('view engine', 'ejs');

app.use(cookie());
app.use(flash());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const category = require('./routes/manoj_index');
app.use("/", category)


const vivek_indexfile = require('./routes/vivek_index')
app.use("/", vivek_indexfile)

// const milan_indexfile = require('./routes/milan_index')
// app.use('/',milan_indexfile)
// const sejal_indexfile = require('./routes/sejal_index')
// app.use('/',sejal_indexfile)


app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '/public')))

const milan_indexfile = require('./routes/milan_index')
app.use('/',milan_indexfile)

const user = require('./routes/user_kartik_index');
app.use("/", user)

// session create

app.use(sessions({
    secret: "huy7uy7u",
    saveUninitialized: true,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, 
    },
}));

//middleware

const authMiddleware = (req, res, next) => {
    if (!req.session.user) {
      return res.redirect("/");
    }
    next();
  };
  // app.get("/login", authMiddleware, (req, res) => {
  //   res.end('login succesfull')
  // });


// create connectin 

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "exam_system",

});

app.get('/', (req, res) => {
  res.render("login.ejs")
});

app.post('/login', async(req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    var selectEmail = `SELECT email, password FROM student where email = '${email}' `
    var emailResult = await db.query(selectEmail);
    var selectUser = `SELECT email, password , user_login_status , role from user_login where email = '${email}'`;
    var [userData] = await db.query(selectUser);
    if (userData.length == 0) {
        res.send("email is not match");
    } else {
        var comparePassword = userData[0].password;
        var compare = await bcrypt.compare(password, comparePassword);
        var resultRandom = Math.random().toString(36).substring(2, 7);
        if (!compare) {
            res.send("Password is not match")
        } else {  
          app.use(sessions({
            secret: "huy7uy7u",
            saveUninitialized: true,
            resave: false,
            cookie: {
                maxAge: 1000 * 60 * 60 * 24, 
              },
            }));
            res.redirect('dashboard');
        }
    }
})

app.get("/forget", async(req, res) => {
    res.render("validEmail")
})

app.get('/dashboard',async (req,res)=>{
  res.render('dashboard.ejs');
})

app.get('/setPassword', async(req, res) => {
  res.redirect('/login');
})

app.post('/setPassword', async(req, res) => {
  res.render("setPassword")
})

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
  app.use(sessions({
    secret: "huy7uy7u",
    saveUninitialized: true,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, 
    },
}));
req.session.email=email;
  res.json({
      otp
  });
})    

app.get("/updatePassword", (req, res) => {
  res.redirect("/");
})

app.post("/updatePassword", async(req, res) => {
  var email = req.session.email;
  var password = req.body.password;
  var set = await bcrypt.genSalt(10);
  var resetPassword = await bcrypt.hash(password, set);
  var updateQuery = `update user_login set password = '${resetPassword}' where email = '${email}'`;
  console.log("update query", updateQuery)
  var updateResult = await db.query(updateQuery)
  req.session.destroy();
  res.redirect("/");
})

// otp genera
function generateOTP() {

  var digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}


app.listen(PORT, () => console.log(`port connected to ${PORT}!`))
