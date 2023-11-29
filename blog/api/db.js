const mysql  = require('mysql2');

//creating a mysql databse connection
const con= mysql.createConnection({
    host: process.env.host,
    user: process.env.user ,
    password:  process.env.password,
    database:  process.env.database
 });

 module.exports = con
