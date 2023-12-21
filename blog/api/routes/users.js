const express= require('express');
const router = express.Router()
const bcrypt = require('bcrypt');
const db = require('../db');
const jwt = require('jsonwebtoken');
require('dotenv').config()// for .env file

const secret = process.env.secret
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
     }
     else{
    
       //encrypt the password
       const hashedPwd = await bcrypt.hash(password, 10);
    
      //store the new user
        var sql = `INSERT INTO users (username, email, password) VALUES ( "${username}", "${email}", "${hashedPwd}")`;
        db.query(sql, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted");
          return res.sendStatus(200);
        });
}  });

})

router.post('/login',  async (req, res)=>{

        const {email, password}= req.body

        var sql = `SELECT email, password, user_id  FROM users WHERE email = "${email}"`;
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
         if (!match) {    
             return  res.status(401).send({status: "401"});//unauthorised   
        } 

            //generate token
            const token = jwt.sign({user_id: result[0].user_id, email:email}, secret);
            return res.json({user_id: result[0].user_id, token});    
        

    });
})


module.exports= router
