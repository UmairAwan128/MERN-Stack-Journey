import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
//we moved code for initializing and using sentry to myLogginService.js and called here
//a method for reusability and in future if we want to use some other library we can wasily change
// that i.e only one place we will be changing it.
import myLoggingService from "./services/myLoggingService";
myLoggingService.init(); //this method will initialize/setup the Syntry configration for this application

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
