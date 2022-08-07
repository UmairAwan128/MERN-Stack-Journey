import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

// this class contains all the reusable code from loginForm.jsx so this
//code could be reused by other forms like registerForm.jsx
class Form extends Component {
  state = { data: {}, errors: {} };

  validate = () => {
    //Joi.validate() method requires two things first object or set of value
    //and second is set of rules to which object should be validated
    //"abortEarly:false" means scan whole form and show all errors
    //bydefault it is set to true so on finding first error execution stops
    //and show that only error
    const result = Joi.validate(this.state.data, this.scheema, {
      abortEarly: false
    });
    // in result we get a "error" property if there are any errors, this
    //property has a "details" array which has list of all error obejct having two properties that are
    //useful for us they are "message" and "path" which is also an array and its
    //first index has then name of the input which we can get as result.error.details.path[0] .
    // console.log(result);
    console.log(result.error);
    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
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

  handleSubmit = event => {
    event.preventDefault();

    //for errors onSubmit of form
    const errors = this.validate();
    //    console.log(errors);
    //validate() returns null if there are no errors and an obejct cannot
    //have null value but can have empty object {} so in setState assign
    // emptyObj{} if value is null
    this.setState({ errors: errors ? errors : {} }); //same as errors||{}
    if (errors) return; //if errors found then return don,t submit form
    //if errors is null then submit the form
    this.doSubmit(); //in its child clases e.g loginForm.jsx
  };

  //for all inputFields this handles there value change
  handleChange = event => {
    //onChange of value of input we set and remove errors here
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(event.currentTarget);
    if (errorMessage) errors[event.currentTarget.name] = errorMessage;
    else delete errors[event.currentTarget.name]; //if nothing return then delete error
    //property from the state

    const data = { ...this.state.data };
    //first get then name attribute value of the input field as name is same
    //as state props name so access that specific state then get the value of
    // the input filed and update the value
    data[event.currentTarget.name] = event.currentTarget.value;

    // or ObjDestructuring
    //  handleChange = ({ currentTarget: input }) => {
    // then      data[input.name] = input.value;
    this.setState({ data: data, errors: errors });
  };

  //every form will have submit button label migth change so its also here
  renderButton(label) {
    return (
      /* we want if there are any errors in form button should be
      disabled if no errors then button gets enabled, validate() method
      as we know returns null if no errors which will be considered false
      and if errors object is returned so it will be true so button gets disabled*/
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }
  //type is optional parameter
  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;
    console.log(data);
    return (
      <Select
        name={name}
        value={data[name]}
        options={options}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
