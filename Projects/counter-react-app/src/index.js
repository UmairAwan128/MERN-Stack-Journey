import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import * as serviceWorker from "./serviceWorker";

//we imported bootstrap for design
import "bootstrap/dist/css/bootstrap.css";
//getting the reference of the our Counter class or component from counter.jsx
//  i.e in the components folder of src folder now as imported we can
//use the tag <Counter /> and when we write this that html will be generated
//that we wrote in the render() method of the Counter class/component.  i.e
//import Counters from "./components/Counters";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
//registerServiceWorker(); //from video
