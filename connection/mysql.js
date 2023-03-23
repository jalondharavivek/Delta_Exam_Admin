const mysql = require("mysql2/promise");

let con = mysql.createPool({
host: "localhost",
user: "root",
password: "root",
database: "exam_system"
})


module.exports = con;