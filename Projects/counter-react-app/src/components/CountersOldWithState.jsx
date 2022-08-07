import React, { Component } from "react";
import Counter from "./counter";
class Counters extends Component {
  //our next requirment is show the total number of counters currently
  // on screen but we cannot do that as the navbar is in the other file
  //and state is here so we cannot use this component state there so solution
  //is to move this state and its related methods that modify the state to upper parent class
  //main is the App.js as the state in App.js can be accessed by all the child components so
  //we did that in the Counters.js
  state = {
    counters: [
      { id: 1, value: 0 },
      { id: 2, value: 2 },
      { id: 3, value: 4 },
      { id: 4, value: 1 }
    ]
  };

  handleIncrement = counter => {
    console.log(counter); //to check if counter object is reaching on which we are clicking
    //as we know as any counter value will change we will recreate the whole array and replace
    //that with the old once so for that first
    //... is spread operator will spread all elements like we are assign it new array
    //its benifit can be when add we want to add a new element at end/start of this array
    const counters = [...this.state.counters]; //this ... will clone the array and move to counters
    const index = counters.indexOf(counter); //first get the index of the counter passed then

    //counters[index].value++; // don,t do this as it directly modifies state that don,t work instead
    //we should use setState() so solution is the change the reference to other object and modify that
    //so use the counter object passed to this method and modify that and that will not effect the
    //state so after incrementing use setState to overwrite the previous state so
    counters[index] = { ...counter }; //got the ref of the counter obj so updating its value don,t effect the state
    counters[index].value++; //now increment
    this.setState({ counters: counters }); //update the counters array property with the new counter array values
  };

  //this reset functionality resets the counters 'value' property to 0 but only this components
  //state value changes but not the 'count' property of state in the counter.jsx changes its because
  //of that state is local to that file only and is invisible here we cannot change that value
  //from here so the on counters we see the old values or the vlues from the count prop of state
  //so the problem is we don,t have a single source of truth in our application as we assign value
  // to the value property of thr <counter> but that don,t reach and change the state count prop
  // so solution is to remove the complete state or only count property from the state of counter.jsx
  //to resolve the problem and as state deleted so now counter.jsx will be called as controlled component
  //as all its value depends on the props pass to it.
  handleReset = () => {
    const counters = this.state.counters.map(c => {
      c.value = 0;
      return c;
    });
    this.setState({ counters: counters });
  };

  handleDelete = counterId => {
    //as we know we don,t have any mechanism in react to delete as specific index of array
    //so the solution is the you create the whole new list without the item we deleted we can
    //do this by using the function filter() and get all the counters except for which the
    //delete button is clicked.
    const updatedCounters = this.state.counters.filter(c => c.id !== counterId);
    //then overwrite the counters array property of the state
    this.setState({ counters: updatedCounters });
  };

  render() {
    return (
      <div>
        <button
          style={{ fontSize: 20 }}
          onClick={this.handleReset}
          className="btn btn-info btn-sm m-2"
        >
          Reset
        </button>

        {/*here as we know that <counter> is our own created tag so it will not
          //have any properties like value and other but "key" only as all react tags
          contains this to be uniquely identified in react to define a new property
          just do first name it and assign it value like this value="1" then in the 
          related Component class i.e here Counter use "this.props.yourPropertyName
          so we will access the "value" property there as this.props.value   */}
        {this.state.counters.map(counter => (
          // <Counter
          //   key={counter.id}
          //   onDelete={this.handleDelete}
          //   value={counter.value}
          //   id={counter.id}
          // >
          //instead of passing the value and id property seperately in serperate properties
          //we can pass them in single as counter={counter} passing the complete object also benifits in future
          //if we add a new property like selected for tag in Counters state we don,t need to pass but will be already passed.
          <Counter
            key={counter.id}
            onDelete={this.handleDelete}
            onIncrement={this.handleIncrement}
            counter={counter}
          >
            {/* this <h4>tag is inside our created <Counter> this type of case will come
            when we use dialog boxes as it has heading,body,footer so these innner tags
            can be accessed again from the props object of that very component class here "counter"
            and these are accessed there inside the childern property*/}
            <h4>Counter #{counter.id}</h4>
          </Counter>
        ))}
      </div>
    );
  }
}

export default Counters;
