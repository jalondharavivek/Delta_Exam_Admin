const express = require('express');
const sessions = require('express-session');
let bodyParser = require('body-parser')
const path = require('path')
const app = express();
require("dotenv").config( './.env' );
app.use(express.static('public'));
app.use(sessions({
    secret: process.env.SECRET_KEY,
    saveUninitialized: true,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, 
      },
  }));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/assets/image'));
app.use(express.static(__dirname + ''));
const PORT = process.env.PORT;
app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())

const router = require('./src/routes/route')
app.use("/",router)

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '/public')))

app.listen(PORT, () => console.log(`port connected to ${PORT}!`));
