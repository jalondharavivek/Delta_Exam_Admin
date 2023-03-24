const express = require('express');
const route = express.Router();
const auth = require('../middleware/middleware');
const result = require('../controller/result_controller');

route.get('/result',auth,result.resultget)

route.get('/viewresult',auth,result.viewresultget);

route.get('/viewquestionresult',auth,result.viewquestionget);

module.exports = route; 
