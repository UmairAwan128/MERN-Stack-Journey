//for details see genreService.js....

//myhttp is like a name that we decided to get access to httpService file objects.
import myhttp from "./httpService";
// double dots means myCOnfig file out of this folder i.e in src folder
//import myConfig from "../myConfig.json"; //contains apiUrl
//import here is like create an object of myConfig.json file so we can access all its objects
//also we can use here object destructuring as
import { apiUrl } from "../myConfig.json";

const apiEndPoint = apiUrl + "/movies";

function movieUrl(id) {
  return `${apiEndPoint}/${id}`;
}

export function getMovies() {
  return myhttp.get(apiEndPoint);
}

export function deleteMovie(id) {
  //return myhttp.delete(apiEndPoint + "/" + id);  or
  return myhttp.delete(movieUrl(id));
}

export function getMovie(id) {
  return myhttp.get(apiEndPoint + "/" + id);
}

//this is for save new movies or update old movie
export function saveMovie(movie) {
  if (movie._id) {
    //if movie object has id already so we will be updating old movie
    const body = { ...movie };
    console.log("before :" + { ...body });
    delete body._id;
    console.log("after :" + { ...body });
    return myhttp.put(movieUrl(movie._id), body);
  }
  //else create a post coll to save then return from the method
  return myhttp.post(apiEndPoint, movie);
}
