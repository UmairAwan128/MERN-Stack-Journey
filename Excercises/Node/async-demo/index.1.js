//we are here checkingOut the async execution in Node remember Node has only one thread that does everything
//Async here doesnot mean multi threaded environment
console.log("Before"); //1.this line will be execusted
const user = getUser();
console.log(user); //this will return undefined as we know in getUser() we use setTimeout()
//that will this will schedule a call to that method after 2 sec from now in future so just schedules thread don,t wait here but moves
//to next line to execute other line so in "user" we have nothing so undefined print and then "After" prints
//and then "Reading Data from DataBase..." then used object will be returned which is too late. so
//solution is use either of the following
//1.Callbacks, 2.Promises, 3.Async/await

console.log("After"); //3.then this line will be execusted
//output is "Before", "After" then "Reading Data from DataBase..." will be printed

function getUser(id) {
  setTimeout(() => {
    //2.this setTimeout() is an Async Function this will schedule a call to this right
    //after 2 sec from now in future so just schedules thread don,t wait here but moves
    //to next line to execute it so "After" will be printed first then Reading Data from DataBase... will be printed
    console.log("Reading Data from DataBase...");
    return { id: id, gitHubUserName: "umair" };
  }, 2000);
}
