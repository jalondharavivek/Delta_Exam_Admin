const express = require('express');
const route = express.Router();
const auth = require('../middleware/middleware');
const exam = require('../controller/exam_controller');

route.get('/selected/category',exam.selectedcategory);

route.get('/edit',exam.edit);

route.post('/edit',exam.post_edit);

route.get('/edit/option',exam.editoption);

route.get('/categories',exam.categories);

route.get('/exam/search',exam.examsearch);

route.get('/examlist/page',exam.examlistpage);

route.get('/examlist',exam.examlist);

route.get('/exam',exam.exam);

route.post('/exam',exam.post_exam);

route.get('/exam/status',exam.examstatus);

module.exports = route;