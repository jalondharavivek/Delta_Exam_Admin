
const express = require('express')
const path = require('path')
const app = express();
const mysql = require("mysql2/promise");
app.set("view engine", "ejs");
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '/public/')))
const db = mysql.createPool({
host: "localhost",
user: "root",
password: "root",
database: "exam_system",
});


app.get('/category',async (req, res) => {

    let sql = `SELECT * FROM category `;
    let page = req.query.page || 1;
    let limit = req.query.limit || 10;
    if (req.query.page > 1)
        sql += ` LIMIT ${((page - 1) * limit)}, ${limit}`;
    else
        sql += ` LIMIT ${limit} `;
    // console.log(sql);
    let [query] = await db.execute(sql);
    let sql1 = "select count(*) as total from category";
    let [result1] = await db.execute(sql1);
    res.render('category',{ data : query, page : page, total: result1[0].total, limit: limit });
})

app.post('/categorypage', async (req,res) => {

    let sql = `SELECT * FROM category `;

    // console.log(req.body.page);
    let page=parseInt(req.body.page)||1;
    let limit=parseInt(req.body.limit)||10;
    let startindex=(page-1)*limit;
    let endindex=page*limit-startindex;
    if (req.body.page > 1)
        sql += ` LIMIT ${((page - 1) * limit)}, ${limit}`;
    else
        sql += ` LIMIT ${limit} `;
    let [query] = await db.execute(sql);

    let sql1 = "select count(*) as total from category";
    let [result1] = await db.execute(sql1);

    let pages = `select * from category where category_name like '%${req.body.name}%' limit ${startindex},${endindex}`;
    // console.log(pages );
    let [pages1] = await db.execute(pages);
    res.json({ data : query, page: page, total: result1[0].total, limit: limit, pages : pages1 });
})

app.post('/categorystatus',async (req, res) => {
    let id = req.body.id;
    let status = req.body.status
    // console.log(i);
    let page=parseInt(req.query.page)||1;
    let limit=parseInt(req.query.limit)||10;
    let startindex=(page-1)*limit;
    let endindex=page*limit-startindex;
    let sql1 = `select * from category `;
    if (req.query.page > 1)
        sql1 += ` LIMIT ${((page - 1) * limit)}, ${limit}`;
    else
        sql1 += ` LIMIT ${limit} `;
    if(status == 0)
    {
        let sql = `update category set category_status = '1' where category_id = ${id}`;
        let [query] = await db.execute(sql);
        let [result] = await db.execute(sql1);
        // console.log("1");
        res.json(result);
    }
    else if(status == 1)
    {
        let sql = `update category set category_status = '0' where category_id = ${id}`;
        let [query] = await db.execute(sql);
        let [result] = await db.execute(sql1);
        // console.log("0");
        res.json(result);
    }
})

app.post('/editcategory',async (req, res) => {
    let b = req.body;
    let sql = `update category set category_name = '${b.category_name}' where category_id = ${b.category_id}`;
    let [query] = await db.execute(sql);
    res.redirect('category');
    // console.log(b);
})

app.get('/editCategory',async (req, res) => {
    let id = req.query.id;
    let sql = `select category_id, category_name from category where category_id = ${id}`;
    let [ans] = await db.execute(sql);
    res.json(ans);
    // console.log(ans);
    // console.log(id);
})

app.post('/addcategory',async (req, res) => {
    let sql = `insert into category (category_name,category_status,created_date) values ('${req.body.category_name}','0',now())`;
    let [query] = await db.execute(sql);
    res.redirect('category');
    // console.log(query);
})

app.get('/search',async (req, res) => {
    let sql = `SELECT * FROM category `;
    // console.log(req.query);
    let page=parseInt(req.query.page)||1;
    let limit=parseInt(req.query.limit)||10;
    let startindex=(page-1)*limit;
    let endindex=page*limit-startindex;
    let name = req.query.name;

    let [query] = await db.execute(sql);

    let sql1 = `select count(*) as total from category where category_name like '%${name}%'`;
    let [result1] = await db.execute(sql1);

    let pages = `select * from category limit ${startindex},${endindex}`;
    let [pages1] = await db.execute(pages);
    // console.log(result1);

    let srch = `select * from category where category_name like '%${name}%' limit ${startindex},${endindex}`;
    let [query1] = await db.query(srch);
    res.json({search : query1,data : query, page: page, total: result1[0].total, limit: limit, pages : pages1 });
})  

module.exports = app;