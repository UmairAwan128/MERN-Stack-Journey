//npm i mongoose@5.0.1
const mongoose = require("mongoose");
//connecting to the mongoDB server of this machine so we passed its address which
//is also caled connecionString of specific DB. Here name of DB is "playgound"
//if this DB doesnot exist it will be automatically created by MongoDB for us.
//the connect() returns a promise so we can call then() and catch() on it for details see "async-demo" project in "Node" folder
mongoose
  .connect("mongodb://localhost/playgound")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(error => console.log("Failed to connect to MongoDB", error));

//MongoDB does not have tables but has collections for storing data.Collections/table
//are like list of objects, in MongoDB we call each row/object a "document"
//each document has a collection of keyValue pairs.
//in "mongoose" package we have "scheema" which we use to define a shape of documents/tables
//in MongoDB or to define the list of properties in a document so creating a scheema for storing "courses"
const courseSchema = new mongoose.Schema({
  //creating object of scheema object passing it properties we want for table/document
  name: String,
  author: String,
  //creating an array of string which will be key value pair of int(index) and string(value)
  tags: [String],
  //if we want to use multiple attributes for single property
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});
//we have created scheema now to create an object/documnent based on this scheema so
//we first need to create model/class of our scheema so we can create an object of that
//class then we can save that object in to the database
//first parameter should be singular name of collection that this model is for so in MongoDB we
//will get "collection" called "Courses" and second parameter is "scheema" for this collection
const Course = mongoose.model("Course", courseSchema); //this will return a "Course" type class depending on scheema passed

// //we have created scheema now to create an object/documnent based on this scheema so created method
// createCourse(); //when this will run automaticall DB and its collections/tables will cretaed if not found
// //then a course will be inserted which we created.

async function createCourse() {
  //creating object/document of this "Course" class we get
  const course = new Course({
    //we did not used date as it has default value so it gets optional
    name: "Angular course",
    author: "Mosh",
    tags: ["Angular", "backend"],
    isPublished: true
  });
  //MongoDB is NoSQL DB the benifit of using what we get here is above we used "tags"
  //which is an array of string against a course which we cannot do in MSSQL as we can
  //single value only to store multiple like this we need to create a seperate table
  //for tags then connect that to courses table but here its very easy.

  //now saving the object we created in the MongoDB
  const result = await course.save(); //will return the object stored along with id assigned by mongoDB to
  //this very object which we can use if we want.
  console.log(result);
}

async function getCourses() {
  //get all courses from DB find() returns documentQuery object which is kind of promise so we can call then() on it/result.
  //const courses = await Course.find();
  //to filter pass property of list of properties as object so we passed two
  //we can also limit no of records we get and we can apply sort() and pass one or
  //more attribute with value 1 for sort by ascending and -1 for sorting descending
  //and select() we passed properties which we want in result and ignore other and
  //assigned them value 1. so we will get only two properties in result.
  const courses = await Course.find({ author: "Mosh", isPublished: true })
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);

  //   //For Better Filter or writting more complex queries we use "--Comparision Operator--" which are
  //   // eq (equal)
  //   // ne (not equal)
  //   // gt (greater than)
  //   // gte (greater than or equal)
  //   // lt (less then)
  //   // lte (less then or equal)
  //   //all above are and to specify range of value and to specify a set of values we us
  //   // in
  //   // nin (not in)
  //   //we use these as value to properties/attributes starting with $ and are written in object as
  //   //for example say we have "price" attribute for each course so
  //   find({ price: { $gt: 10 } }); //to get courses whose price is greater then 10
  //   find({ price: { $gte: 10, $lte: 20 } }); //to get courses whose price is b/w 10 and 20
  //   find({ price: { $in: [10, 15, 20] } }); //to get courses whose price is either 10,15 or 20 use "in"

  //   //We also have "--logical Operations--" which are
  //   // and
  //   // or
  //   //Both and,or has there seperate methods which requires an array of objects on which operation(And/Or) is applied
  //   //each object will have one or more properties.
  //   //for example
  //   Course.find()
  //   .or([{ author: Mosh }, { isPublished: true }]);  //get courses which are either published or whose author is "Mosh"
  //   .and([{ author: Mosh }, { isPublished: true }]);  //get courses which are published and whose author is "Mosh" also

  //   // We also have "--RegularExpressions--" for more complex filtering they are also used
  //   // in find() as value of the attributes there syntax is '/expression/' so first '/' indicates
  //   // start of Regular expression and second '/' indicates end of Regular expression.
  //   // '^' is used to represent string that start with something
  //   // '$' is used to represent string that ends with something
  //   // 'i' is used case insensitivity as bydefault the regExp are case sensitive
  //   // '.*' means here in this place we can have string of length 0 or more
  //   // For Example we want all courses whose author name starts with "Mo" so can be written as
  //   //   .find({ author: "/^Mo/" });   //all author name starts with "Mo" and its casesensitve
  //   //   .find({ author: "/hamadani$/i" });   //all author name ends with "hamadani" and "i" means it caseInsensitve string can be either upper/lower
  //   //   .find({ author: "/.*Um.*/" });  //get all author name containing "Um" so "Um" can be either start/middle/end of authorName
}

//getCoursesCount();

//to get Count of Courses we use count() inspite of select()
async function getCoursesCount() {
  //we used Regulare Expression below for details see getCourses() comments at end of method
  const coursesCount = await Course.find({
    author: "Mosh",
    isPublished: true
  })
    .limit(10)
    .sort({ name: 1 })
    .count();
  console.log(coursesCount);
}

//getCoursesPagination();

//to get paginated data we use two methods skip() and limit() skip() will be used
//to get position from which we will start taking records then limit() is used to take specific
// no of records from there which is pageSize.
async function getCoursesPagination() {
  const pageNumber = 2;
  const pageSize = 10;

  const courses = await Course.find({ author: "Mosh", isPublished: true })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}

//to update a specific course we have two approaches in MongoDB
//1. QueryFirst (here we first find record by id then modify its properties then save it)
//   "queryFirst" approach is used when we get Id from user we find record if found then update so user want to update record
//    this is also useful when we want to apply business rule like update course only if its published
//2. UpdateFirst (here we directly update the document and we can optionally get the record/document if we want)
//   in "UpdateFirst" you will be updating the record or list of records knowing that it exists in DB.
//   so not getting id/input from user and we just want to update record.
//here we follow QueryFirst approach.
async function updateCourseQueryFirst(id) {
  const course = await Course.findById(id);
  if (!course) return;

  // //business Logic if course is not published return
  // if (!course.isPublished) return;

  course.isPublished = true;
  course.author = "new Author";
  //or update values using set() both does same thing
  // course.set({
  //   isPublished: true,
  //   author: "new Author"
  // });
  const result = await course.save();
  console.log(result);
}

// //we get id from MongoDB compass for ease
// updateCourseQueryFirst("5cb20fa4105cf7297cbaf405");

//2. UpdateFirst (here we directly update the document and we can optionally get the record/document if we want)
//   in "UpdateFirst" you will be updating the record or list of records knowing that it exists in DB.
//   so not getting id/input from user and we just want to update record.
//here we follow UpdateFirst approach.
async function updateCourse_UpdateFirst(id) {
  // //for this we use update() which requires two parameters
  // //1. query/filter object (use this to specify or filter or get record/records you want to update)
  // //2. updateObject (here we use one or more mongoDB operator to perform action e.g we used "$set" as we want to assign value to properties)
  // //   complete list of mongoDB operator are here  https://docs.mongodb.com/manual/reference/operator/update/

  // const result = await Course.update(
  //   { _id: id },
  //   {
  //     $set: {
  //       author: "Mosh",
  //       isPublished: false
  //     }
  //   }
  // );

  // //so we directly updated the record we wanted
  // //in result we will get an object like { n: 1, nModified: 1, ok: 1} telling about update statistics updated 1 document/record
  // console.log(result);

  // //if you want to get the document/record updated use findByIdAndUpdate() inspite of "update()"
  // //and make sure that its first parameter is "id" or single value inpite of "query/filter object"
  // //but here we get the record/document with old values that were before updating to these values we passed below

  // const oldCourse = await Course.findByIdAndUpdate(id, {
  //   $set: {
  //     author: "Umair",
  //     isPublished: true
  //   }
  // });

  // console.log(oldCourse);
  //if we want to get the updated document/record with latest values we passed righnow we add third parameter
  //which is an object with property new:true.
  const updatedCourse = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "Moss",
        isPublished: true
      }
    },
    { new: true }
  );
  console.log(updatedCourse);
}

//updateCourse_UpdateFirst("5cb20fa4105cf7297cbaf405");

removeCourse("5cb20fa4105cf7297cbaf405");
async function removeCourse(id) {
  //for this we use deleteOne()/deleteMany() which requires one parameter
  //1. query/filter object (use this to specify or filter or get record/records you want to delete)
  // if filtering gives more the one record e.g if we passed "isPublished:true" deleteOne() will delete
  //the first record it founds but deleteMany() will delete all the records found.
  //  const result = await Course.deleteOne({ _id: id });
  //  const result = await Course.deleteOne({ isPublished: true });
  // //in result we will get an object like { n: 1, ok: 1} telling about delete statistics deleted 1 document/record
  //  console.log(result);

  //if we want to get the document/record we deleted use findByIdAndRemove() pass it id not object
  const course = await Course.findByIdAndRemove(id);
  console.log(course);
}
