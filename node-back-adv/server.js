
// Connecting the dependencies like express, dotenv, cors

const express = require('express');
const dotenv = require('dotenv');
// cors to connect the frontend and  backend together.
const cors = require('cors')
require('./util/dbconnect.js');
dotenv.config();
// PORT is to  set up our port number for deployment or local development
const PORT = process.env.PORT;
const app=express();
app.use(cors());
app.use(express.json());
// importing routes from other files
app.use(require('./routes/user.route.js'));
app.use(require('./routes/post.route.js'));

app.listen(PORT, ()=>{
    console.log( `Server is running at http://localhost:${PORT}`);
})

