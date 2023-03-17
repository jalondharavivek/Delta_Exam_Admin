let mysql=require('mysql2');
let express=require('express');
let app=express();
let bodyParser=require('body-parser'); 
const { json } = require('express/lib/response');
var cookieParser = require('cookie-parser')
const req = require('express/lib/request');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
const bcrypt = require('bcryptjs');
let jwt=require('jsonwebtoken')
const { query } = require('express');
const { cookie } = require('express/lib/response');
const res = require('express/lib/response');
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "temp_online_exam"
});
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine','ejs');
app.get('/',(req,res)=>{
    res.render('adminPanel.ejs');
});
app.post('/compate',(req,res)=>{
    res.clearCookie('mytoken')
    res.render('updatesucces');

})
app.get('/forgot_pass',(req,res)=>{
    res.render('forgot.ejs');
})
app.get('/conform_password',(req,res)=>{
    if((req.cookies['mytoken'])){
        res.render('conform_pass.ejs');
    }else{
            res.redirect('/');
    }
    
})
app.get('/login',(req,res)=>{
    res.end('login succesfull')
})

var flg;
app.post('/abc',(req,result)=>{
    let e=req.body.email;
    let p=req.body.password; 
    let arr=[];
    if(e.length !=0){
        var q=`select * from temp_online_exam.admin_login where email='${e}'`
        con.query(q,(err,res)=>{
            if (err) throw err;
            console.log(res);
            if(res!=0)
            {
                flg=true;
                arr[0]=flg;
                arr[1]=res[0].email;
                console.log(arr[1]);
                arr[2]=res[0].password;
                
            }
            else{
                flg=false;
                arr[0]=flg;
            }
            result.json({arr});
            console.log(arr);
        })
      
    }
    
})
app.post('/xyz',(req,result)=>{
    let e=req.body.email;
    console.log(e);
    const ans=[];
    if(e.length !=0){
        var q=`select * from temp_online_exam.admin_login where email='${e}'`
        
        con.query(q,(err,res)=>{
            if (err) throw err;
            if(res!=0)
            {
                ans[0]=true;
                ans[1]=res[0].email;
                result.json({ans});
            }
            else{
                ans[0]=false; 
                result.json({ans});
            }
            
        })
      
    }
    
})
app.post('/update',(req,result)=>{
    let k=req.body.temp;
    console.log(req.body.temp);
   
    
})
app.get('/link_generate',(req,res)=>{
    
    const token = jwt.sign(123, 'css');
    console.log(token);
    res.cookie('mytoken',token,{
        expires:new Date(Date.now()+25892000000)
    });
    if((req.cookies['mytoken'])){
        res.render('verified');
    }else{
       
            res.redirect('/C');
    }
})


app.get('/clearcookie', function(req, res){
   
     // Clearing the cookie
    
    console.log("Cookie cleared");
    res.redirect('/conform_password');
});
const queryExecurter = (query) => {
    return new Promise((resolve, reject) => {
        con.query(query, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        })
    })
  }
app.listen(8000);
