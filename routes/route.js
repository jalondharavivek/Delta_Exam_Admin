const express = require('express');
const auth = require('../middleware/middleware');
const route = express.Router();




const result = require('../controller/result_controller');
const exam = require('../controller/exam_controller');
const category = require('../controller/category_controller');
const login = require('../controller/login_controller');
const question = require('../controller/question_controller');
const user = require('../controller/user_controller');

route.get('/category',auth,category.category);
route.post('/categorypage',auth,category.categorypage);
route.post('/categorystatus',auth,category.categorystatus);
route.post('/editcategory',auth,category.editcategory);
route.get('/editCategory',auth,category.get_editCategory);
route.post('/addcategory',auth,category.addcategory);
route.get('/search',auth,category.search);


route.get('/selected/category',auth,exam.selectedcategory);
route.get('/edit',auth,exam.edit);
route.post('/edit',auth,exam.post_edit);
route.get('/edit/option',auth,exam.editoption);
route.get('/categories',auth,exam.categories);
route.get('/exam/search',auth,exam.examsearch);
route.get('/examlist/page',auth,exam.examlistpage);
route.get('/examlist',auth,exam.examlist);
route.get('/exam',auth,exam.exam);
route.post('/exam',auth,exam.post_exam);
route.get('/exam/status',auth,exam.examstatus);

route.get('/',login.admin_login);
route.post('/login',login.login);
route.get('/forget',login.forget);
route.get('/dashboard',auth,login.dashboard);
route.get('/setPassword',login.setpassword);
route.post('/setPassword',login.post_setpassword);
route.post('/fetch_api',login.fetch_api);
route.get('/updatePassword',login.updatePassword);
route.post('/updatePassword',login.post_updatePassword);
route.get('/logout',login.logout);

route.get('/question',auth,question.question)
route.get('/addquestion',auth,question.addquestion)
route.post('/addquestion',auth,question.upload.single('image'),question.addquestionpost)
route.get('/viewdetail',auth,question.viewdetail)
route.get('/editquestion',auth,question.editquestionget)
route.post('/editquestion',auth,question.editquestionpost)
route.post('/deletquestion',auth,question.deletquestion)
route.get('/searchque',auth,question.searchget)
route.get('/retriveque',auth,question.retrivequestions)
route.post('/retrivequestion',auth,question.retrivequestionpost)
route.post('/question/questionpage',auth,question.questionpage)

route.get('/result',auth,result.resultget)
route.post('/page',auth,result.page);
route.get('/viewresult',auth,result.viewresultget);
route.get('/viewquestionresult',auth,result.viewquestionget);

route.get('/user',auth,user.user);
route.post('/userpage',auth,user.userpage);
route.get('/student_status',auth,user.student_status);
route.get('/college',auth,user.college);
route.get('/allcollege',auth,user.allcollege);
route.get('/edit/:id',auth,user.editid);
route.get('/student/allcity',auth,user.allcity);
route.get('/student/city',auth,user.city);
route.get('/city',auth,user.getcity);
route.post('/update',auth,user.update);
route.get('/user/search',auth,user.search);


module.exports = route;