//for details see genreService.js
import myhttp from "./httpService";
import { apiUrl } from "../myConfig.json";

const apiEndPoint = apiUrl + "/users";
export function register(user) {
  //returning user object saved in form of promise containing all fields except password
  // so use await where we call this server to get object type inspite of promise.
  return myhttp.post(apiEndPoint, {
    email: user.username,
    password: user.password,
    name: user.name
  });
}
