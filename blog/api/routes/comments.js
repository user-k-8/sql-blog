const express = require('express');
const router = express.Router();
const db = require('../db');


//retrieve all post comments
router.post('/api/allComments', (req, res)=>{
  
  const {post_id}=req.body;

    var sql = `select users.username, comments.comment, comments.comment_id, comments.user_id from users inner join comments on users.user_id = comments.user_id where comments.post_id= ${post_id} order by comment_id desc`;
    db.query(sql, function (err, result) {
      if (err) throw err;
      return res.send(result)
  });
})

//add comment
router.post('/api/addComment', async (req, res)=>{
   
    let {comment, user_id, post_id} = req.body;
    
    //insert comment

        var sql = `INSERT INTO comments (comment, user_id, post_id) VALUES (  "${comment}",  '${user_id}',  ${post_id})`;
        db.query(sql, function (err, result) {
          if (err) throw err;
          console.log("comment created");
          return res.status(200).send({message: "Comment created"});
      });
})

//delete comment
router.delete('/api/deleteComment', async (req, res)=>{
  const {comment_id} = req.body;

    var sql = `DELETE FROM comments WHERE comment_id = ${comment_id}`;
    db.query(sql, function (err, result) {
      if (err) throw err;
      return res.status(200).send({message: "Comment deleted"});
  });    
})

module.exports =router;
