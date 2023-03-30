const mysql = require("mysql2/promise");
require("dotenv").config( '../.env' );

let con = mysql.createPool({
host: process.env.host || "localhost",
user: process.env.user || "root",
password: process.env.password || "root",
database: process.env.database || "exam_system"
})


module.exports = con;