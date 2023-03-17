const express = require('express')
const path = require('path')
const app = express();
const mysql = require("mysql2/promise");
const port = 8765;
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '/public')))
const db = mysql.createPool({
host: "localhost",
user: "root",
password: "root",
database: "exam_system",
});

app.get('/category',async (req, res) => {
 let sql = "SELECT category_name,category_status, FORMAT(Date(created_date),'yyyy/mm/dd') AS Created_Date FROM category";
  let [query] = await db.query(sql);
  console.log(query);
  res.render('category',{data : query});
})

// // password change
// app.get('/change-password', (req, res) => {
//   res.render("admin_chnage_pass")
// });

// // password change
// app.post('/change-password', (req, res) => {
//   const { oldPassword, newPassword, confirmPassword } = req.body;

//   // Check if old password is correct 
//   if (!checkOldPassword(oldPassword)) {
//     res.status(401).send('Incorrect old password');
//     return;
//   }

//   // Check if new password and confirm password match
//   if (newPassword !== confirmPassword) {
//     res.status(400).send('New password and confirm password do not match');
//     return;
//   }

//   // Update password in database 
//   updatePassword(newPassword);

//   //function for updatepassword and confirmpasswoerd 
//   function checkOldPassword(oldPassword) {
    
//     return true;
//   }
//   function checkOldPassword(oldPassword, confirmPassword) {
//     if (oldPassword === confirmPassword) {
//       return true;
//     } else {
//       return false;
//     }
//   }
  
//   function updatePassword(newPassword) {

//     return true;
//   }

  

//   // Redirect to darshnoard page
//   res.redirect('/');
// });



//question
app.get('/question',async (req, res) => {
console.log("question");
     res.render("question");
   })

 app.get('/', (req, res) => {
   res.render("dashboard")
});

 app.listen(port, () => console.log(`  port connected to ${port}!`))