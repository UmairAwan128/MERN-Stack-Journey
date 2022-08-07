import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Movies from "./components/movies";
import MovieForm from "./components/movieForm";
import Coustomers from "./components/coustomers";
import NotFound from "./components/notFound";
import Rentals from "./components/Rentals";
import Navbar from "./components/navbar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
//first   npm install react-toastify@4.1.0
//this is used to create a toast container tag in which we can display a msg
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import myLoggingService from "./services/myLoggingService";
import Logout from "./components/logout";
import auth from "./services/authService";
import ProtectedRoute from "./components/common/protectedRoute";
myLoggingService.init(); //

class App extends Component {
  state = {};
  //we wanted to show currently loggedin userName to the Navbar so we get user set in state and passed to Navbar component
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <Navbar user={this.state.user} />
        <main role="main" className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={RegisterForm} />
            {/* <Route path="/movies/new" component={createMovie} /> */}

            {/* parametered routes should be shown first then non parametered
            othere wise non parametered will be shown if id=new is passed then
            emptyy form opens otherwise filed form with data of id passed*/}
            {/* <Route path="/movies/:id" component={MovieForm} /> */}
            {/* We want that if the user is not loggedIn or this.state.user is null and
            user tries to open create/EditMovieform we redirect him to login Page
            so now if user tries to enter create/EditMovieform url in browser that will not work and redirect to loginPage  */}
            {/* if we want to write some logic inside <Route> we use "render" inspite of "component" and
            hence pass we should pass all the default "props" these contains
            "history","match" e.t.c. */}
            {/* <Route
              path="/movies/:id"
              render={props => {
                if (!this.state.user) return <Redirect to="/login" />;
                return <MovieForm {...props} />;
              }}
            /> */}
            {/* a better way is we created our new Component <protectedRoute> and use it
            here what it does is it has logic to redirect the user to login Page if not loggedIn so*/}
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            {/* <Route path="/movies" component={Movies} /> */}
            {/* we wanted to pass "this.state.user" to movies Component so we can 
            hide create,delete buttons if the user is not loggedIn or user is empty but
            in route if we want to pass a prop use "render" inspite of "component" and
            hence pass "user" also we should pass all the default "props" these contains
            "history","match" e.t.c.   */}
            <Route
              path="/movies"
              render={props => <Movies {...props} user={this.state.user} />}
            />
            <Route path="/coustomers" component={Coustomers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />

            <Redirect from="/" exact to="/movies" />

            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
