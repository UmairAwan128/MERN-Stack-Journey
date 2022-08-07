//firs see index.1.js
//Using (1). Callbacks (which allows us to get data from methods while we are executing all over code)
//so we just call the method and move to next task then once this method executes generates result
//it returns that back using callBack(). so

console.log("Before"); //1.this line will be execusted

//now we are calling this method and passing an additional parameter which is a callback function so
//we can call that method anytime from inside the "getUser()" so we use this method to return
//data of the user from the getUser() so there we call the method right after getting User and pass the result/user as parameter
//back here, so now in simple words this second parameter/method will be called once "user" data
//is get from the server automatically and this will print the user so now we are getting data from server.
// getUser(1, user => {
//   console.log("User", user);
//   //inside this we are again calling another async method to get list of repos user has
//   getRepositories(user.githubUserName, repositories => {
//     console.log("Repositories", repositories);
//   });
// });

//callback() methods/annonymous method we created above which execute right after the request completes
//is poluting the code so we created a method like them for each having the body/code required and passed
//that method reference as second parameter so now those will be our callBack() now our code is cleaner.
getUser(1, GetRepositoriesByUser);

function GetRepositoriesByUser(user) {
  console.log("User", user);
  //inside this we are again calling another async method to get list of repos user has and passed
  //it userName and callBack() i.e displayRepositories() ref that it will call once this request gets completes
  getRepositories(user.githubUserName, displayRepositories);
}

function displayRepositories(repositories) {
  console.log("Repositories", repositories);
  getCommits("repo", displayCommits);
}

function displayCommits(commits) {
  console.log("Commits", commits);
}

console.log("After"); //3.then this line will be execusted
//output is "Before", "After" then "Reading Data from DataBase..." will be printed

//now this method is recieving a second parameter which is a callback function so
//we can call this inside our method anytime we want but we can use this also to return
//data to the caller or call this callback() and pass the result as parameter so we did
//this right after we get data from server.
function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading Data from DataBase...");
    callback({ id: id, githubUserName: "Umair" });
  }, 2000);
}

function getRepositories(username, callback) {
  setTimeout(() => {
    console.log(`Getting List of Repositories of user: ${username}...`);
    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
}

function getCommits(repo, callback) {
  setTimeout(() => {
    console.log(`Calling GitHub to get specific Repo Commits...`);
    callback(["Commit1", "Commit2", "Commit3"]);
  }, 2000);
}

// //the same code can also be written in synchronous form as
// console.log("Before");
// const user = getUser(1);
// const repos = getRepositories(user.githubUserName);
// console.log("After");
