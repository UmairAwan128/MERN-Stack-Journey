// //first see index4.js contains promise
//  async and await
console.log("Before"); //1.this line will be execusted

// //using promise we wrote or handle async operations as this details in index3 and index4.js
// //we can do same thing using await keyword as we did below which is new way to write this
// //code and on run time that code is like converted to this code so we wrote that code below
// getUser(1)
//   .then(user => getRepositories(user.githubUserName))
//   .then(repos => getCommits(repos))
//   .then(commits => console.log("Commits", commits))
//   .catch(error => console.log("Error", error));
// //we have single catch() at end that will handle any error for all the async operations we did

displayCommits();

console.log("After"); //3.then this line will be execusted
//use await inside a funciton function should have keyword async

async function displayCommits() {
  try {
    //using await we wrote same code as
    const user = await getUser(1);
    const repos = await getRepositories(user.githubUserName);
    const commits = await getCommits(repos[0]);
    console.log(commits);
    //execution of this code is like the code above using then() for promises "await"
    // does not mean wait but it means that we have called the function in future this function
    //will return its result so comback see result in "user" const in future u will get response.
    //so every method will be started one by one by single thread and response of each will be generated in future
    //so code runs asynchronously and looks synchronous code.
  } catch (err) {
    //for catching errors as we used in Promise/Then() apprach here we use try/catch() for this
    console.log(err); //any error or rejected promise will be catched here to chow error
  }
  //this async/await method/approach is created on top on Promise/then() method we used above so its
  //same as that in working but way of writting code os simple.
}

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
      //resolve(["repo1", "repo2", "repo3"]);
      reject(new Error("Error occured while getting repos"));
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Calling GitHub to get specific Repo...`);
      resolve(["Commit1", "commit2"]);
    }, 2000);
  });
}
