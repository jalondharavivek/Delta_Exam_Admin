const express = require('express');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var db = require('./connection/mysql');
const sessions = require('express-session');
var cookie = require('cookie-parser');
var utils = require('util');
const { decode } = require('punycode');
let bodyParser = require('body-parser')
const mysql = require("mysql2/promise");
const flash = require('connect-flash');
var nodemailer = require('nodemailer');
const path = require('path')
const app = express();
app.use(express.static('public'));
app.use(sessions({
    secret: "huy7uy7u",
    saveUninitialized: true,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, 
      },
  }));
const ejs = require('ejs');
const { signedCookie } = require('cookie-parser');
const { Console } = require('console');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/assets/image'));
app.use(express.static(__dirname + ''));
const PORT = process.env.PORT || 8765;
app.set('view engine', 'ejs');

app.use(cookie());
app.use(flash());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



const category = require('./routes/manoj_index')
app.use("/", category)

const vivek_indexfile = require('./routes/vivek_index')
app.use("/", vivek_indexfile)

const darshilindex = require('./routes/darshil_index')
app.use("/", darshilindex)

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '/public')))

const milan_indexfile = require('./routes/milan_index')
app.use('/',milan_indexfile)

const kartik_indexfile = require('./routes/user_kartik_index')
app.use('/',kartik_indexfile)

app.listen(PORT, () => console.log(`port connected to ${PORT}!`))
