const express = require('express');
const app = express();
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const postRoute = require('./routes/post');

const authRoute = require('./routes/auth');

dotenv.config();

//Connect to Mongoose DB
mongoose
  .connect(process.env.DB_CONNECT, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log("Connected to your MongoDB."))
  .catch(err => {
    console.log("Failed to connected to DB Error: "+ err.message);
  });

//request body parser Middleware
app.use(express.json());
//route moddleware
app.use('/api/user',authRoute);
app.use('/api/posts',postRoute);


app.listen(6000,()=> console.log('listening on port 6000'));
