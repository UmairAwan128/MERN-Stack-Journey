const Joi = require("joi");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/vidlyGenres")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.log("Could not connect to mongoDB..."));

app.use(express.json());

//we are telling express whenever in route/url you get "/api/genres" you need to dedicate
//the handling of those routes to the "genres" router file
app.use("/api/genres", genres);
app.use("/api/customers", customers);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
