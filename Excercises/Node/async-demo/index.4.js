// //first see index3.js also contains basics of Promise
// //Using (2.1). Promises (an object holds eventual result of an async operation so when
// //an asyn operation completes it can either result in value or an error so we will get result)
// //Promise can be in three states
// //1. pending  (when we create a promise its in pending state)
// // then this promise kicksoff an async operation when its result is ready the promise can be in
// //2. fullfilled state (if the async operation completes successfully)
// //3. rejected state (if something went wrong during this promise will be in rejected state and we get error)

// //if we want to create a "promise" which is already "resolved" its useful while writting unittest
// //so to create such a promise we do
//   const promise = Promise.resolve({ id: 1 }); //already resolved so never throws error
//   promise.then(result => console.log(result)); //calling the promise

// //if we want to create a "promise" which is already "rejected" so to create such a promise we do
//   const promise = Promise.reject(new Error("Reason for rejection")); //already rejected so always throws error
//   promise.catch(err => console.log(err)); //calling such promise as

//if we want to execute two/more async operations/promises in paralell and once all those
//completes and generate response in this case there will be only one thread that will
//start each promise/async operation inspite of multiple as we know then get all responses then on that do something we want
// so we create two promises below as
const p1 = new Promise(resolve => {
  //setTimeOut is a asyn method
  setTimeout(() => {
    console.log("Async operation 1...");
    resolve("Umair");
  }, 2000);
});

const p2 = new Promise(resolve => {
  //setTimeOut is a asyn method
  setTimeout(() => {
    console.log("Async operation 2...");
    resolve({ id: 2 });
  }, 2000);
});

//only uncomment for promise.all() otherwise this will execute anyway and disturb the output
// const p3 = new Promise((resolve, reject) => {
//   //setTimeOut is a asyn method
//   setTimeout(() => {
//     console.log("Async operation 3...");
//     reject(new Error("Some thing went wrong......"));
//   }, 2000);
// });

//to call/kick all async operations when these completes we will get all operations result in an array as
//used all() that requires an array of all promises/async operations and this will again return an array
//having all the results of all the async operations
//   Promise.all([p1, p2]).then(result => console.log(result));
//if in one of the promise an error occured or gets rejeceted we will get error msg only
//neither response of any of the promise/async operation that was successful/resolved.
//  Promise.all([p1, p2, p3])
//    .then(result => console.log(result))
//    .catch(err => console.log("Error", err.message));

//if we want to do something as soon as any of the operation/promise completes/generates response
//in this case we get response of the operation which first completes all other will be ignored so we use "race()"
Promise.race([p1, p2])
  .then(result => console.log(result))
  .catch(err => console.log("Error", err.message));
