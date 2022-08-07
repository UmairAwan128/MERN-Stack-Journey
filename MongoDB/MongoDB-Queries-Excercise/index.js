//firs see exercise-Command-RunFirst.txt and run the command written in
//it in the cmd to create DB with records
//npm i mongoose@5.0.1
const mongoose = require("mongoose");
//connecting to the mongoDB server of this machine so we passed its address which
//is also caled connecionString of specific DB.
mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() =>
    console.log("Connected to MongoDB and Your DB is Created if not found...")
  );

//in "mongoose" package we have "scheema" which we use to define a shape of documents/tables
//in MongoDB or to define the list of properties in a document so creating a scheema for storing "courses"
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number
});

const Course = mongoose.model("Course", courseSchema); //this will return a "Course" type class depending on scheema passed

//showBackendCourses();

async function showBackendCourses() {
  //as GetBackendCourses() return a promise so used here await and as await used
  //so this line should be inside async function so called this from outside
  const courses = await GetBackendCourses();
  console.log(courses);
}

//get name and authorName of courses which are backend and are published
//and sort them by "name".
async function GetBackendCourses() {
  return await Course.find({ tags: "backend", isPublished: true })
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });
}

showPublishedCourse();

async function showPublishedCourse() {
  const courses = await GetPublishedCourse();
  console.log(courses);
}

//get name,price and authorName of courses which are published and are either frontend/backend not any other
//so for this we have specific values so "in" used and then sort result by "price" in descending order.
async function GetPublishedCourse() {
  //   const courses = await Course.find({
  //     isPublished: true,
  //     tags: { $in: ["backend", "frontend"] }
  //   })
  //     .sort({ price: -1 })
  //     .select({ name: 1, author: 1, price: 1 });

  //or do same thing using "or" operator inspite of "in" so

  courses = await Course.find({
    isPublished: true
  })
    .or([{ tags: "frontend" }, { tags: "backend" }])
    .sort({ price: -1 })
    .select({ name: 1, author: 1, price: 1 });

  return courses;
}
