const express = require('express');
const cors = require('cors');
const bodyParser =require('body-parser');
const mysql  = require('mysql2');
require('dotenv').config()// for .env file

const app = express();

  app.use(cors()); // Enable CORS with custom options

const PORT = 4000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//creating a mysql databse connection
const con = mysql.createConnection({
   host: process.env.host,
   user: process.env.user ,
   password:  process.env.password,
   database:  process.env.database
});

con.connect(function(err){
  if(err) throw err;
  console.log("Connected!")
});

const postsRoute = require('./routes/posts')
const commentsRoute = require('./routes/comments')
const usersRoute = require('./routes/users')

app.use('/posts', postsRoute)
app.use('/comments', commentsRoute)
app.use('/api', usersRoute)

app.listen(PORT, () => {
    console.log(`Server running on localhost: ${PORT}`)
})

