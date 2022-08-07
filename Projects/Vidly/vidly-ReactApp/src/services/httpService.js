//This code for making call to server to get /set/post data we moved all code now its reusable and if we
//want to modify this will be the only place another benifit is if in future if we want another
//library say jquery or anyother expect the axios for calling the api/server to get data we can
//easily change that here only this place.

//installed both as    npm i axios@0.18.0
//npm install react-toastify@4.1.0
import axios from "axios";
import { toast } from "react-toastify";

//we moved code for using sentry to myLogginService.js and called here
//a method for reusability and in future if we want to use some other library we can easily change
// that i.e only one place we will be changing it.
import myLoggingService from "./myLoggingService";

//in all request we must pass tokken of the current user in header so our request gets entertained
//as server or vidly-api-node project requires tokken of the user with any request
//so to set/send tokken in all our http requests to server we added this line here as we know all requests will go from this file so
//    axios.defaults.headers.common["x-auth-token"] = auth.getJwt();  //not used bi-direcional dependency see below
//so if user is not loggedin he will not be able to do any request  get/set/put/del
//for passing only in spcific request type e.g post
//axios.defaults.headers.post["x-auth-token"];
//we did not used this way becuase it was creating bi-direcional dependency detail are below
//so we used
//Bi-Directional dependency: two modules depending on each other or in this case both "httpService"
//and "authService" are "importing" each other or using each other methods which is very dangerous thing
//we need to remove dependency from one side so one will be depending on other, we can decide
//from which one we will remove dependency we can decide this by checking which module is core module
//so in this case "httpService" is the core module as this makes connection to backend if
//we cannot make connection to backend authentication or "authService" does not make sense
//so remove any dependeny of authService in this file i.e here we have only one i.e getJwt()
//but how we will get jwt here without importing "authService". We can do this by reversing
//this process that instead "httpService" get the jwt from "authService", "authService" will
//tell "httpService" that this is myTokken. we can do this by creating here a setTokken() that
// requires a token/paramater and this method will be called from the authService to set the Token value
// here in "httpService" and this passes this token to header of each request automatically.
function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    console.log("logging Error : ", error);
    //inspite of using console.log() to show error to user and think that the user will report  u the error then
    //you will fix the error use as we know once we deploy our app we will not be able to see error as they will be shown on
    //the user browser console who is using the webApp so solution is we need to log these error somewhere we can access them
    //so use "loggingServiceProvider" we used here "SENTRY" website //we moved code for using sentry to myLogginService.js and called here
    //its log method so in future if we want to use some other library we can wasily change
    // that i.e only one place we will be changing it.
    myLoggingService.log(error);

    //alert("Something went wrong while deleting the post! ");
    //inspite of using alert() use toast first is which is a generic toast which is method as we know in JS methods are also object so we called .error() on it and soon below
    //toast("Something went wrong while deleting the post! ");
    //which is a specific toast for error showing with red color
    toast.error("Something went wrong while deleting the post! "); //msg will be passed to <ToastContainer /> of App.js in render()
    //we also have toast.success() ,info() e.t.c
  }
  //so error is expected so pass to the place where it called from or catch block
  return Promise.reject(error);
});

//to make successful delete request we need to pass two things to server as our backend api requires
//first is user should be authenticated i.e pass the token that we passed in header above
//and second is the user should be admin or should have a property "isAdmin:true" in its object or user object
//so one simple way is in MongoDBCompass directly add this "isAdmin:true" property in user object you want
// also assign it type boolean and make that user admin and now login the user you made admin if already login then re-login him.so you can delete movie
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};
