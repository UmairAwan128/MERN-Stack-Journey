//first see "FirstApp" project in Node folder.
//Express is a lightweight frameworks used for creating backend services/api prior we used httpModule
//in real world we don,t use this http module for creating backend service/api because as
//we add here more code and routes this implemention becomes difficult so instead of this we use
//a framework called Express which gives clean structure for handling routes also Express framework
//is built on top of HTTP moduleress
//to install:
//first   npm init --yes         //for creating package.json file
//then    npm i express
//for complete documentation of express
// https://expressjs.com/en/4x/api.html#app.get.method

const express = require("express"); //get the express class from the express module/package
const app = express(); //create an express class object now we can access methods like get(),post() using "app"
//npm i joi@14.3.1
const Joi = require("joi"); //get Joi class reference is an export

//this is used to enable parsing of json objects passed in body of request this is
//used by post request as it gets parameters like 'name' in its body so this will act like
//a middleware i.e client req come here if it has body/json it parses then pass to Post route.
app.use(express.json());

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" }
];

//designed a route for home page with its response i.e a msg
app.get("/", (req, res) => {
  res.send("Welcome to home page");
});
// we can also arrange routes in different files e.g posts related routes in one file and catrgory related on other file
app.get("/api/courses", (req, res) => {
  res.send(courses);
});
//parametered route for specific course pass id as parameter
app.get("/api/courses/:id", (req, res) => {
  //to get value of the specific parameter passed "req.params.id"
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    //if no course found then set 404 status code and send a msg
    res.status(404).send(`There is no course with id=${req.params.id}`);
    return;
  }
  res.send(course);
});

//for passing more then one parameters
app.get("/api/posts/:year/:month", (req, res) => {
  //to show all parameters passed in url write
  res.send(req.params);
  //to get value of the specific parameter passed
  //res.send(req.params.year);
});

//for passing queryString parameters in url and getting there values for recieving querystring Url will not change
//as user can pass any thing that is why query string parameters are used for optional parameters
app.get("/api/posts/:year", (req, res) => {
  //to show all parameters passed in url via query string i.e which are after ? and these
  // all parameters are stored as keyvalue pair.
  //http://localhost:3000/api/posts/2013?sortBy=name&op=3    e.g here sortBy and op are passed as querystring parameter
  res.send(req.query);
});

//saving a new courses
app.post("/api/courses", (req, res) => {
  //to get values from the body of the request like here we are getting "name" they are
  //in json form so we need to parse them so we added   app.use(express.json)    on start of file and also details there
  //using simple validation() for the name passed as parameter
  // if (!req.body.name || req.body.name.length < 3) {
  //   //400 bad request
  //   res.status(400).send("sName is required and should be minimum 3 char long");
  //   return;
  // }
  //using JOI to validate the name property passed as parameter in body of request for details about JOI see noteBook or vidly-react-Project below we
  //define scheema or rules through which our name will be validated
  //we moved validation code to a method for reusablility
  const result = validateCourse(req.body);

  if (result.error) {
    //if error found
    //400 bad request
    //result.error will show the complete error object with details about error
    //result.error.details[0].message will show the msg of error so we used this below
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name
  }; //req.body.name    get name property from the body
  courses.push(course); // add this new course in end of our courses array
  res.send(course); //return the new course object back to client may be he needs its id for doing something
});

//updating a courses
app.put("/api/courses/:id", (req, res) => {
  //to get value of the specific parameter passed
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send(`There is no course with id=${req.params.id}`);
    return;
  }
  //we moved validation code to a method for reusablility
  const result = validateCourse(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  //update the properties or course object
  course.name = req.body.name;
  res.send(course); //return the updated course object back to client may be he needs its id for doing something
});

function validateCourse(course) {
  //using JOI to validate the name property passed as parameter in body of request for details about JOI see noteBook or vidly-react-Project below we
  //define scheema or rules through which our name will be validated
  const scheema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  //then called validate method first parameter/obj is the property and second is the rules againt them
  //in result we either get error,value either of them will be null if there is an error so error prop
  //will have value and "value" prop will be null and if no error then "error" will be null and "value" will
  //have the object we passed that's why where we call this method we checked for if "error" has value
  const result = Joi.validate(course, scheema);
  return result;
}

//updating a courses
app.delete("/api/courses/:id", (req, res) => {
  //to get value of the specific parameter passed
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send(`There is no course with id=${req.params.id}`);
    return;
  }
  const index = courses.indexOf(course); //get index/id of course passed
  courses.splice(index, 1); //in array move to "index"/loc passed then delete 1 object
  res.send(course); //return the deleted course object back to client may be he needs its id for doing something
});

//assign a port to the app and when app is loaded there show this msg
//used here environment variable to set the port value if there is no environment variable
//or its value the assign 3000. by default there is builtin 'PORT' env variable for this use that.
const port = process.env.PORT || 3000; //for details see react notebook
//to assign value to env variable or create new in console not in terminal of VSCode but in the windows CMD type
// set PORT=5000
//this will create an env variable named PORT and assign it a value 5000.

app.listen(port, () => console.log(`Listening to port ${port}...`));

//we installed     npm i -g nodemon
//nodemon is a package that will restart our application automatically if any changes happen
//so we will just start the app first and after that if any change happens in the project file
//nodemon will automatically restart the server/app.
//start the app using nodemon not with node.
//      nodemon index.js
