const express = require('express');
const route = express.Router();

const user = require('../controller/kartik_controller');
const app = require('./vivek_index');

route.get('/user',user.user);

route.post('/user',user.userpage);

route.get('/student_status',user.student_status);

route.get('/college',user.college);

route.get('/allcollege',user.allcollege);

route.get('/edit/:id',user.editid);

route.get('/student/allcity',user.allcity);

route.get('/student/city',user.city);

route.get('/city',user.getcity);

route.post('/update',user.update);

module.exports = route;