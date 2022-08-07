const mongoose = require("mongoose");

const postScheema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    },
  description: String,
  date: {
    type: Date,
    default: Date.now
  },
  isPublished: Boolean,
  userId: {
    type: Number,
  }
});

module.exports = mongoose.model("Posts", postScheema); // "Posts" will be the name of our table.
