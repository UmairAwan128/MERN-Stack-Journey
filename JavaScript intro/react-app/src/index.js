//First Check the JsForReact.js then come here
//8. Modules in JS

//import React from "react";
//import ReactDOM from "react-dom";
import "./index.css";
//import App from "./App";
import * as serviceWorker from "./serviceWorker";

//to use Teacher class now as its default export of teacherModule.js file so
//curly braces will not be used which is the same way react is imported above
import Teacher from "./teacherModule";
//to use promote method from teacherModule.js file
import { promote } from "./teacherModule";
//also in one line

//import Teacher, { promote } from "./teacherModule";
// so Teacher class is default export and promote method is named export
// for teacherModule or file
const teacher = new Teacher("Farhan", "Geologist");
console.log(teacher.name);
teacher.teach();

promote(); // as imported now we can call the import function here as

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
