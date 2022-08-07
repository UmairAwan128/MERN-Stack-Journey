//first see AppOld.js for comment and also there we did not used our httpService file but code all code is in that file so that simple
import React, { Component } from "react";
import "./App.css";
import myhttpService from "./services/httpService";
import myConfig from "./myConfig.json";
//for displaying msg in Toast first
//npm i react-toastify@4.1
//then imort library and also css
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//moved myConfig.apiEndPoint or url of API moved to myConfig.json so that it will be in one place
//so changing only url there in file will change the value in all places in application.

class App extends Component {
  state = {
    posts: []
  };

  //the right place to do httprequest or get data from/to server.
  async componentDidMount() {
    //moved apiEndPoint or url of API to myConfig.json so that it will be in one place
    //so changing only url there in file will change the value in all places in application.
    //now used apiEndPoint as myConfig.apiEndPoint
    const { data: posts } = await myhttpService.get(myConfig.apiEndPoint);

    this.setState({ posts });
  }

  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    //link to the api is in a variable "myConfig.apiEndPoint" for ease
    //as it is post request so the obj saved in database only that will be returned which we logged
    const { data: post } = await myhttpService.post(myConfig.apiEndPoint, obj);
    console.log(post);
    //now we added this new post at the start of all the posts array
    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async post => {
    post.title = "Updated";
    //put to update all properties of object (so we pass the whole object so all properties will be updated)
    const { data } = await myhttpService.put(
      myConfig.apiEndPoint + "/" + post.id,
      post
    );
    //patch to update one or more properties of an object (we send only those properties we want to update)
    //myhttpService.patch(myConfig.apiEndPoint + "/" + post.id, { title: post.title });
    console.log("updated post returned : ", data);

    const posts = [...this.state.posts];
    const index = posts.indexOf(data);
    posts[index] = { ...data };
    this.setState({ posts });
  };

  handleDelete = async post => {
    const orignalPosts = this.state.posts; //create a backup of old state value or posts
    const posts = this.state.posts.filter(p => p.id !== post.id); //update state
    this.setState({ posts });
    try {
      //await myhttpService.delete(myConfig.apiEndPoint + "/" + post.id); //unexpected error here its invalid url
      //await myhttpService.delete(myConfig.apiEndPoint + "?id=999"); //created an expected 404 error
      await myhttpService.delete("s" + myConfig.apiEndPoint + "/" + post.id); //unexpected error here its invalid url
      //throw new Error("");
    } catch (ex) {
      console.log("Hanled delete catch block");
      //in our case we handled only on expected error 404
      if (ex.response && ex.response.status === 404) {
        //if invalid post id found the this will be shown
        alert("The post has already been deleted");
      }

      //otherwise error is unexpected so log and display msg

      //set the state to old state values that were before deletion.
      this.setState({ posts: orignalPosts });
    }
  };

  render() {
    return (
      <React.Fragment>
        {/* in this the msg for the toast will be show what we will pass from calling the toast() we
        called the method in httpService.js */}
        <ToastContainer />
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
