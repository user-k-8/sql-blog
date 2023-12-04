const express= require('express');
const router = express.Router()
const fs = require('fs');
const fsPromises = require('fs').promises;
const multer = require('multer');
const bcrypt = require('bcrypt');
const path = require('path');
const db = require('../db');


router.post('/register', async (req, res)=>{

    const {username, email, password}= req.body

   //check for duplilcate usernames in db
    var sql = `SELECT email  FROM users WHERE email = "${email}"`;
    db.query(sql, async function (err, result) {
      if (err) throw err;
     console.log(result);

  if (result[0]) {
    console.log("email already registered")
   return res.sendStatus(409); //Conflict 
   }else{
    
    //encrypt the password
    const hashedPwd = await bcrypt.hash(password, 10);
    
    //store the new user

        var sql = `INSERT INTO users (username, email, password) VALUES ( "${username}", "${email}", "${hashedPwd}")`;
        db.query(sql, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted");
        });
  
    return res.sendStatus(200)
}  });

})

router.post('/login',  async (req, res)=>{

    const {email, password}= req.body

        var sql = `SELECT email, password  FROM users WHERE email = "${email}"`;
          db.query(sql, function (err, result) {
          if (err) throw err;
          console.log(result)
          console.log("1 record inserted");
         
          if(!result[0]){
            console.log('User not found');
            return res.status(404).send({status: "404"}); //User not found
          }

         // evaluate password 
         const match =  bcrypt.compareSync(password, result[0].password);
         if (match) {
          console.log('logged in')
    
            var sql = `SELECT user_id FROM users WHERE email = "${email}"`;
            db.query(sql, function (err, result) {
              if (err) throw err;
              console.log(result[0].user_id);

              let blog2Login = {userEmail: email, loginStatus:"LoggedIn", user_id: result[0].user_id};
              return  res.status(200).send(blog2Login)
            });   
    
        } 
        else {
          return  res.status(401).send({status: "401"});//unauthorised
        }
        });
})

module.exports= router
