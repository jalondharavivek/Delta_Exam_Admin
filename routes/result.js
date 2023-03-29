const express = require('express');
const route = express.Router();
const auth = require('../middleware/middleware');
const result = require('../controller/result_controller');
route.get('/result',auth,result.studentlist);
route.get('/companylist',auth,result.companylist);

route.get('/getexamdetaile',auth,result.getexamdetaile);
route.get('/viewquestionresult',auth,result.viewquestionget);
module.exports = route; 
