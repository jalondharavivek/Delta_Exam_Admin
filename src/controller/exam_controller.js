const con = require('../connection/mysql');
var db = require('../connection/mysql');
require('../connection/module');
// Importing moment module
const moment = require('moment');

let limit = 10;
const selectedcategory = async function (req, res) {
  try {
    let arr = [];

    let exam_id = req.query.exam_id;

    let sql1 = `select category_id from exam_category where exam_id='${exam_id}'`;
    let [data1] = await db.execute(sql1);

    for (i = 0; i < data1.length; i++) {

      let sql2 = `select * from category where category_id='${data1[i].category_id}' AND category_status = '1'`;

      let [data2] = await db.execute(sql2);


      arr.push(data2);
    }

    res.send(arr);
  } catch (err) {
    res.send(err);
  }
}

const edit = async function (req, res) {
  try {


    let id = req.query.exam_id;

    let sql1 = `select * from exam where exam_id=${id};`
    let [data1] = await db.execute(sql1);

    res.send(data1);

  } catch (err) {
    res.send(err);
  }
}

const post_edit = async function (req, res) {

  try {

    let exam = req.body.exam_name;
    let category = req.body.category;
    let question = req.body.question;
    let time = req.body.time;
    let start_date = req.body.start_date;
    let exam_id = req.body.exam_id;
    let strcat = ''; //str for store category in one line

    if (typeof (category) == "string") {

      sql3 = `select category_name from category where category_id='${category}'`;

      let [data3] = await db.execute(sql3);

      let sql1 = `update exam set exam_name='${exam}',total_questions='${question}',exam_time='${time}',exam_date='${start_date}',category_name='${data3[0].category_name}',user_id='${req.session.user_id}' where exam_id=${exam_id};`;
      let [data1] = await db.execute(sql1);

      let sql4 = `select count(exam_category_id) as numrows  from exam_category where exam_id = '${exam_id}' `;
      let [data4] = await db.execute(sql4);
      let oldlen = data4[0].numrows;
      let newlen = 1;

      let sql5 = `select exam_category_id from exam_category where exam_id = ${exam_id}`;
      let [data5] = await db.execute(sql5);

      if (oldlen > newlen) {
        for (i = 0; i < newlen; i++) {
          let sql6 = `update exam_category set category_id =${category} where exam_category_id = ${data5[i].exam_category_id}`;
          let [data6] = await db.execute(sql6);
        }
        for (i = newlen; i < oldlen; i++) {
          let sql7 = `delete from exam_category where exam_category_id = '${data5[i].exam_category_id}';`;
          let data7 = await db.execute(sql7);
        }
      } else if (oldlen == newlen) {
        for (i = 0; i < newlen; i++) {
          let sql6 = `update exam_category set category_id=${category} where exam_category_id = ${data5[i].exam_category_id};`;
          let data6 = await db.execute(sql6);
        }

      }
    } else {
      for (i = 0; i < category.length; i++) {

        sql3 = `select category_name from category where category_id='${category[i]}'`;

        let [data3] = await db.execute(sql3);
        strcat += data3[0].category_name;
        strcat += ', ';
      }

      let categories = strcat.substring(0, strcat.length - 2);

      let sql1 = `update exam set exam_name='${exam}',total_questions='${question}',exam_time='${time}',exam_date='${start_date}',category_name='${categories}',user_id='${req.session.user_id}' where exam_id=${exam_id};`;
      let [data1] = await db.execute(sql1);



      let sql4 = `select count(exam_category_id) as numrows  from exam_category where exam_id = '${exam_id}' `;
      let [data4] = await db.execute(sql4);
      let oldlen = data4[0].numrows;
      let newlen = category.length;


      let sql5 = `select exam_category_id from exam_category where exam_id = ${exam_id}`;
      let [data5] = await db.execute(sql5);

      if (oldlen > newlen) {
        for (i = 0; i < newlen; i++) {
          let sql6 = `update exam_category set category_id =${category[i]} where exam_category_id = ${data5[i].exam_category_id}`;
          let [data6] = await db.execute(sql6);
        }
        for (i = newlen; i < oldlen; i++) {
          let sql7 = `delete from exam_category where exam_category_id = '${data5[i].exam_category_id}';`;
          let data7 = await db.execute(sql7);
        }
      } else if (oldlen == newlen) {
        for (i = 0; i < newlen; i++) {
          let sql6 = `update exam_category set category_id=${category[i]} where exam_category_id = ${data5[i].exam_category_id};`;
          let data6 = await db.execute(sql6);
        }
      } else if (oldlen < newlen) {
        for (i = 0; i < oldlen; i++) {
          let sql6 = `update exam_category set category_id =${category[i]} where exam_category_id = ${data5[i].exam_category_id}`;
          let [data6] = await db.execute(sql6);
        }
        for (i = oldlen; i < newlen; i++) {
          let sql7 = `INSERT INTO exam_category (exam_id, category_id) VALUES ('${exam_id}', '${category[i]}');`;
          let data7 = await db.execute(sql7);
        }
      }

    }

    res.redirect("/examlist");
  } catch (err) {
    res.send(err);
  }
}

const editoption = async (req, res) => {
  try {
    let sql1 = `select * from exam where exam_id=${req.query.exam_id};`
    let [data1] = await db.execute(sql1);
    res.send(data1);
  } catch (err) {
    res.send(err)
  }
}

const categories = async (req, res) => {

  try {
    let sql1 = `SELECT * FROM category where category_status='1';`;
    let [data1] = await db.execute(sql1);
    let arr = [];
    let arr2 = [];

    for (let i = 0; i < data1.length; i++) {
      arr.push(data1[i].category_name)
      arr2.push(data1[i].category_id)
    }

    res.json({ arr, arr2 });
  } catch (err) {
    res.send(err);
  }


}

const examlist = async (req, res) => {
  try {

    let count;
    let page = req.query.num || 1;
    let curpage = parseInt(req.query.num);

    let offset = (page - 1) * limit;


    if (isNaN(offset)) {
      offset = 0;
    }
    sql2 = `select count(*) as numrows from exam ;`;
    let [data2] = await db.execute(sql2);

    count = Math.ceil(data2[0].numrows / limit);


    sql1 = `select * from exam limit ${offset},${limit};`;
    let [data1] = await db.execute(sql1);


    let sql3 = `select a.exam_name,b.category_name,a.exam_id from exam a, category b , exam_category c where a.exam_id = c.exam_id and b.category_id = c.category_id;`;
    let [data3] = await db.execute(sql3);

    


    res.render("../src/views/examlist", { data1, count, curpage, data3 });
  } catch (err) {
    res.send(err);
  }

}

const exam = async function (req, res) {
  try {
    res.render("../src/views/exam");

  } catch (err) {
    res.send(err)
  }
}

const post_exam = async (req, res) => {

  try {

    let exam = req.body.exam_name;
    let question = req.body.question;
    let time = req.body.time;

    let start_date = req.body.start_date;
    let category = req.body.category;

    let str = "";
    let num = "0123456789";
    let lan = num.length;
    let random = Math.floor(Math.random() * 6);

    for (let i = 0; i < 6; i++) {
      str += num.charAt(Math.floor(Math.random() * 6));

    }
    if (typeof (category) == "string") {
      sql3 = `select category_name from category where category_id='${category}'`;
      let [data3] = await db.execute(sql3);


      sql1 = `INSERT INTO exam (exam_name, total_questions, exam_time, exam_access_code, user_id, exam_status, exam_date,  created_date, category_name) VALUES ( '${exam}', '${question}', '${time}', '${str}', '${req.session.user_id}', '0', '${start_date}',  NOW(),'${data3[0].category_name}');`;

      let [data1] = await db.execute(sql1);


      let appid = data1.insertId;

      let sql2 = `insert into exam_category (exam_id,category_id) values ('${appid}',${category});`;

      let [data2] = await db.execute(sql2);
    } else {

      let strcat = ''; //str for store category in one line

      for (i = 0; i < category.length; i++) {
        sql3 = `select category_name from category where category_id='${category[i]}'`;
        let [data3] = await db.execute(sql3);

        strcat += data3[0].category_name;

        strcat += ', ';
      }

      let categories = strcat.substring(0, strcat.length - 2);


      sql1 = `INSERT INTO exam (exam_name, total_questions, exam_time, exam_access_code, user_id, exam_status, exam_date,  created_date, category_name) VALUES ( '${exam}', '${question}', '${time}', '${str}', '${req.session.user_id}', '0', '${start_date}',  NOW(),'${categories}');`;

      let [data1] = await db.execute(sql1);


      let appid = data1.insertId;


      for (i = 0; i < category.length; i++) {

        let sql2 = `insert into exam_category (exam_id,category_id) values ('${appid}',${category[i]});`;

        let [data2] = await db.execute(sql2);

      }
    }
    res.redirect("/examlist");
  } catch (err) {
    res.send(err)
  }

}

const examstatus = async (req, res) => {
  try {
    let status = req.query.status;
    let id = req.query.id;
  
    let date = req.query.date
    let current_date = moment().format('DD/MM/YYYY');
    let datearr = date.split('/');
    let current_datearr = current_date.split('/');

   

    if (parseInt(datearr[2]) < parseInt(current_datearr[2])) {
      console.log("yesr<yesr")
      sql1 = `update exam set exam_status = 0 where exam_id='${id}' `
      let [data1] = await db.execute(sql1);
      res.send(data1)

    } else if (parseInt(datearr[2]) == parseInt(current_datearr[2])) {
      console.log("yesr=yesr")

      if (parseInt(datearr[1]) < parseInt(current_datearr[1])) {
        console.log("month<month");
        sql1 = `update exam set exam_status = 0 where exam_id='${id}' `
        let [data1] = await db.execute(sql1);
        res.send(data1)

      } else if (parseInt(datearr[1]) == parseInt(current_datearr[1])) {
        console.log("month=month");

        if (parseInt(datearr[0]) < parseInt(current_datearr[0])) {
          console.log("day<day")
          sql1 = `update exam set exam_status = 0 where exam_id='${id}' `
          let [data1] = await db.execute(sql1);
          res.send(data1)

        } else if (parseInt(datearr[0]) == parseInt(current_datearr[0])) {
          await tooglefetch(); 
        } else {
          await tooglefetch();
        }
      } else {
        await tooglefetch();
      }
    } else {
      await tooglefetch();
    }

    async function tooglefetch() {
      console.log("function")
      if (status == '1') {

        sql1 = `update exam set exam_status = 0 where exam_id='${id}' `
        let [data1] = await db.execute(sql1);
        res.send(data1)
      }
      else {
        sql1 = `update exam set exam_status = 1 where exam_id='${id}' `
        let [data1] = await db.execute(sql1);
        res.send(data1)
      }
    }   
  } catch (err) {
    res.send(err)
  }

}

const examsearch = async (req, res) => {
  try {
    if (req.query.exam_name == null || req.query.exam_name == "''") {

    } else {

      var data = [];
      let count1;

      // let id = req.query.id;
      let page = req.query.num || 1;

      // string to int 
      let curpage = parseInt(req.query.num) || 1;

      // declare limit and offset 

      let offset = (page - 1) * limit;


      if (isNaN(offset)) {
        offset = 0;
      }
      sql2 = `select count(*) as numrows from exam;`;
      let [data2] = await db.execute(sql2);

      count1 = Math.ceil(data2[0].numrows / limit);

      let exam_name = req.query.exam_name;

      let sql4 = `select * from exam where exam_name like '%${exam_name}%' limit ${offset},${limit};`;

      let [data1] = await db.execute(sql4);
      
      let sql5 = `select * from exam where exam_name like '%${exam_name}%';`
      let [data5] = await db.execute(sql5);
      
      
      let sql3 = `select a.exam_name,b.category_name,a.exam_id from exam a, category b , exam_category c where a.exam_id = c.exam_id and b.category_id = c.category_id;`;
      let [data3] = await db.execute(sql3);
      
      
    

      res.json({ data1, curpage, limit, count1, data5, data3 });

    }
  } catch (err) {
    res.send(err)
  }
}

const examlistpage = async (req, res) => {
  try {

    let page = req.query.page || 1;
    let curpage = parseInt(req.query.page);

    let offset = (curpage - 1) * limit;

    if (isNaN(offset)) {
      offset = 0;
    }

    sql2 = `select count(*) as numrows from exam ;`;
    let [data2] = await db.execute(sql2);

    let count = Math.ceil(data2[0].numrows / limit);

    sql1 = `select * from exam limit ${offset},${limit};`;
    let [data1] = await db.execute(sql1);


    let sql3 = `select a.exam_name,b.category_name,a.exam_id from exam a, category b , exam_category c where a.exam_id = c.exam_id and b.category_id = c.category_id;`;
    let [data3] = await db.execute(sql3);
    


    res.json({ count, data1, curpage, data3 });

  } catch (err) {
    res.send(err);
  }
}

module.exports = { selectedcategory, edit, post_edit, editoption, categories, examlist, exam, post_exam, examstatus, examsearch, examlistpage };