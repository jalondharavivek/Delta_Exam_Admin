var db = require('../connection/mysql');
require('../connection/module')


const resultget = async(req,res) =>{
    let sql = `select ee.exam_id , ee.exam_name ,ee.total_questions ,ee.exam_time ,ee.exam_status  from  exam ee inner join 
    user_answers uans on ee.exam_id = uans.exam_id;`
     let [query] = await db.query(sql);
     console.log(query);
     res.render('result',{data : query});
}

const viewresultget =  async(req,res) =>{
    let sql = `SELECT category_name FROM exam  a, user_answers b 
    where a.exam_id=b.exam_id`;
     let [query] = await db.query(sql);
     console.log(query);
     res.render('viewresult',{data : query});
}



 
const viewquestionget = async (req,res) =>{
    let sql = `select q.question_text , q.answer ,uans.user_answers ,  uans.marks from questions  q inner join 
    user_answers uans on q.question_id=uans.question_id;`;
     let [query] = await db.query(sql);
     console.log(query);


        let sql1 = `select  s.name from student s inner join result r on s.student_id=r.student_id`;
        let [stu_name] = await db.execute(sql1);
        console.log(stu_name);

        res.render('viewquestionresult',{data : query, stu_name:stu_name});
}

module.exports = { viewquestionget,viewresultget,resultget}; 
