import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/navbar";
import Counters from "./components/Counters";

class App extends Component {
  //for details about state or methods see the CounterOldWithState.jsx file
  state = {
    counters: [
      { id: 1, value: 0 },
      { id: 2, value: 2 },
      { id: 3, value: 4 },
      { id: 4, value: 1 }
    ]
  };

  //every App has three phases
  //1. Mounting phase here we have 3 lifeCycleHook(1.constructor  2.render() to load dom  3.componentDidMount()) executes
  //2. updating phase here we have 2 lifeCycleHook(1.render() to load dom   2.componentDidUpdate() is in counter.jsx) executes
  //3. unmount phase here we have 1 lifeCycleHook(1.render() 2.ComponentWillUnmount() in the counter.jsx)

  //Countructor is lifeCycleHook
  //constructor execute only once on Mount of object  so it can be used to initialize the
  //properties of the state but here this.props don,t work solution is pass props object as
  //parameter to it and also in super(props) then we can directly set the state inspite of setState()
  constructor(props) {
    //constructor is called once and is right place to initialize properties of state
    super(props);
    console.log(" -Mounting Phase- ", props);
    console.log("App-Constructor ", props);
    //this.state = this.props.value;
  }
  //componentDidMount is 2nd life cycle hook its auto executed after constructer and render()
  //mehod is executed so sequence is   1.constructor  2.render() to load dom  3.componentDidMount()
  //this method is called after the component(e.g app.jsx,counters.jsx) is rendered in DOM
  //i.e all design html is loaded so its a perfect place to do ajax call to get data from the server
  componentDidMount() {
    //ajax call
    //setState({//new Data/values})
    console.log("App-Mounted");
  }

  handleIncrement = counter => {
    const counters = [...this.state.counters]; //this ... will clone the array and move to counters
    const index = counters.indexOf(counter); //first get the index of the counter passed then
    counters[index] = { ...counter }; //got the ref of the counter obj so updating its value don,t effect the state
    counters[index].value++; //now increment
    this.setState({ counters: counters }); //update the counters array property
  };

  handleDecrement = counter => {
    const counters = [...this.state.counters]; //this ... will clone the array and move to counters
    const index = counters.indexOf(counter); //first get the index of the counter passed then
    counters[index] = { ...counter }; //got the ref of the counter obj so updating its value don,t effect the state
    counters[index].value--; //now increment
    this.setState({ counters: counters }); //update the counters array property
  };

  handleReset = () => {
    const counters = this.state.counters.map(c => {
      c.value = 0;
      return c;
    });
    this.setState({ counters: counters });
  };

  handleDelete = counterId => {
    const updatedCounters = this.state.counters.filter(c => c.id !== counterId);
    this.setState({ counters: updatedCounters });
  };

  render() {
    console.log("App-Rendered ");
    return (
      <React.Fragment>
        {/* in totalCounters we get the count of the counters whose value>0  */}
        <NavBar
          totalCounters={this.state.counters.filter(c => c.value > 0).length}
        />
        <main className="container">
          <Counters
            counters={this.state.counters}
            onReset={this.handleReset}
            onIncrement={this.handleIncrement}
            onDecrement={this.handleDecrement}
            onDelete={this.handleDelete}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
