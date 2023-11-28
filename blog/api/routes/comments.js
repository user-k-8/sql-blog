const express = require('express');
const router = express.Router();
const mysql  = require('mysql2');

//creating a mysql databse connection
const con = mysql.createConnection({
  host: process.env.host,
  user: process.env.user ,
  password:  process.env.password,
  database:  process.env.database
});

//retrieve all post comments
router.post('/api/allComments', (req, res)=>{
  
  const {post_id}=req.body;

  con.connect(function(err){
    if(err) throw err;
    var sql = `select Users.username, Comments.comment, Comments.comment_id, Comments.user_id from Users inner join Comments on Users.user_id = Comments.user_id where Comments.post_id= ${post_id} order by comment_id desc`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      return res.send(result)
    });
  });
})

router.post('/api/addComment', async (req, res)=>{
   
    let {comment, user_id, post_id} = req.body;
    
    //insert comment
    con.connect(function(err){
        if(err) throw err;  
        var sql = `INSERT INTO Comments (comment, user_id, post_id) VALUES (  "${comment}",  '${user_id}',  ${post_id})`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("comment created");
          return res.status(200).send({message: "Comment created"});
        });
      });
})

//delete comment
router.delete('/api/deleteComment', async (req, res)=>{
  const {comment_id} = req.body;

  con.connect(function(err){
    if(err) throw err;
    var sql = `DELETE FROM Comments WHERE comment_id = ${comment_id}`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      return res.status(200).send({message: "Comment deleted"});
    });
  });    
})

module.exports =router;
