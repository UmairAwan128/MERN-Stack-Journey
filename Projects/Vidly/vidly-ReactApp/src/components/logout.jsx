import React, { Component } from "react";
import auth from "../services/authService";
class Logout extends Component {
  //this component returns or renders nothing just deletes tokken and redirect to home page
  // with reload the page
  componentDidMount() {
    auth.logout(); //logout functionality is in method its reusable and we can also change implementation whnever we want
    window.location = "/";
  }
  render() {
    return null;
  }
}

export default Logout;
