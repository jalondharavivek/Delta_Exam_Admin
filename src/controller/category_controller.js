var db = require('../connection/mysql');
require('../connection/module')

const category = async (req, res) => {
    try{

    
        let sql = `SELECT * FROM category `;
        let page = req.query.page || 1;
        let limit = req.query.limit || 10;
        if (req.query.page > 1)
            sql += ` LIMIT ${((page - 1) * limit)}, ${limit}`;
        else
            sql += ` LIMIT ${limit} `;
        let [query] = await db.query(sql);
        let sql1 = "select count(*) as total from category";
        let [result1] = await db.query(sql1);
        res.render('../src/views/category',{ data : query, page : page, total: result1[0].total, limit: limit });
    }
    catch(err){
        console.log(err);
    }
}

const categorypage = async (req, res) => {
    try
    {
        let sql = `SELECT * FROM category `;
        let page=parseInt(req.body.page)||1;
        let limit=parseInt(req.body.limit)||10;
        let startindex=(page-1)*limit;
        let endindex=page*limit-startindex;
        if (req.body.page > 1)
            sql += ` LIMIT ${((page - 1) * limit)}, ${limit}`;
        else
            sql += ` LIMIT ${limit} `;
        let [query] = await db.query(sql);

        let sql1 = "select count(*) as total from category";
        let [result1] = await db.query(sql1);

        let Totalpages = `select count(*) as total from category where category_name like '%${req.body.name}%'`;
        let [[Totalpagesquery]] = await db.query(Totalpages);
        let pages = `select * from category where category_name like '%${req.body.name}%' limit ${startindex},${endindex}`;
        let [pages1] = await db.query(pages);
        res.json({ data : query, page: page, total: result1[0].total, limit: limit, pages : pages1, totalpages : Totalpagesquery.total });
    }
    catch (err){
        console.log(err);
    }
}

const categorystatus = async (req, res) =>{
    try{

        let id = req.body.id;
        let status = req.body.status
        let page=parseInt(req.query.page)||1;
        let limit=parseInt(req.query.limit)||10;
        let startindex=(page-1)*limit;
        let sql1 = `select * from category `;
        if (req.query.page > 1)
            sql1 += ` LIMIT ${((page - 1) * limit)}, ${limit}`;
        else
            sql1 += ` LIMIT ${limit} `;
        if(status == 0)
        {
            let sql = `update category set category_status = '1' where category_id = ${id}`;
            await db.query(sql);
            let [result] = await db.query(sql1);
            res.json(result);
        }
        else if(status == 1)
        {
            let sql = `update category set category_status = '0' where category_id = ${id}`;
            await db.query(sql);
            let [result] = await db.query(sql1);
            res.json(result);
        }
    }
    catch(err){
        console.log(err);
    }
}

const editcategory = async (req, res) => {
    try
    {
        let b = req.body;
        let sql = `update category set category_name = '${b.category_name}' where category_id = ${b.category_id}`;
        await db.query(sql);
        res.redirect('category');
    }
    catch(err){
        console.log(err);
    }
}

const get_editCategory = async (req,res) => {
    try
    {
        let id = req.query.id;
        let sql = `select category_id, category_name from category where category_id = ${id}`;
        let [ans] = await db.query(sql);
        res.json(ans);
    }
    catch(err){
        console.log(err);
    }
}

const addcategory = async (req, res) => {
    try
    {

        let sql = `insert into category (category_name,category_status,created_date) values ('${req.body.category_name}','0',now())`;
        await db.query(sql);
        res.redirect('category');
    }
    catch(err)
    {
        console.log(err);
    }
}

const search = async (req, res) => {
    try
    {
        let sql = `SELECT * FROM category `;
        let name = req.query.name;
        let page=parseInt(req.query.page)||1;
        let limit=parseInt(req.query.limit)||10;
        let startindex=(page-1)*limit;
        let endindex=page*limit-startindex;
        

        let [query] = await db.query(sql);

        let sql1 = `select count(*) as total from category where category_name like '%${name}%'`;
        let [result1] = await db.query(sql1);

        let pages = `select * from category limit ${startindex},${endindex}`;
        let [pages1] = await db.query(pages);

        let srch = `select * from category where category_name like '%${name}%' limit ${startindex},${endindex}`;
        let [query1] = await db.query(srch);
        res.json({search : query1,data : query, page: page, total: result1[0].total, limit: limit, pages : pages1 });
    }
    catch(err){
        console.log(err);
    }
}

module.exports = {category,categorypage,categorystatus,editcategory,get_editCategory,addcategory,search};