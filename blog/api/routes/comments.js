const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken')


const secret = process.env.secret

//retrieve all post comments
router.get('/api/allComments/:id', (req, res)=>{
  
   const post_id=req.params.id;

    var sql = `select users.username, comments.comment, comments.comment_id, comments.user_id from users inner join comments on users.user_id = comments.user_id where comments.post_id= ${post_id} order by comment_id desc`;
    db.query(sql, function (err, result) {
      if (err) throw err;
      return res.send(result)
  });
})

//add comment
router.post('/api/addComment/:id', async (req, res)=>{
   
  const token = req.headers['access-token']
  if(!token) return res.status(401).json("Not authenticated!")
  
  jwt.verify(token, secret, (err, userInfo)=>{
    if(err) return res.status(403).json("Token is not valid");
    let user_id= userInfo.user_id;
    let post_id = req.params.id
    let {comment} = req.body;
    
    //insert comment

        var sql = `INSERT INTO comments (comment, user_id, post_id) VALUES (  "${comment}",  ${user_id},  ${post_id})`;
        db.query(sql, function (err, result) {
          if (err)  res.status(500).json({message: err});
          console.log("comment created");
      });
        return res.status(200).json({message: "Comment created"});
  })
})

//delete comment
router.delete('/api/deleteComment/:id', async (req, res)=>{

const token = req.headers['access-token']
if(!token) return res.status(401).json("Not authenticated!")

jwt.verify(token, secret, (err, userInfo)=>{
  if(err) return res.status(403).json("Token is not valid");

  const comment_id = req.params.id
  const user_id =userInfo.user_id

  var sql = `DELETE FROM comments WHERE comment_id = ${comment_id} AND user_id = ${user_id}`;
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log('comment deleted')
    return res.status(200).json({message: "Comment deleted"});
});    
})
})

module.exports =router;
