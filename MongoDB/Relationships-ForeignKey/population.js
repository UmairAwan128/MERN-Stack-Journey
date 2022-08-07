const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/RelationshipsDemo")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB...", err));

const Author = mongoose.model(
  "Author",
  new mongoose.Schema({
    name: String,
    bio: String,
    website: String
  })
);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    //to define that a course has a author we defined two properties i.e type as objectId and ref as nameOfDocument to reference
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author"
    }
  })
);

async function createAuthor(name, bio, website) {
  const author = new Author({
    name,
    bio,
    website
  });

  const result = await author.save();
  console.log(result);
}

//creating a course requires namd and authorId or authorRef
async function createCourse(name, author) {
  const course = new Course({
    name,
    author
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  // //to show name and authorId from all the courses
  //const courses = await Course.find().select("name author");

  // //to show name and complete author object for all the courses use populate('author') 'author' is name of foreignKey we used in Course
  // const courses = await Course.find()
  //   .populate("author")
  //   .select("name author");

  //to show name of course and only name of author inspite of whole object for all the courses
  //in populate() as second parameter we pass name of properties of author object/document we
  //want to show so we passed "name", we can also exclude properties we don,t want to show
  //e.g we dont want to show _id of "author" so use '-' sign with name of property as -_id
  const courses = await Course.find()
    .populate("author", "name -_id")
    .select("name author");

  // //if we have another foreignKey e.g "category" we can use populate() two times as
  // const courses = await Course.find()
  //   .populate("author", "name -_id")
  //   .populate("category", "name")
  //   .select("name author");

  console.log(courses);
}

//createAuthor("Mosh", "My bio", "My Website");

//createCourse("Node Course", "5cbb0e423063d305a08b9e81");

listCourses();
