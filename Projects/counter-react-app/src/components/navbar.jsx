import React from "react";

//if in a component we don,t have state or event handler or helper methods i.e we only have
//a single render() method in the class so better is use //Stateless Functional Component
//props will be passed by react at runtime to this function by own its own
const NavBar = props => {
  console.log("Navbar-Rendered ");
  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="/">
        Navbar
        <span className="badge badge-pill badge-secondary m-2">
          {props.totalCounters}
        </span>
      </a>
    </nav>
  );
};

export default NavBar;
