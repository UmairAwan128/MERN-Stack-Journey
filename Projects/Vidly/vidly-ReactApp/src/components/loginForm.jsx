//first see the old files of form also comments are there
import React from "react";
//first       npm i joi-browser@13.4
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
import { Redirect } from "react-router-dom";
//we created a new class "form" which has all the reuseable code no render method, code which was
//previously in this file now its in form.jsx and now this loginForm extends Form
class LoginForm extends Form {
  //extends Form anf Form extends component
  state = {
    data: { username: "", password: "" },
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
      .label("Password")
  };

  doSubmit = async () => {
    //call the server to login
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);

      // if user is not authenticated/loggedIn and tries to open create/edit page
      //we redirect him to the login page and once he logsin we redirect him to home page
      //which was pre implementation but we want that once user gets loggedIn he will be redirected to the page from where
      //he came from to the login page so we know props which is passed by reactRouter to each component
      //has a object location which has a property pathName which contains the address of the
      //page before we redirect to loginPage i.e what we require so we will be passing this address
      //in specific casses like user is not authenticated/loggedIn and tries to open create/edit page
      //so we know we have created a seperated component protectedRoute.jsx which redirects to login Page
      // so there we passed "state" property along with path to redirect."state" property is for passing any additional data.
      //so in this we passed props.location i.e address of that page in property named "from"
      //and we know object location has a property pathName having which we accessd here.
      const { state } = this.props.location;
      //if state is passed or has a value the redirect to path passed otherwise redirect to home
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        //in response if user provide invalid email password combination then we get error msg which we get here and set to state
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    // if the user is already loggedIn and tries to open the login page redirect him to home page
    if (auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <div>
        <h1>Login Form</h1>
        <form onSubmit={this.handleSubmit}>
          {/*as some code we were passing to input compoent was also 
          duplicating so we created its method in form.jsx and called here  */}
          {this.renderInput("username", "Username")}
          {/* last parameter is type which is optional */}
          {this.renderInput("password", "Password", "password")}
          {/* //every form will have submit button label migth change so 
          moved in method of form.jsx and called method here */}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
