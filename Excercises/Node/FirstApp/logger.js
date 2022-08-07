//first see app.js
//Module Warpper Funcion:
//Node doesnot executes our module/code directly but for execution it wraps the code inside
//this funtion as we can see this function has "exports","require","module" which we use inside the module
//(function(exports,require,module,__filename,__dirname)){ -----}
//we can access exports property directly also so below we did
console.log(__filename);
console.log(__dirname);
var url = "http://___________.com";

function log(message) {
  console.log(message);
}

//as we know these objects/methods are bydefault private so to access them in other modules
//we export them or make them public technically its done as every module/file has "module" object which
//has a property export we add method in this which we want to access outside this file.
module.exports.log = log;

//or diectly use export see top of file for details
//exports.log = log;
