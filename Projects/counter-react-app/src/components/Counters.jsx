import React, { Component } from "react";
import Counter from "./counter";
class Counters extends Component {
  //our next requirment was to show the total number of counters currently
  // on screen but we cannot do that as the navbar is in the other file
  //and state is here so we cannot use this component state there so solution
  //was to move the state and its related methods that modify the state to upper parent class
  // that is the App.js as the state in App.js can be accessed by all the child components so
  //we did that in the Counters.js

  //for details/comments about see the CounterOldWithState.jsx file
  render() {
    console.log("Counters-Rendered ");
    //object destucturing now onReset can accessed by writting onReset directly
    //inspite of this.props.onReset
    //const { onReset, counters } = this.props;

    return (
      <div>
        <button
          style={{ fontSize: 20 }}
          onClick={this.props.onReset}
          className="btn btn-info btn-sm m-2"
        >
          Reset
        </button>

        {this.props.counters.map(counter => (
          <Counter
            key={counter.id}
            //this.props.onDelete getting the parent class i.e app.js onDelete method reference
            onDelete={this.props.onDelete}
            onIncrement={this.props.onIncrement}
            onDecrement={this.props.onDecrement}
            counter={counter}
          >
            <h4>Counter #{counter.id}</h4>
          </Counter>
        ))}
      </div>
    );
  }
}

export default Counters;
