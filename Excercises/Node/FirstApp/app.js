// function sayHello(name) {
//   console.log("Hello" + name);
// }
// sayHello("Umair");

// //these are all global objects are globally accessible
// console.log("sd");
// // setInterval();
// //these all are in windows object so we can also call them as window.setInterval();
// //also we can call our defined variables/methods in this way
// //but as in node we don,t have window object but have "global" object for these
// //the only difference is using "global" object we cannot access variables and functions
// //we defined but only the builtin so we can access the contents of one file only in that
// //file not in other files which is called modular system.
// var msg = "sdf";
// console.log(global.msg); //error undefined

// //to access/load other module/file here in this file we use require();
// //we know every module/file has "module" object  console.log(module) which
// //has a property "exports" we add method in this which we want to access outside this file.
// const logger = require("./logger"); //require() method returns the export property of the "module" object
// //store result in const so we cannot chnge it accidently
// console.log(logger); //here we get functions/objects reference which logger.js exports
// console.log(logger.log("Message"));

// //this js file was exporting a sinlge function only so we assign it dirctly to exports inpite of
// //assigning it by creating an object. so we will access it directly as a method here inspite of object.
// const logg = require("./logger2");
// console.log(logg("Message2"));

// //Using Builtin Modules in Node:
// //so we are getting builtin Module i.e 'path';
// const path = require("path"); //for getting builtin Modules we directly write there name
// //and for getting file in our project as we did above we use "./name".
// var pathObj = path.parse(__filename); //parse method converts the complete path of file which is string to some variables e.g ext,name
// //Module Warpper Funcion:
// //Node doesnot executes our module/code directly but for execution it wraps the code inside
// //this funtion as we can see this function has "exports","require","module",_filename which we use inside the module
// //(function(exports,require,module,__filename,__dirname)){ -----}
// //so we access all these parameters inside module or file as we used above.
// console.log(pathObj);

// //using another builtin Module i.e 'os';
// const os = require("os"); //used for getting info about os
// var totalMemory = os.totalmem(); //this method tells total mem in PC.
// var freeMemory = os.freemem(); //this method tells total mem in PC.
// //using template string to print.
// console.log(`Total Memory: ${totalMemory}`);
// console.log(`Free Memory: ${freeMemory}`);

// //using another builtin Module i.e fileSystem for fileHandling i.e 'fs';
// const fs = require("fs"); //this module has a collection of methods each method has two kinds
// // i.e sync and async so call either e.g readdir() which is async and readdirSync() i.e sync method
// //always use async methods as we have only one thread
// const files = fs.readdirSync("./"); //this method returns the name of all files in the location as an array.
// console.log(files);
// //all async methods take an additional paramter i.e a function which he
// //will call after the operation gets compltes this is often the last parameter.
// const filesAsync = fs.readdir("./", function(error, files) {
//   // this method requires two parameter first is error and second is result
//   //only one of them will have value other will be null so if we have error whilr doing operation
//   //  we will display that otherwise we will have the result so show that.
//   if (error) console.log("Error", error);
//   else console.log("Result", files);
// });

// //using another builtin Module i.e for handling events (events are used to signal that some thing happend)
// const EventEmitter = require("events"); //this returns EventEmitter class which is the core class having various properties and methods
// const eventEmitter = new EventEmitter(); //now create object of this EventEmitter class we get above.
// //now we can access its methods mostly we used these two
// //to raise an event
// //first register a listener or create event first parameter is name of event and second is the method that will be called when event is raised
// eventEmitter.on("nameOfEvent", eventArgs => {
//   //we used here arrow method
//   //all parameters passed are recied in eventArgs it can be any name
//   console.log("event raised", eventArgs);
// });
// // then raise event we also passed some parameters/arguemts to event emit() raise an event
// eventEmitter.emit("nameOfEvent", { id: 1, url: "http://ddf.sd" }); //will raise event whose name is passed as parameter

// //in real wrold app we use our created EvtentEmitter class so has addtional method of our own
// const Logger = require("./logger3"); //will return Logger class as it was exported
// const logger = new Logger();
// //first register a listener or create event here and raised the event there in log() of Logger class
// logger.on("LoggerEvent", eventArgs => {
//   //when ever "LoggerEvent" is raised by logger class this method will be called all parameters passed by it are recied in eventArgs
//   //this pretty much looks like on("Click",doTHis{}) as in Javascript
//   //"LoggerEvent" is the name of the event that is called from Logger class with parameters it may need "param" in body like in onClick what we get in "event" parameter
//   //we used here arrow method

//   console.log("Logger event raised", eventArgs);
// });
// //now we called the log() so additional event will also be raised
// logger.log("raise the event ");

// //using another builtin Module i.e HTTP module for creating networking applications e.g
// // create webserver that listens to request on a specific port or create a backend for applications like react
// const http = require("http"); //this returns EventEmitter class which is the core class having various properties and methods
// //using this we create webServer additionally this createServer returns a EventEmitter so it has
// //all functionalities like emit(),on()
// const server = http.createServer();

// //first register a listener or create event named "connection" here and this will be raised or called
// //automatically when a new person is connected to our port 3000 so in this case a msg will be logged on console
// //when user opens our link i.e localhost:3000 in browser the msg "New Connection..." will be logged in console.
// server.on("connection", socket => {
//   console.log("New Connection...");
// });

// server.listen(3000);
// console.log("listening on port 3000...");

// const http = require("http");
// //using a callback function passed as parameter to the createServer() this method will be used to
// //create routes i.e on which route/request which response is generated
// const server = http.createServer((req, res) => {
//   //the method requires two parameters all request to server or port 3000 will be in 'req' and
//   //according to this a reponse is generated
//   if (req.url === "/") {
//     //to write something in browser
//     res.write("Welcome to home Page");
//     res.end();
//   }
//   if (req.url === "/courses") {
//     //to display a list
//     res.write(JSON.stringify([1, 2, 3]));
//     res.end();
//   }
// });

// server.listen(3000);
// console.log("listening on port 3000...");

// //in real world we don,t use this http module for creating backend service/api because as
// //we add here more code and routes this implemention becomes difficult so instead of this we use
// //a framework called Express which gives clean structure for handling routes also Express framework
// //is built on top of HTTP module
