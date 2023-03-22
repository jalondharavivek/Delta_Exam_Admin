const express = require('express')
const path = require('path')
const app = express();
const mysql = require("mysql2/promise");
const port = 8765;
app.set("view engine", "ejs");
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


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


const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "exam_system",

});

app.get('/', (req, res) => {
  res.render("login")
});


app.listen(port, () => console.log(`port connected to ${port}!`))
