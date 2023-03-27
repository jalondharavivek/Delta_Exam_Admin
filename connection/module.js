const express = require('express')
const path = require('path')
const app = express();
app.set("view engine", "ejs");
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/uploads', express.static('uploads'));

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '/public/')))

