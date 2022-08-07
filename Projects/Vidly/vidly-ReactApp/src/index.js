import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
//when code is compiled these css will be pulled to the final css

//here we access all the values of .env files it will show all values for details about .env see noteBook or video
//we craeted to environemnt files one is .env and second is .env.development which is specific for development environment
//and currently the app is in development state other can be production and testing
//console.log(process.env);
//accessed specific value that we created in .env.development file
//one thing to kept in mind is these expression that refer to envirment variables are replaced
//with actual values during build time and we know build is made on start of app only once so
//any change in file you either restart app or re-build app
//in broswer inspectelement -> source ->localhost.. ->static -> js -> bundle.js find this line
//u will see value not the varable.
//bundle.js include all out javascript code
console.log("umair", process.env.REACT_APP_NAME);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
