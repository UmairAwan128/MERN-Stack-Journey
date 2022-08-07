import React, { Component } from "react";
import Input from "./common/input";
class LoginForm extends Component {
  //the second way to get data from input fields of form is use state
  //here we connect state props to a input field by an onChange() event so
  //anything entered in the input filed will first stored in state then as state changes
  //so compoent rerenders and the the value of state will be set to respective <input>
  //it is a better way as in this way we can also set value to input fields
  //e.g can be used for update form also i.e get data from server and set value
  //in the state using componentDidMount()
  state = {
    //always initialize state props to empty string which are connected to
    //form input othersise error will be generated if null is assigned or prop is not created
    account: { username: "", password: "" },
    //use errors object inspite of array as its easy to find error by name i.e errors['name']
    //then the array where we use method like find()
    errors: {}
  };

  validate = () => {
    const errors = {};
    // trim() function returns a new string,
    //without any of the leading or the trailing white spaces.
    const { account } = this.state;
    if (account.username.trim() === "")
      errors.username = "username is required";
    if (account.password.trim() === "")
      errors.password = "password is required";
    //return null if "errors" has no value else return error
    //so use Object.keys(errors) to get all the keys of the obejct as array
    //then calculated its length.
    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = event => {
    event.preventDefault();

    //for errors onSubmit of form
    const errors = this.validate();
    console.log(errors);
    //validate() returns null if there are no errors and an obejct cannot
    //have null value but can have empty object {} so in setState assign
    // emptyObj{} if value is null
    this.setState({ errors: errors ? errors : {} }); //same as errors||{}
    if (errors) return; //if errors found then return don,t submit form
    //if errors is null then submit the form
    //call the server save data
    console.log("submitted");
  };

  validateProperty = inputField => {
    if (inputField.name === "username") {
      if (inputField.value.trim() === "") return "username is required";
    }
    if (inputField.name === "password") {
      if (inputField.value.trim() === "") return "password is required";
    }
  };

  //for all inputFields this handles there value change
  handleChange = event => {
    //onChange of value of input we set and remove errors here
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(event.currentTarget);
    if (errorMessage) errors[event.currentTarget.name] = errorMessage;
    else delete errors[event.currentTarget.name]; //if nothing return then delete error
    //property from the state

    const account = { ...this.state.account };
    //first get then name attribute value of the input field as name is same
    //as state props name so access that specific state then get the value of
    // the input filed and update the value
    account[event.currentTarget.name] = event.currentTarget.value;

    // or ObjDestructuring
    //  handleChange = ({ currentTarget: input }) => {
    // then      account[input.name] = input.value;
    this.setState({ account: account, errors: errors });
  };

  render() {
    const { account, errors } = this.state;
    return (
      <div className="content">
        <h1>Login Form</h1>
        {/* by default as we know when we click submit button of form
        page reload so all data/app i.e jsx is completely reloaded so to
        prevent this we have onSubmit */}
        <form onSubmit={this.handleSubmit}>
          {/* controlled element as get value from state and notify any
    change via raising an event 
    so when we enter any thing event onChange Will raise and that will
    update the state username value and then as state changed so component
    rerenders then the value will be placed in the 'value' of the input so we
    see what we typed   so value entered is assigned first to state and then 
    state assign the value to the input field    */}

          <Input
            name="username"
            value={account.username}
            label="UserName"
            onChange={this.handleChange}
            error={errors.username}
          />

          <Input
            name="password"
            value={account.password}
            onChange={this.handleChange}
            label="Password"
            error={errors.password}
          />
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
