const express = require('express');
const route = express.Router();

const login = require('../controller/darshil_controller');

route.get('/',login.admin_login);

route.post('/login',login.login);
route.get('/forget',login.forget);
route.get('/dashboard',login.dashboard);

route.get('/setPassword',login.setpassword);
route.post('/setPassword',login.post_setpassword);

route.post('/fetch_api',login.fetch_api);

route.get('/updatePassword',login.updatePassword);

route.post('/updatePassword',login.post_updatePassword);


module.exports = route;