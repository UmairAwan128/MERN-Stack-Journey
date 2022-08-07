const express = require("express");
const mongoose = require("mongoose");
const createService = require("./services/sampleRecord");
require("dotenv/config");
const cors = require("cors");
const bodyParser = require("body-parser");
const postsRoute = require("./routes/posts");

const app = express();
app.use(cors());
app.use(bodyParser.json());

//Your API ENDPOINTS
app.use("/posts", postsRoute); 

//YOUR DATABASE WITH A SAMPLE RECORD
mongoose
  .connect(process.env.DB_CONNECTION, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log("Connected to your MongoDB."))
  .catch(err => {
    console.log("Failed to connected to DB Error: "+ err.message);
  });

  let createServiceObj = null;
  createServiceObj = createService.getInstance();
  createServiceObj.createSampleRecord();
  
app.listen(5000);
