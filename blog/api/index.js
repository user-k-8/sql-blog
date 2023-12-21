const express = require('express');
const cors = require('cors');
const bodyParser =require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./db')

db.connect(()=>{
    console.log('db connected')
})

const app = express();

app.use(express.json())

app.use(cors()); // Enable CORS with custom options

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
  });

app.use(cookieParser())
app.use(bodyParser.json());


const postsRoute = require('./routes/posts')
const commentsRoute = require('./routes/comments')
const usersRoute = require('./routes/users')

app.use('/posts', postsRoute)
app.use('/comments', commentsRoute)
app.use('/api', usersRoute)


app.listen(4000, () => {
    console.log(`Server running on localhost: 4000`)
})

