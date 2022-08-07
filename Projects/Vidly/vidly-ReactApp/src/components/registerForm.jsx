// first see the login form
import React from "react";
//first       npm i joi-browser@13.4
import Joi from "joi-browser";
import Form from "./common/form";
//import { register } from "../services/userService"; //to get only register() from userService.js
//to get all objects/methods from userService.js or create obj of that service named "userService"
import * as userService from "../services/userService";
import auth from "../services/authService";

//we created a new class "form" which has all the reuseable code no render method, code which was
//previously in this file now its in form.jsx and now this loginForm extends Form
class RegisterForm extends Form {
  //extends Form anf Form extends component
  state = {
    data: { username: "", password: "", name: "" },
    errors: {}
  };
  //scheema is unique for every form
  scheema = {
    username: Joi.string()
      .required()
      .email()
      .label("UserName"),
    password: Joi.string()
      .min(5)
      .required()
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name")
  };

  doSubmit = async () => {
    //call the server save data
    try {
      //await userService.register(this.state.data);
      //we want that when user signsup we automatically login him we can do this as so when
      // user provide valid info then registration success and in header object inside the response of request we get a
      // coustom i.e our own created header named 'x-auth-token' this has a value of jsonWebTokken(jwt)
      //specific for the user who just signedup now we can use this to make the user logIn automatically
      //so we store this tokken value to the "lecalStorage" object which is some space reserved or small DB for browser so its
      //built in we access it as localStorage.setItem(key,value).
      //this object can be accessd from brwoser as inspectElement->Storage->localStorage-> "select localhost:3000" now you will see tokken
      //as the tokken is save so the user is like now loggedin.
      //we can also get this tokken from server directly in data of response inspite in header but
      //we just did this to get know about httpCoustomHeaders.
      const response = await userService.register(this.state.data);
      //for details about jwt see react notebook copy.
      //to decode jwt use jwt.io    select "Debugger"   and paster you token to decode it
      //token is divided into three parts
      //"header", "payload" contains properties of object like in this case name,id,email
      //"signature" generated on the basis of header and payload value and a secrete key only available on server.
      //so without that noone either hacker cammot change the jwt token.
      console.log(response);
      //in broswer console or when using API in REACT app we cannot see httpCoustomHeaders as there is a restriction so see them we
      //added a line or additional header in api project i.e in vidly-api-node so this header will
      //be accessible here so we added standard header so our coustomHeader gets accessible i.e
      // .header("access-control-expose-headers", "x-auth-token") there in routes/users.js on line 28 add this
      //  localStorage.setItem("token", response.headers["x-auth-token"]);  //moved line to loginWithJwt() in authService.js
      auth.loginWithJwt(response.headers["x-auth-token"]); //called here that method
      //redirect to home page and old data is shown
      //this.props.history.push("/");
      //as when we register user gets login and we wanted that the name of user is shown on navbar so we get the user object
      //in the componentDidMount() of App.js and assigned it to state but we know that componentDidMount()
      //works on the start of the application not after that even state changes so by push() method when user loggsin
      //he is redierected to home but his name will not be shown until he reloads the page so
      window.location = "/"; //go to homepage and reload it
      //so home page reload so componentDidMount() of App.js works and App.js state changes and name gets show on navbar
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        //in response if user already exist we get msg "user alreay exsist" so we set it in "username" error label
        errors.username = ex.response.data;
        this.setState({ errors: errors });
      }
    }
  };

  render() {
    return (
      <div className="content">
        <h1>Register Form</h1>
        <form onSubmit={this.handleSubmit}>
          {/*as some code we were passing to input compoent was also 
          duplicating so we created its method in form.jsx and called here  */}
          {this.renderInput("username", "Username")}
          {/* last parameter is type which is optional */}
          {this.renderInput("password", "Password", "password")}

          {this.renderInput("name", "Name")}
          {/* //every form will have submit button label migth change so 
          moved in method of form.jsx and called method here */}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
