//for details see vidly-HttpApp  Project....

//myhttp is like a name that we decided to get access to httpService file objects.
import myhttp from "./httpService";
// double dots means myCOnfig file out of this folder i.e in src folder
//import myConfig from "../myConfig.json"; //contains apiUrl
//import here is like create an object of myConfig.json file so we can access all its objects
//also we can use here object destructuring as
import { apiUrl } from "../myConfig.json";

// const promise = axios.get("https://jsonplaceholder.typicode.com/posts");
// //axio.get(--------)  returns a object of type "promise" it has two properties "promiseStatus" and "promiseValue"
// // both are internal so we cannot use them here using dotNotation.
// //"promiseValue" contains data(json response),header(httpHeader), request(tells about our request) and status code.
// //"promiseStatus" gives two values "resolve" means successful request and "rejected" means failed.
// console.log(promise);

// //we used await as in browser we were getting page pause or loading slow so this makes async and now data
// //gets load when request compltes.
// //note here we direcly used "response" not the "promise" so data will be in "object" type not "Promise" type
// // and we will not get properties like "promiseStatus" and "promiseValue" here.
// const response = await axios.get(
//   "https://jsonplaceholder.typicode.com/posts"
// );
// console.log(response);

//in one line we did all
//direclty get the data from the response
//stored the link in a variable "apiEndPoint" for ease
//const { data: posts } = await axios.get(apiEndPoint);
export function getGenres() {
  //returning a promise so where we call this method use await keyword to get object inspite of promise
  //return myhttp.get(myConfig.apiUrl + "/genres");
  return myhttp.get(apiUrl + "/genres");
}
export function getGenre(id) {
  return null;
}
