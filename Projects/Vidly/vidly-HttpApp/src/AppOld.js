//we used jsonplaceholder(fake online rest api) we send here request for data
//Rest (representation state transfer)
//React(has nothing to send http request to server so we can use our preffereed library) e.g jqueryAjax,Axio.FetchAPI e.t.c
//we used Axios  npm i axios@0.18
import React, { Component } from "react";
import "./App.css";
//npm i axios@0.18
import axios from "axios";
//we can intercept both our requests before going out or intercept response from the request
//use() takes two methods as parameters first method will be called if response is success and second if
//the response generates an error. we don,t wanted to do anything on success so first parameter is null
//so now whenever there is an error in response for any of the request "await.axios.get/post/Del/Put(...)"
// this method will be called first then the control will be
//passed to our catch() block of the caller or right after the line "await.axios.get/post/Del/Put(...)"
axios.interceptors.response.use(null, error => {
  //UnExpected Errors (server side/Code errors) (e.g Internet off , server down, DB down, bug in our code)
  // we should log such errors in console so programmer or we can resolve it
  // and display a generic friendly msg for the user
  //so if the error is unexpected i.e error code is not from 400-499 handle that here and display msg otherwise if expeceted error then pass that
  //error back to where it was called or from which method request comes from and as msg will be unique so that method will show msg .
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    console.log("logging Error : ", error);
    alert("Something went wrong while deleting the post! ");
  }
  //so error is expected so pass to the place where it called from or catch block
  return Promise.reject(error);
});

const apiEndPoint = "https://jsonplaceholder.typicode.com/posts";

class App extends Component {
  state = {
    posts: []
  };

  //the right place to do httprequest or get data from/to server.
  async componentDidMount() {
    // const promise = axios.get("https://jsonplaceholder.typicode.com/posts");
    // //axio.get()  returns a object of type "promise" it has two properties "promiseStatus" and "promiseValue"
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
    const { data: posts } = await axios.get(apiEndPoint);
    //below line will cause unexpectedError so as we now before any request interceptor mthod is called so this time
    //that method will will display a msg as unexpectedError occured or invalid url to api.
    //const { data: posts } = await axios.get("s" + apiEndPoint);

    //we did not used here try catch as there may not be any expected errors here so code for requesting API is not in tryCatch
    //as we used try cath in handleDelete() as there we want to handle 404 and revert back the state also
    //set the data in the state
    this.setState({ posts });
  }

  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    //link to the api is in a variable "apiEndPoint" for ease
    //as it is post request so the obj saved in database only that will be returned which we logged
    const { data: post } = await axios.post(apiEndPoint, obj);
    //in browser in netwok tab this request type will not be "post" but it will be "options" because the backend is on seperate domain
    //and front end is on seperate so the request method here is "options".
    //in InspectElement -> Networks then select this request then select "Headers" -> "RequestPayload"
    // which contains the data we sent to the server.
    // in "Response" tab we see the response we get from the server
    console.log(post);
    //now we added this new post at the start of all the posts array
    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async post => {
    post.title = "Updated";
    //put to update all properties of object (so we pass the whole object so all properties will be updated)
    const { data } = await axios.put(apiEndPoint + "/" + post.id, post);
    //patch to update one or more properties of an object (we send only those properties we want to update)
    //axios.patch(apiEndPoint + "/" + post.id, { title: post.title });
    console.log("updated post returned : ", data);

    const posts = [...this.state.posts];
    const index = posts.indexOf(data);
    posts[index] = { ...data };
    this.setState({ posts });
  };

  //deletion/updation can be done in two ways
  //1. premistic (in which we first call the server if its a success then we update the state the problem here is it is slow)
  // handleDelete = async post => {
  //   await axios.delete(apiEndPoint + "/" + post.id);

  //   const posts = this.state.posts.filter(p => p.id !== post.id);
  //   this.setState({ posts });

  //   console.log("Deleted : ", post);
  // };
  //   so solution is we let that our call to server will always be a success so set the state first then call the server.
  //2. optimistic (in which we first update the state then we call the server if request fails then we set the state to its old value. this is very fast)
  handleDelete = async post => {
    const orignalPosts = this.state.posts; //create a backup of old state value or posts
    const posts = this.state.posts.filter(p => p.id !== post.id); //update state
    this.setState({ posts });
    try {
      await axios.delete(apiEndPoint + "/" + post.id);
      //await axios.delete(apiEndPoint + "?id=999"); //created an expected 404 error
      //await axios.delete("s" + apiEndPoint + "/" + post.id); //unexpected error here its invalid url
      //throw new Error("");
    } catch (ex) {
      //request to server for deletion failed or error occured
      //these errors can be of two types.
      //Expected Errors(Client Mistakes) e.g 404 not found(deleting record that is not in DB) , 400 bad request(invalid values in form)
      // so for these we should display a specific msg to client so he understand and resolve error.
      //UnExpected Errors (server side/Code errors) (e.g Internet off , server down, DB down, bug in our code)
      // we should log such errors in console so programmer or we can resolve it
      // and display a generic friendly msg for the user
      console.log("Hanled delete catch block");
      //in our case we handled only on expected error 404
      if (ex.response && ex.response.status === 404) {
        //if invalid post id found the this will be shown
        alert("The post has already been deleted");
      }

      //otherwise error is unexpected so log and display msg
      //else {
      //but this error msg will be same for all requests e.g in get/post/put in any of these if unexpected error
      // occur e.g server gets down or internet off so we will be duplicating this code in all methods so solution
      //is use 'Intercepter in axios' in axios each request type get/post or any control first goes to intercepter method
      // then from there it comes to next line from where the server was called i.e await axios.get(___)
      //so moved the code to interceptor method top of the class.
      //}

      //set the state to old state values that were before deletion.
      this.setState({ posts: orignalPosts });
    }
  };

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
