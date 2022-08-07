//we can run this JS file either by using codeRunner Extension or using the
//node command for this first navigate to the folder in Terminal of IDE/cmd then
//type node fileName.js e.g node JsForReact.js

//1. how to declare varibles
//var -> scope is inside function
//const,let -> scope is inside block only inspite of whole function
//in JS functions are object
// function sayHello() {
//   for (var i = 0; i < 5; i++) {
//     console.log(i);
//   }
//   console.log(i); //accessible as var

//   for (let j = 0; j < 5; j++) {
//     console.log(j);
//   }
//   // console.log(j); //not accessible
// }
// const i = 1; //value will never change
// sayHello();

//2. Objects(key value pair of group of related variables) in JS
// const person = {
//   name: "Umair",
//   walk: function() {
//     //in JS functions are object
//     //declare function for object as
//   },
//   talk() {
//     //or declare function for object as in short way
//     console.log(this); //"this" returns a ref of the object its inside so here its inside person
//   },
//   address: {
//     city: "Lahore",
//     country: "Pakistan"
//   }
// };
// //accessed members of object as
// // person.name = "Shehzad"; //accessed as if we know the index/property we want to access
// // const memberToAccess = "name"; //get member/index to access either from user or other then
// // person[memberToAccess] = "Shehzad"; //pass it as this way and access or modify that index value
// person.talk(); //will return the whole person object refernce as in method this is logged/returned but
// const myTalk = person.talk; //myTalk is now also pointing to same function talk() but
// //myTalk(); //returns undefined/BrowserWindow obj inpite of person whole object so that diff b/w "this" in js VS other
// //so solution is first bind the method to person obj then assign so
// const myTalkBinded = person.talk.bind(person); //so we can say that methods in JS are objects
// myTalkBinded(); //so now person obj reference will be returned
// console.log(person.address.city);
//3. Functions old vs new in JS in JS
// //long way
// const square = function(number) {
//   return number * number;
// };
// //short way
// const square = number => {
//   return number * number;
// };
// //shorter way if body of function has only one line
// const square = number => number * number;
// console.log(square(5));
// //e.g no 2 shorter way of function writting is useful for performing functions on array
// const jobs = [
//   { id: 1, isActive: true },
//   { id: 2, isActive: true },
//   { id: 3, isActive: false }
// ];
// //find all jobs which are active
// const activeJobs = jobs.filter(job => job.isActive); //equilent to function(job){return job.isActive;}
// console.log(activeJobs);

//4.arrow function and "this"

// const person = {
//   name: "Umair",
//   talk() {
//     //not binded if we want we will explicitly do that
//     setTimeout(function() {
//       //as not binded so window object will be referenced by "this"
//       console.log("Window Ref: ", this);
//       //to bind this to person just first declare "ref" outside the setTimeout()
//       //var ref = this; //then      console.log("Person Ref: ", ref); here inside
//     }, 10);
//   },
//   //or bind "this" to person using the arrow function inspite of of ordinary function
//   walk() {
//     //binded as used arrow function so arrow function are by default binded
//     setTimeout(() => {
//       //as binded so person object will be referenced by "this"
//       console.log("Window Ref: ", this);
//     }, 10);
//   }
// };
// person.talk();
// person.walk();

//5. Traversing an array and TemplateLiteral(cleaner way of writing html inside JS i.e no single/double quote)
// const colors = ["red", "blue", "green"];
// const items = colors.map(color => "<li>" + color + "<li>"); //using old way
// const items = colors.map(color => `<li> ${color} </li>`); //using the templateLiteral
// console.log(items);

//6. Object Destructuring(getting specific members value from an object in single line)
// const address = {
//   street: "sabzazar",
//   city: "lahore",
//   country: "pakistan"
// };
// //say we wan city and country value
// //old way was long
// //const city = address.city;
// //const country = address.country;
// //new way is
// const { city, country } = address; //from address object get two members named city, country
// //and store them in new variables named same as the members name i.e city, country if we want
// //other name so just after : type the name
// const { street: st } = address;
// console.log(st + " " + city);

//6.SpreadOperator(...)(For Concatenating two string)
// const first = [1, 2, 3];
// const second = [4, 5, 6];
// const combined = first.concat(second); //old way
// console.log(combined);
// //new way with additional feature of adding a value in start,mid and end of the concatenated array while concatenating
// const combinedSpread = [0, ...first, 3.5, ...second, 7]; //as array combining so square brackets used
// console.log(combinedSpread);
// //also spreadOperator is useful for combining two objects.
// const firstObj = { name: "umair" };
// const secondObj = { job: "Software Engineer" };
// //also here we can add a new member in start,mid and end of the concatenated obj while concatenating
// const combindObj = { ...firstObj, ...secondObj, location: "Lahore" }; //as obj combining so curly brackets used
// console.log(combindObj);
// //also spread operator is useful for cloning an array or object
// const colned = [...first];
// const colnedObj = { ...firstObj }; //but brackets should be curly here
// console.log(colnedObj);

//7.Classes(use only if many object having same members else staight a way object as did above) in JS
// class Person {
//   //by Convention name of class first letter will be capital then camel case
//   constructor(name) {
//     this.name = name; //will auto create a field for the class with name "name"
//   }
//   walk() {
//     console.log("Walk");
//   }
// }
// const person = new Person();
// person.walk();
// //inheritence  in classes (we will be able to access all fields and members of parent class)
// class Teacher extends Person {
//   constructor(name, degree) {
//     super(name); //in constructor child first call the parent class constructor
//     this.degree = degree;
//   }
//   teach() {
//     console.log("teach");
//   }
// }
// const teacher = new Teacher("Umair", "BSCS");
// teacher.teach();
// console.log(teacher.name);

//8. Modules in JS for this check the index.js,teacherModule.js,personModule.js
