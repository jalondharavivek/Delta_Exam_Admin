
const express = require('express');
const auth = require('../middleware/middleware');
const route = express.Router();
const question = require('../controller/question_controller');

route.get('/question',auth,question.question)
route.get('/addquestion',auth,question.addquestion)
route.post('/addquestion',auth,question.addquestionpost)
route.get('/viewdetail',auth,question.viewdetail)
route.get('/editquestion',auth,question.editquestionget)
route.post('/editquestion',auth,question.editquestionpost)
route.get('/deletequestion',auth,question.deletquestionget)
route.get('/search',auth,question.searchget)

module.exports = route;
