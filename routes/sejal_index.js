const express = require('express')
const path = require('path')
const app = express();
const mysql = require("mysql2/promise");
const port = 8000;
app.set("view engine", "ejs");
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const session = require('express-session');
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '/public/')))
const db = mysql.createPool({
host: "localhost",
user: "root",
password: "root",
database: "exam_system",
});

console.log("database Connected ");
//session-set 
app.use(
    session({
        secret: 'your-secret-key', 
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, 
        },
    })
);
//render login page  
// app.get('/', (req, res) => {
//     res.render('adminPanel.ejs');
// });
//render  forget-password page
app.get('/forgot_pass', (req, res) => {
    res.render('forgot.ejs');
})

app.get('/updated', (req, res) => {
    res.render('forgot.ejs');
})
//code activation link page 
app.post('/link_generate', (req, res) => {
    temp_email = req.body.email;
    req.session.email = temp_email;
    console.log(req.session);
    if ((req.session)) {
        res.render('verified');
    }
    else {
        res.redirect('/');
    }
})
//session - validation 
app.post('/link_click', function (req, res) {
    if ((req.session)) {
        res.render('conform_pass.ejs');
    }
    if ((!req.session)) {
        res.redirect('/');
    }
});
//login 
var flg;
let flg2 = false;
const arr = [];
app.post('/abc', async (req, res) => {
    let p = req.body.password;
    let e = req.body.email;
    if (e.length != 0) {
        var q = `select * from exam_system.user_login where email='${e}' and role='1';`
        let [ans] = await con.query(q);
        if (ans.length != 0) {
            flg = true;
            arr.push(flg)
            arr[1] = ans[0].email;
            bcrypt.compare(p, ans[0].password, function (err, result) {
                if (result) {
                    res.json(true )
                }
                else {
                    res.json(false )
                }
            });
        }
        else {
            res.json(false )
        }
    }
})
// email validation
app.post('/xyz', async(req, result) => {
    let e = req.body.email;
    const ans1 = [];
    if (e.length != 0) {
        var q = `select * from exam_system.user_login where email='${e}' and role='1';`
        let [ans] = await con.query(q);
         console.log(ans);
            
            if (ans.length != 0) {
                ans1[0] = true;
                ans1[1] = ans[0].email;
                console.log(ans1);
                result.json({ans1});
            }
            else {
                ans1[0] = false;
                console.log(ans1);
                result.json({ans1});
            }
    }
})
//chnage hash password 
app.post('/updated', (req, res) => {
    let email1 = req.session.email;
    let pass1 = req.body.pass1;
    var hashedPassword;
    // Encryption of the string password
    bcrypt.genSalt(10, function (err, Salt) {
        // The bcrypt is used for encrypting password.
        bcrypt.hash(pass1, Salt, function (err, hash) {
            if (err) {
                return console.log('Cannot encrypt');
            }
            hashedPassword = hash;
            console.log(hash);
            var q1 = `UPDATE exam_system.user_login  set password ='${hash}' WHERE email='${email1}' and role=1`;
            con.query(q1, (err, res) => {
                if (err) throw err;
                console.log('update');
            })
        })
    })
    console.log(hashedPassword);
    req.session.destroy();
    res.json({ email1 });
})
//Auc-middleware
const authMiddleware = (req, res, next) => {
    if (!req.session.user) {
      return res.redirect("/");
    }
    next();
  };
  app.get("/login", authMiddleware, (req, res) => {
    res.render("dashboard")
  });

//category
app.get('/category',async (req, res) => {
  let sql = "SELECT * FROM category";
  let [query] = await db.query(sql);
  res.render('category',{data : query});
})

app.post('/categorystatus',async (req, res) => {
  let id = req.body.id;
  let status = req.body.status
  // console.log(i);
  if(status == 0)
  {
    let sql = `update category set category_status = '1' where category_id = ${id}`;
    let [query] = await db.query(sql);
    res.json(query);
  }
  else if(status == 1)
  {
    let sql = `update category set category_status = '0' where category_id = ${id}`;
    let [query] = await db.query(sql);
    res.json(query);
  }
})

app.post('/editcategory',async (req, res) => {
  let b = req.body;
  let sql = `update category set category_name = '${b.category_name}' where category_id = ${b.category_id}`;
  let [query] = await db.query(sql);
  res.redirect('category');
  // console.log(b);
})

app.get('/editCategory',async (req, res) => {
  let id = req.query.id;
  let sql = `select category_id, category_name from category where category_id = ${id}`;
  let [ans] = await db.query(sql);
  res.json(ans);
  // console.log(ans);
  // console.log(id);
})

app.post('/addcategory',async (req, res) => {
  let sql = `insert into category (category_name,category_status,created_date) values ('${req.body.category_name}','0',now())`;
  let [query] = await db.query(sql);
  res.redirect('category');
  console.log(query);
})

app.get('/', (req, res) => {
  res.render("dashboard")
});

//dashboard - admin-chnage password & logout

//get chnage-password for admin
app.get('/admin-chnage', (req, res) => {
    res.render("admin-chnage")
  });

app.post('/admin-chnage', (req, res) => {
    if ((req.session)) {
        res.render('conform_pass.ejs');
    }
    if ((!req.session)) {
        res.redirect('/');
    }
  });

  //logout
app.post('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});


app.listen(port, () => console.log(`  port connected to ${port}!`))


module.exports = app;