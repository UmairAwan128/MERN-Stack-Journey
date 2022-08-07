//all the re-useable components are in common folder by convention
import React, { Component } from "react";

class Like extends Component {
  render() {
    let classes = "fa fa-heart";

    if (!this.props.liked) {
      classes += "-o";
    }

    return (
      <i
        className={classes}
        style={{ cursor: "pointer" }}
        // we called the handleClick method in movies.jsx inspite of here
        //as its better to do there as thats short other way will be passing
        //the movie object then call from here also the other reason is that comonent
        //has only one element.
        onClick={this.props.onClick}
      />
    );
  }
}

export default Like;
