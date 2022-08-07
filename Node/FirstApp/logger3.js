//first see logger2.js
//get EventEmitter class here
const EventEmitter = require("events");
//we wanted to raise an event on the call of log()
//so creating our own EventEmitter which has both our code and default code
var url = "http://___________.com";
class Logger extends EventEmitter {
  log(message) {
    console.log(message);
    //Raise event we used 'this' not the EventEmitter object now where we create object of this class
    //we will first register event there then call this method so this will perform its operation then raise that event created
    this.emit("LoggerEvent", { id: 1, url: "http://ddf.sd" }); //will raise event whose name is "LoggerEvent" and is created by
    //whoever calls log() so if he cretes event whose name is "LoggerEvent" and calls log() which will raise this event if exist
  }
}
module.exports = Logger;
