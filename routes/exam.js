const express = require('express');
const route = express.Router();
const auth = require('../middleware/middleware');
const exam = require('../controller/exam_controller');

route.get('/selected/category',auth,exam.selectedcategory);

route.get('/edit',auth,exam.edit);

route.post('/edit',auth,exam.post_edit);

route.get('/edit/option',auth,exam.editoption);

route.get('/categories',auth,exam.categories);

route.get('/examlist',auth,exam.examlist);

route.get('/exam/search',auth,exam.examsearch);

route.get('/exam',auth,exam.exam);

route.post('/exam',auth,exam.post_exam);

route.get('/exam/status',exam.examstatus);

module.exports = route;