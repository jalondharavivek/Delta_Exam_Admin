const express = require('express');
const auth = require('../middleware/middleware');
const route = express.Router();

const user = require('../controller/user_controller');
const app = require('./question');

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

route.get('/user/search',auth,user.search)

module.exports = route;
