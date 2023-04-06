var bcrypt = require('bcryptjs');
var db = require('../connection/mysql');
require('../connection/module');
var nodemailer = require('nodemailer');

const admin_login = (req, res) => {
    res.render("../src/views/login.ejs")
  }; 
  
const login = async(req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    var selectUser = `SELECT email,password,user_login_status,user_id,role from user_login where email = '${email}'`;
    var [userData] = await db.query(selectUser);
    
    if (userData.length == 0) {
      res.send("email and password is not match");
    } else {
        let user_id = userData[0].user_id;
        var comparePassword = userData[0].password;
        var compare = await bcrypt.compare(password, comparePassword);
        if (!compare || userData[0].role == '0') {
            res.send("email and password is not match")
        }else {
            req.session.user = email;
            req.session.user_id = user_id;
            
            res.redirect('dashboard');
        }
    }
}
const forget = async(req, res) => {
   req.session.destroy();
    res.render("../src/views/validEmail")
}

const dashboard = async(req,res) =>{

  try {


    let sql1 = `SELECT COUNT(student_id) as c FROM student`; 
    let [query1] = await db.execute(sql1);

    let sql2 =`SELECT COUNT(exam_id) as c FROM exam`;
    let [query2] = await db.execute(sql2);

    let sql3 = `SELECT COUNT(question_id) as c FROM questions`;
    let [query3] = await db.execute(sql3);

    let sql4 = `SELECT COUNT(category_id) as c FROM category`;
    let [query4] = await db.execute(sql4);
    
    res.render('../src/views/dashboard.ejs', {count1 :  query1 , count2 : query2, count3 : query3, count4 : query4});
  }
  catch (err) {
    console.log(err);
  }
}





const setpassword = async(req,res) => {

    res.redirect('/login');
}

const post_setpassword = async(req,res) => {
    res.render("../src/views/setPassword");
}
const logout=async(req,res)=>{
  req.session.destroy();
  res.redirect('/');
}
const fetch_api = async(req,res) => {
    var email = req.body.email;
  let testAccount = nodemailer.createTestAccount();
  
  var sql = `SELECT email FROM exam_system.user_login where role=1;`;
  let [emailArray] = await db.execute(sql);
  let flag =false;
  for(let i=0;i<emailArray.length;i++){
    if(emailArray[i].email==email){
      flag=true;
      break;
    }
  }
    var otp = generateOTP();
//   const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       host: 'smtp.gmail.com',
//       auth: {
//           type: 'OAUTH2',
//           user: 'darshil.parmar.23.esparkbiz@gmail.com',
//           clientId: '597640694626-lbhid8to6k077c62vilvcap43spvjlmv.apps.googleusercontent.com',
//           clientSecret: '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',
//           refreshToken: '1//04W0dHxgn1-jjCgYIARAAGAQSNwF-L9Ir_m55RIE4IM87u6xtEX-h1itLMILck2gLC8eTmhbF-umYCxJO9Jo5W4BmDJSNX-aMIg0',
//           accessToken: 'ya29.a0AVvZVsrBfRsp1sK8vyLlLCu_XRKaJBc0kk99E2JeUtrQhhEQOYtPNukeg9gwCq-RUTVR01UM24RgTOGYN8DmNPSNdX-b-mG4Ys4RCIIBmPsg9Wk6BudImI4NN-a79XHbZ1J4vl4KLP01JeQnJUwgSQsGkZ2iQlEaCgYKAToSARMSFQGbdwaIVujzQJMyKZbe0PbdSr0VYQ0166',
//       }
//   });

//   let info = transporter.sendMail({
//       from: 'hello <darshil.parmar.23.esparkbiz@gmail.com>', // sender address
//       to: email, // list of receivers
//       subject: "OTP Validation ✔", // Subject line
//       text: "OTP", // plain text body
//       html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
//       <div style="margin:50px auto;width:70%;padding:20px 0">
//         <div style="border-bottom:1px solid #eee">
//           <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Your Brand</a>
//         </div>
//         <p style="font-size:1.1em">Hi,</p>
//         <p>Thank you for choosing Your Brand. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
//         <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
//         <p style="font-size:0.9em;">Regards,<br />EsparkBiz</p>
//         <hr style="border:none;border-top:1px solid #eee" />
//       </div>
//     </div>`
//   });
//   app.use(sessions({
//     secret: "huy7uy7u",
//     saveUninitialized: true,
//     resave: false,
//     cookie: {
//         maxAge: 1000 * 60 * 60 * 24, 
//     },
// }));
  
  req.session.email=email;
  res.json({otp});
}

const updatePassword = async (req, res) => {
  req.session.destroy();
    res.redirect("/");
}

const post_updatePassword = async (req, res) => {
var email = req.session.email;
  var password = req.body.password;
  var set = await bcrypt.genSalt(10);
  var resetPassword = await bcrypt.hash(password, set);
  var updateQuery = `update user_login set password = '${resetPassword}' where email = '${email}'`;
  var updateResult = await db.query(updateQuery)
  res.redirect("/");
}
module.exports = {admin_login,login,forget,dashboard,setpassword,post_setpassword,fetch_api,updatePassword,post_updatePassword,logout};

function generateOTP() {

  var digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}
