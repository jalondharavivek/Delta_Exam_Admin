const express = require('express');
const route = express.Router();

const exam = require('../controller/milan_controller');

route.get('/selected/category',exam.selectedcategory);

route.get('/edit',exam.edit);

route.post('/edit',exam.post_edit);

route.get('/edit/option',exam.editoption);

route.get('/categories',exam.categories);

route.get('/examlist',exam.examlist);

route.get('/exam',exam.exam);

route.post('/exam',exam.post_exam);

route.get('/exam/status',exam.examstatus);

module.exports = route;