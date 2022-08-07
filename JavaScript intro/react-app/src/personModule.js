//First Check the JsForReact.js then come here
//8. Modules in JS

//we have placed a class in a seperate file this cleans our code and its
//called modularization and hence each file is called module.
//now as the class is in seperate file so now it will not be accessible outside
//to access it outside it should be public for this we use keyword "export".
export class Person {
  //by Convention name of class first letter will be capital then camel case
  constructor(name) {
    this.name = name; //will auto create a field for the class with name "name"
  }
  walk() {
    console.log("Walk");
  }
}
