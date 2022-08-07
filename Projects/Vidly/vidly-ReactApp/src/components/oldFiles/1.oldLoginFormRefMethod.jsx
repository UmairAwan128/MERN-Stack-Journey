import React, { Component } from "react";
class LoginForm extends Component {
  //create a reference then assign this reference to an element e.g <input>
  username = React.createRef();

  handleSubmit = event => {
    //now the page will not reload
    event.preventDefault();
    //to get input fields data we cannot use document.getElementById() as in react
    //we cannot access document object there is an abstraction here
    //so solution is first create a ref as we did in start of class then
    // we assign "ref" property to <input> and assign it this ref variable we created
    //then to access the value of input we do
    const userName = this.username.current.value; //in this way we access dom in react
    //avoid using ref use only if you don,t have any way

    //call the server save data
    console.log("submitted");
  };

  componentDidMount() {
    //we can use refs to focus a input field on load of compoent so we focused userName field
    this.username.current.focus();
    //other way to focus is use "autoFocus" in input you want to focus we did in userName input
  }

  render() {
    return (
      <div className="content">
        <h1>Login Form</h1>
        {/* by default as we know when we click submit button of form
        page reload so all data/app i.e jsx is completely reloaded so to
        prevent this we have onSubmit */}
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">User Name</label>
            <input
              autoFocus
              ref={this.username}
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter UserName"
            />
          </div>
          <div className="form-group">
            <label htmlFor="Password">Password</label>
            <input
              type="password"
              className="form-control"
              id="Password"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
