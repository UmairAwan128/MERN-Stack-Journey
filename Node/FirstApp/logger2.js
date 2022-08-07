//first see logger.js
var url = "http://___________.com";

function log(message) {
  console.log(message);
}

//as we these objects/methods are bydefault private so to access them in other modules
//we export them or other words as we know every module/file has "module" object which
//has a property export we add method in this which we want to access outside this file.
//module.exports.log = log;
//or if we want to export a single thing better will be assign it dirctly to exports inpite of
//assigning it by creating an object so now export of this module is function not object. see app.js how we use it
module.exports = log;
//we cannot directly use export to assign log() as it will be error i.e
//exports = log.  will not work as reference gets changed see logger.js top for details
