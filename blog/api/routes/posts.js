const express = require('express');
const bodyParser =require('body-parser');
const db = require('../db');
const jwt = require('jsonwebtoken');

const router = express.Router();

const secret = process.env.secret

//get all posts
router.get('/api/allposts', (req, res) => {
 
        var sql = `SELECT post_id, author, title, published_date FROM posts ORDER BY post_id DESC`;
         db.query(sql, function (err, result) {
          if (err) return res.status(500).json(err)
          return res.send(result)
 
      });  
})

//get single post
router.get('/api/post/:id', (req, res) => {
   const post_id =req.params.id
   var sql = `SELECT content, views, image_1, image_2 FROM posts WHERE post_id =${post_id}`;
   db.query(sql, function (err, result) {
    if (err) return res.status(500).json(err);
    return res.send(result[0])

});  
})

//add post
router.post('/api/upload', async (req, res) => {
   
  const token = req.headers['access-token']
  if(!token) return res.status(401).json("Not authenticated!")
  
  jwt.verify(token, secret, (err, userInfo)=>{
    if(err) return res.status(403).json("Token is not valid");

    const {title, content, author, published_date, user_id, image_1, image_2} = req.body;
   //insert post
    var sql = `INSERT INTO posts (title, content, author, published_date, user_id, image_1, image_2) VALUES ( "${title}", "${content}", "${author}",  '${published_date}',  ${user_id}, '${image_1}', '${image_2}')`;
    db.query(sql, function (err, result) {
      if (err) return res.status(500).json(err);
      console.log("post created");
      return res.status(200).send({message: "Post created"});
    
  });  
  })
  });

//edit post
router.put('/api/editpost/:id',async (req, res) => {

  const token = req.headers['access-token']
  if(!token) return res.status(401).json("Not authenticated!")
  
  jwt.verify(token, secret, (err, userInfo)=>{
    if(err) return res.status(403).json("Token is not valid");
  
    const post_id = req.params.id
    const user_id =userInfo.user_id

   const {title, content, author, published_date, image_1, image_2} = req.body;
  //edit  post
    var sql = `UPDATE posts SET title= "${title}", content="${content}", author="${author}",  published_date= '${published_date}' , image_1 = '${image_1}', image_2 = '${image_2}' WHERE post_id= ${post_id} AND user_id = ${user_id}`;
    db.query(sql, function (err, result) {
      if (err) return res.status(500).json(err);
      console.log("post updated");
      return res.status(200).send({message: "Post updated"});

  });   
  })
});

//delete post
router.delete('/api/deletePost/:id', async (req, res)=>{

const token = req.headers['access-token']
if(!token) return res.status(401).json("Not authenticated!")

jwt.verify(token, secret, (err, userInfo)=>{
  if(err) return res.status(403).json("Token is not valid");

  const post_id = req.params.id
  const user_id =userInfo.user_id
  //delete  post
  var sql = `DELETE FROM posts WHERE post_id = ${post_id} AND user_id= ${user_id}`;
  db.query(sql, function (err, result) {
    if (err) return res.status(403).json("You can only delete your post!");
    console.log("post deleted");
    return res.status(200).send({message: "Post deleted"});
   });   
})
})

//add view
router.post('/api/addView', async (req, res)=>{

  const {post_id} = req.body;

    var sql = `UPDATE posts SET views = views + 1 WHERE post_id = ${post_id}`;
    db.query(sql, function (err, result) {
        if (err) return res.status(500).json(err)
        console.log("post viewed");
        return res.status(200).send({message: "Post viewed"});
    });
})

module.exports = router
