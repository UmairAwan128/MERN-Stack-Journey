// //first see index2.js
// //Using (2). Promises (an object holds eventual result of an async operation so when
// //an asyn operation completes it can either result in value or an error so we will get result)
// //Promise can be in three states
// //1. pending  (when we create a promise its in pending state)
// // then this promise kicksoff an async operation when its result is ready the promise can be in
// //2. fullfilled state (if the async operation completes successfully)
// //3. rejected state (if something went wrong during this promise will be in rejected state and we get error)

// //creating promise object its constructor requires a method requiring two parameters which are again functions
// //resolve (we use this to return result of the async request to the consumer/caller of this "promise" object)
// //reject  (we use this to return error if any generated during the async request to the consumer/caller of this "promise" object)
// const promise = new Promise((resolve, reject) => {
//   //created so state is pending
//   //do any async work
//   //
//   setTimeout(() => {
//     //depending on logic return result or error not both
//     resolve(1); //returning the result so state is now in "fullfilled/resolved"
//     reject(new Error("some thing went wrong")); //returning the error so state is now in "rejected"
//   }, 2000);
// });

// //using the promise object we created it has two methods
// //"then()"   executes if request gets successfull or we get data/response
// //"catch()"  executes if something went wrong only one will execute not both
// promise
//   .then(result => console.log("Result", result))
//   .catch(err => console.log("Error", err.message));

//doing same example as we do for Callback in index2.js

console.log("Before"); //1.this line will be execusted
// const promise = getUser(1); //as we know getUser() will return a Promise we we stored it
// promise.then(user => {
//   //and called then() on it
//   console.log(user);
// });
//but we want to pass this user object to getRepositories() which returns list of repositories by this user
// getUser(1).then(user => {
//   //or directly call then() on the getUser() on as it returns a promise
//   getRepositories(user);
// });
//getRepositories() will again return a promise/list of Repos so to get them we called again then() on this
//and also soon on for any next
getUser(1)
  .then(user => getRepositories(user.githubUserName))
  .then(repos => getCommits(repos))
  .then(commits => console.log("Commits", commits))
  .catch(error => console.log("Error", error));
//we have single catch() at end that will handle any error for all the async operations we did
console.log("After"); //3.then this line will be execusted

//we modified our method to return Promise and removed the callback parameter
function getUser(id) {
  return new Promise((resolve, reject) => {
    //setTimeOut is a asyn method
    setTimeout(() => {
      console.log("Reading Data from DataBase...");
      resolve({ id: id, githubUserName: "Umair" });
    }, 2000);
  });
}
function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Getting List of Repositories of user: ${username}...`);
      resolve(["repo1", "repo2", "repo3"]);
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Calling GitHub to get specific Repo...`);
      resolve(["Commit"]);
    }, 2000);
  });
}
