//we can run this JS file either by using codeRunner Extension or using the
//node command for this first navigate to the folder in Terminal of IDE/cmd then
//type node fileName.js e.g node JsForReact.js

//1. without Encapsulation
let baseSalary = 30000;
let rate = 20;
let overtime = 10;
//this method requires 3 parameters to pass on each call
function getWage(baseSalary, overtime, rate) {
  return baseSalary + overtime * rate;
}
// with Encapsulation(group related variables functions together to reduce complexity and inc reusablity)
let employee = {
  baseSalary: 30000,
  rate: 20,
  overtime: 10,
  //this method don,t require anyparameters that all are in this object
  //will access them own its own.
  getWage() {
    return this.baseSalary + this.overtime * this.rate;
  }
};
console.log(getWage(30000, 20, 10));
console.log(employee.getWage()); //a better function is which has no parameters

//Abstraction(hide details/complexity and show only essentials to user)
//Inheritence(to elimnate redundant/repetative code and place it in single file)
//Polymorphism(refactor ugly switch/case statements different behaviours from same method)

//3.Factory Function(inpite of declaring several objects with same code
// define them in function which creats and return new obj when required/called) so
//this function will create an object or circle when called
function createCircle(radius) {
  return {
    radius: radius,
    draw() {
      console.log("A Circle with radius " + radius);
    }
  };
}
const circle = createCircle(2);
circle.draw();

//4.Constructor Function(an other way of creating an object with speific properties/methods
// like we did for Factory Function i.e define them in function which creats and return
// new obj of all required memners) so again this function will create an object or circle when called
//but its way of writting and calling is differnt only as we should follow some conventions.
//first thing its not a class but a function first letter of ite name should be capital and
//then the camel case as you know
function CreateCircle(radius) {
  //use "this" with all members of the function
  this.radius = radius;
  this.draw = function() {
    console.log("A Circle with radius " + radius);
  };
  //also no return statement
}
//also creating the obj/calling the such Function requires using new keyword before like we did for classes
const circle2 = new CreateCircle(4);
circle2.draw();

//5.Every object,valueTypes,reference types have property/function called constructor which is called
//when we assign them a value e.g
//let x={};  //translated as let x= new Object(); //so called constructor name d object which created object for us
//which we did above in ConstructorFunction() which also creates a specific type of obj and called with new keyword
//also when
//let c = ""; //calls the String COnstructorFunction as let c = new String();
//and new Number() for 1,2,3 we can check them by using the constructor built in property for each.

//4. even Functions in JS are objects as they are also created by using the
// builtin constructor named Function() which can be checked by using the nameOfFunc.constructor
console.log(CreateCircle.constructor);

//6.valueType(primitives)(string,number,boolean) VS referenceType(object,Function,Array)
//primitives are copied by their value so assigning them to other variables their value will
//be passed and changing one variable will not effect other
// whereas objects are copied by their reference so when assigning them to other variables
// their refernce/address will be passed and changing one variable value will also change other
let obj = { value: 10 };
let num = 10;
function increase(obj, num) {
  obj.value++;
  num++;
}
increase(obj, num); //obj.value = 11 incremented and num=10 will not change.

//7. Adding/Removing properties from already created Object it also applicable to foactoryFunction
//and ConstructorFunction() as we know function are also objects so using above CreateCircle
//ConstructorFunction() here and we will add location property to it and then remove it
// first create its object.
const newCircle = new CreateCircle(3);
newCircle.location = { x: 15, y: 45 }; //added location property for only this object
newCircle.color = "red";
//also same but used if prop name will be decided on runtime by user or other
let propName = "location";
//newCircle[propName] = { x: 15, y: 45 };
console.log(newCircle);
//delete newCircle.location; //deletes the location property
//or delete newCircle[propName];
//console.log(newCircle);
// we use this kind of adding and removing when we will be sending data to/from server
// and we don,t want to pass a specific property so delete that or for sending we want provide
//an additional property also so add the property to this object and then pass the object.

//8. Enumerating properties
//for this we are using the above declared object newCircle
//as object is a keyValue pair so to get all keys from object we can
for (let key in newCircle) {
  if (typeof newCircle[key] != "function") {
    //we don,t want to get functions key so function will not be displayed
    console.log(key, newCircle[key]); //show the key and value both
  }
}
//or to get all keys of an object
const keys = Object.keys(newCircle);
console.log(keys);
//to check if a spcific key exist in the object
if ("radius" in newCircle) {
  console.log("radius found");
}

//9. Abstration(hiding unnessary properties/methods from user)
//private VS public fields in ConstructorFunction or object
function Circle12(radius) {
  //use "this" with all members of the function and they will be public
  //but if we want some properties or methods not to be accessed from outside or make them
  //private such members job is to help other members or for inside calculation
  // so inpite of using "this" with them use let to declare them so will be not accessible outside
  let defaultLoc = { x: 0, y: 0 };
  let computeOptimalLoc = function(factor) {
    //......
  };
  this.radius = radius;
  this.draw = function() {
    computeOptimalLoc(0.1); //called here as its needed
    //the properties declared with "this" will also be accessible using this inside also
    console.log("A Circle with radius " + this.radius);
  };

  //for accessing private fields we have Getters and setter which are function that are public so "this" used
  this.getDefaultLocation = function() {
    return defaultLoc;
  };
  //but we want to access them as field from outside like circle22.defaultLoc like in c# for this
  //here we use a builtin function defineProperty() which requires two parameters 1st is name
  //of the object/function in which we want to define then name of the property then 3rd is the
  //key value pair of two props get and set which we assign functions
  Object.defineProperty(this, "defaultLoc", {
    get: function() {
      return defaultLoc;
    },
    set: function(value) {
      //parameter name should be value
      //we use setter and getter both if we wnat to get a valid input from user or to apply
      //some condition on the value given by the user e.g omit null input by user
      if (!value.x || !value.y) {
        //Error() is also a built in constructor function to create an error msg as new keyword used
        throw new Error("Invalid location provided");
      }
      defaultLoc = value;
    }
  });

  //also no return statement
}
//also creating the obj/calling the such Function requires using new keyword before like we did for classes
const circle22 = new Circle12(4);
//circle22.computeOptimalLoc(12); //generate error as computeOptimalLoc(12) is private which is abstration
//i.e hiding unnecessary things from user as he don,t even need that will be only used by function/object itself inside

console.log(circle22.getDefaultLocation()); //calling getter funcion
console.log(circle22.defaultLoc); //calling getter property we are not directly accessing the private field
circle22.defaultLoc = { x: 1, y: 2 }; //calling the setter property to et a new value
console.log(circle22.defaultLoc); //calling getter property we are not directly accessing the private field

//e.g StopWatch application for all what we study
function StopWatch() {
  let startTime,
    endTime,
    running,
    duration = 0;

  this.start = function() {
    if (running == true) {
      throw new Error("Stop watch is already running");
    }
    running = true;
    startTime = new Date(); //startTime set to current dateTime
  };
  this.stop = function() {
    if (running == false) {
      throw new Error("Stop watch is already stoped");
    }
    running = false;
    endTime = new Date();
    const seconds = (endTime.getTime() - startTime.getTime()) / 1000;
    duration += seconds;
  };
  this.reset = function() {
    startTime = null;
    endTime = null;
    running = false;
    duration = 0;
  };

  //readonly property for duration as should be updated inside the function only
  Object.defineProperty(this, "duration", {
    get: function() {
      return duration;
    }
  });
}
const sw = new StopWatch();
sw.start();
sw.stop();
console.log(sw.durationn);
