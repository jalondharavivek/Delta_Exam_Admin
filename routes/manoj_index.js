const express = require('express');
const route = express.Router();

const category = require('../controller/manoj_controller');
route.get('/category',category.category);

route.post('/categorypage',category.categorypage);

route.post('/categorystatus',category.categorystatus);

route.post('/editcategory',category.editcategory);

route.get('/editCategory',category.get_editCategory);

route.post('/addcategory',category.addcategory);

route.get('/search',category.search);
module.exports = route;