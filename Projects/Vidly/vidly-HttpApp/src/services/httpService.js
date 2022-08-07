//first see AppOld.js for comment about this intercepter method

//we moved all axios or code for making call to server moved here now its reusable and if we
//want to modify this will be the only place another benifit is if in future if we want another
//library say jquery or anyother expect the axios for calling the api/server to get data we can
//easily change that here only this place.
//npm i axios@0.18
import axios from "axios";
//npm i react-toastify@4.1
import { toast } from "react-toastify";

//we moved code for using sentry to myLogginService.js and called here
//a method for reusability and in future if we want to use some other library we can easily change
// that i.e only one place we will be changing it.
import myLoggingService from "./myLoggingService";

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

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
