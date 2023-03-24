const express = require('express');
const route = express.Router();

const login = require('../controller/login_controller');
const auth = require('../middleware/middleware');
route.get('/',login.admin_login);

route.post('/login',login.login);
route.get('/forget',login.forget);
route.get('/dashboard',auth,login.dashboard);

route.get('/setPassword',login.setpassword);
route.post('/setPassword',login.post_setpassword);

route.post('/fetch_api',login.fetch_api);

route.get('/updatePassword',login.updatePassword);

route.post('/updatePassword',login.post_updatePassword);
route.get('/logout',login.logout);
module.exports = route;