
const express = require('express');
const route = express.Router();
const question = require('../controller/vivek_controller');

route.get('/question',question.question)
route.get('/addquestion',question.addquestion)
route.post('/addquestion',question.addquestionpost)
route.get('/viewdetail',question.viewdetail)
route.get('/editquestion',question.editquestionget)
route.post('/editquestion',question.editquestionpost)
route.get('/deletequestion',question.deletquestionget)
route.get('/searchque',question.searchget)

module.exports = route;
