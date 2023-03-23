const express = require('express');
const route = express.Router();

const result = require('../controller/sejal_controller');

route.get('/result',result.resultget)

route.get('/result',result.viewresultget);

route.get('/result',result.viewquestionget);

module.exports = route; 
