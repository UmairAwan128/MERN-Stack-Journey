//for details see genreService.js....
//this is single module having implementation of authentication anything about authentication
//should be here.
import myhttp from "./httpService";
import { apiUrl } from "../myConfig.json";
//first  npm i jwt-decode@2.2.0
import jwtDecode from "jwt-decode";

//this file or url is used for authenticating a user this service will be used for like logining/logout
const apiEndPoint = apiUrl + "/auth";
const tokkenKey = "token";
//when user login it will pass email,pass and in response this api return a jsonWebTokken which will
//be saved by user/browser then in all its next requests this tokken will be passed to server this is
//used to uniquely identfy user and keeping away invalid users.
export async function login(email, password) {
  //if user provide valid email password combination then we get a jsonWebTokken(jwt) which we get here
  // and store it the the "lecalStorage" object which is some space reserved or small DB for browser so its
  //built in we access it as localStorage.setItem(key,value).
  //this object can be accessd from brwoser as inspectElement->Storage->localStorage-> "select localhost:3000" now you will see tokken
  const { data: jwt } = await myhttp.post(apiEndPoint, { email, password });
  return localStorage.setItem(tokkenKey, jwt);
}

//gets token and set to localStorage
export async function loginWithJwt(jwt) {
  return localStorage.setItem(tokkenKey, jwt);
}

export function logout() {
  //deletes tokken from localStorage so user gets logout
  localStorage.removeItem(tokkenKey);
}

export function getJwt() {
  //deletes tokken from localStorage so user gets logout
  return localStorage.getItem(tokkenKey);
}
//we wanted to show currently loggedin userName to the Navbar so we get user set in state and passed to Navbar component
//we used here jwt for details about jwt see react notebook copy. and we added this token to localstorage in login/registerForm.jsx
//to decode jwt use jwt.io    select "Debugger"   and paster you token to decode it
//token is divided into three parts
//"header", "payload" contains properties of object like in this case name,id,email so we can get these
//"signature" generated on the basis of header and payload value and a secrete key only available on server.
//so without that noone either hacker cammot change the jwt token.
export function getCurrentUser() {
  //the tokken value is stored in "lecalStorage" object which is some space reserved or small DB for browser so its
  //built in we setted it as key value pair as    localStorage.setItem(key,value).
  //this object can be accessd from brwoser as inspectElement->Storage->localStorage-> "select localhost:3000" now you will see tokken
  //as the tokken is save so the user is like now loggedin.
  //we can also get this tokken value as
  try {
    const jwt = localStorage.getItem(tokkenKey);
    //now to decode this token and get properties like user name first  npm i jwt-decode@2.2.0   then
    return jwtDecode(jwt);
    //console.log(currentUser);
    //we wrapped all our code inside try catch as if there is no jwt or user is not logged in or invalide jwt passed
    // then app crashes so all code in try block so return decoded form of token if found otherwise catch exception
    // and return null so no user loggedIn.
  } catch (ex) {
    return null;
  }
}

//from here we are setting token for the httpService.js to avoid Bi-Directional dependency for details see httpService.js
myhttp.setJwt(getJwt());

//default exports are those which will be accessible by the object of this service i.e
//import auth from "../services/authService";   // created obj of this service
// auth.logout(); // now we can access logout(),login()... methods only as default exports
export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt
};
