import React, { Component } from "react";
//first       npm i joi-browser@13.4
import Joi from "joi-browser";
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

  //first       npm i joi-browser@13.4
  //for validation use "joi" here we define rules for validating data
  scheema = {
    // label() is for showing friendly name of input field which
    //has error while error is shown
    username: Joi.string()
      .required()
      .label("UserName"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  validate = () => {
    //   validate method requires two things first object or set of value
    //and second is set of rules to which object should be validated
    //"abortEarly:false" means scan whole form and show all errors
    //bydefault it is set to true so on finding first error execution stops
    //and show that only error
    const result = Joi.validate(this.state.account, this.scheema, {
      abortEarly: false
    });
    // in result we get a "error" property if there are any errors, this
    //property has a "details" array which has list of all error obejct having two properties that are
    //useful for us they are "message" and "path" which is also an array and its
    //first index has then name of the input which we can get as result.error.details.path[0] .
    console.log(result);
    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
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
    const { name, value } = inputField;
    //as here we are computing validation for only one property of state not
    //all, so first we get that only property name and valueso to get that we
    // used computed property i.e [name] so name is variable and its value will
    //be decidied on runtime, value is also variabele  also for scheema we did the
    //same i.e dynamcially render name of the only scheema we want from all scheema
    //object and we also don,t have value so get that scheem value as get value
    //of the specific scheema by its name this.scheema[name].
    const obj = { [name]: value };
    const scheema = { [name]: this.scheema[name] };
    // validate method requires two things first object or value
    //and second is set of rules or rule to which object or value should be validated
    const result = Joi.validate(obj, scheema);
    //if there is error property in reult then return message else null
    //return first details[0] index its message as we know {abortEary:true} by def
    //so as 1st error occur execution stops and error is shown
    return result.error ? result.error.details[0].message : null;
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
          {/* we want if there are any errors in form button should be
          disabled if no errors then button gets enabled, validate() method
          as we know returns null if no errors which will be considered false
          and if errors object is returned so it will be true*/}
          <button
            disabled={this.validate()}
            type="submit"
            className="btn btn-primary"
          >
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
