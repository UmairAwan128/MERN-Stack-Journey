//First Check the JsForReact.js then come here
//8. Modules in JS
import { Person } from "./personModule"; //to use Person class from personModule.js file

//we have placed a class in a seperate file this cleans our code and its
//called modularization and hence each file is called module.
//now as the class is in seperate file so now it will not be accessible outside
//to access it outside it should be public for this we use keyword "export".

//here additionally we used default keyword so now when we import the Teacher class
//in the index.js without using the brackets but directly also there can only
//be one thing in a file that can have default keyword.
//inheritence  in classes (we will be able to access all fields and members of parent class)
export default class Teacher extends Person {
  constructor(name, degree) {
    super(name); //in constructor child first call the parent class constructor
    this.degree = degree;
  }
  teach() {
    console.log("teach");
  }
}

//also like class we can use export with functions and use them in another
//file using the import statement on top.
export function promote() {
  console.log("promote Method in teacherModule");
}
