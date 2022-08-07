import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../services/authService"; //we got two level up as services are in src folder
//the output of this component is standard <route> component.
//whever call this must provide path and either component/render function so we get both here
const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  /* We want that if the user is not loggedIn or "user" is null and
            user tries to open create/EditMovieform we redirect him to login Page
            so now if user tries to enter create/EditMovieform url in browser that will not work and redirect to loginPage  */
  /* if we want to write some logic inside <Route> we use "render" inspite of "component" and
            hence pass we should pass all the default "props" these contains
            "history","match" e.t.c. */
  /* here we wanted to render the component dynamically as the compoent will be also
    passed so we will render that if the user is loggedin, we will get the component name in property
    "component" but we cannot use it so we assign it new name "Component" as component:Component and used that 
    now component passed here will be rendered*/

  return (
    //   last parameter we get is ...rest which means if anyother props are passed to it get
    // those then we used {...rest} here and passed it to <Route>
    <Route
      path={path}
      {...rest}
      render={props => {
        // if user is not authenticated/loggedIn and tries to open create/edit page
        //we redirect him to the login page and once he logsin we redirect him to home page but
        // we want that once user gets loggedIn he will be redirected to the page from where
        //he came from to the login page so we know props which is passed by reactRouter to this method
        //has a object location which has a property pathName which contains the address of the
        //page before we redirect to loginPage i.e what we require so we pass it using redirect so syntax will be
        //now a object which has two props path to redirect and "state" for passing any additional data.
        //for detail see     https://reacttraining.com/react-router/core/api/Redirect/to-object
        if (!auth.getCurrentUser())
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
            // now on /login which is loginForm we will check if "state" property exist in location props if yes the redirect there
          );
        //we know that this <route> component either requires component/render function so we get both as parameter
        //but only one will be used so we made logic that if "component" prop has value then use or render it otherwise
        //call the render method and passed as props to this compoenent and we then pass it "props"
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
