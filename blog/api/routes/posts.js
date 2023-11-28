const express = require('express');
const bodyParser =require('body-parser');
const multer = require('multer');
const mysql  = require('mysql2');

const router = express.Router();

//creating a mysql databse connection
const con = mysql.createConnection({
  host: process.env.host,
  user: process.env.user ,
  password:  process.env.password,
  database:  process.env.database
});


const upload = multer({dest:'./uploads'});

//get all posts
router.get('/api/allposts', (req, res) => {
    con.connect(function(err){
        if(err) throw err;

        var sql = `SELECT * FROM Posts ORDER BY post_id DESC`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          return res.send(result)
        });
      });  
})

//add post
router.post('/api/upload',upload.array('images', 2), async (req, res) => {
   
 const {title, content, author, published_date, user_id} = req.body;

//insert post
con.connect(function(err){
    if(err) throw err;

    var sql = `INSERT INTO Posts (title, content, author, published_date, user_id) VALUES ( "${title}", "${content}", "${author}",  '${published_date}',  ${user_id})`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("post created");
      return res.status(200).send({message: "Post created"});
    });
  });  
  });

//edit post
router.post('/api/editpost', upload.array('images', 2), async (req, res) => {
    
const {post_id, title, content, author, published_date, user_id, views} = req.body;
//edit  post
con.connect(function(err){
    if(err) throw err;

    var sql = `UPDATE Posts SET title= "${title}", content="${content}", author="${author}",  published_date= '${published_date}', views = ${views} WHERE post_id= ${post_id}`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("post updated");
      return res.status(200).send({message: "Post updated"});
    });
  });   
});

//delete post
router.delete('/api/deletePost', async (req, res)=>{
        
const {post_id} = req.body;

//delete  post
con.connect(function(err){
  if(err) throw err;

  var sql = `DELETE FROM Posts WHERE post_id = ${post_id}`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("post deleted");
    return res.status(200).send({message: "Post deleted"});
  });
});   
})

//add view
router.post('/api/addView', async (req, res)=>{

  const {post_id} = req.body;
  
  con.connect(function(err){
    if(err) throw err;
  
    var sql = `UPDATE Posts SET views = views + 1 WHERE post_id = ${post_id}`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("post viewed");
      return res.status(200).send({message: "Post viewed"});
    });
  });   
})

// retrieve views
router.post('/api/views', async (req, res)=>{

  const {post_id} = req.body;
  
  con.connect(function(err){
    if(err) throw err;
  
    var sql = `SELECT views FROM Posts WHERE post_id = ${post_id}`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("post viewed");
      return res.send(result);
    });
  });   
})
module.exports = router
