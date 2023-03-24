const express = require('express');
const auth = require('../middleware/middleware');
const route = express.Router();

const category = require('../controller/category_controller');

route.get('/category',auth,category.category);

route.post('/categorypage',auth,category.categorypage);

route.post('/categorystatus',auth,category.categorystatus);

route.post('/editcategory',auth,category.editcategory);

route.get('/editCategory',auth,category.get_editCategory);

route.post('/addcategory',auth,category.addcategory);

route.get('/search',auth,category.search);

module.exports = route;
