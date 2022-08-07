import React, { Component } from "react";
// Props vs State
//props include data that we input to the component and is readonly can,t be modified
//but can be changed if assigned its value to state/other and use that new changed value. whereas
//so using props we can provide input to a component.
//state includes data that is local/private to that component as state is invisibl e to other
class Counter extends Component {
  state = {
    // here as we know that <counter> is our own created tag so we will use it outside
    // there we are allowing user by giving this tag a property like "value" which
    // contains the value for the tag if any,the value assigned in "value" will be accessed
    //using the props object of this very class
    // as "this.props.yourPropertyName in this way we can create our own properties
    //as the property is complete object so accessed as
    count: this.props.counter.value,
    //from this URL a random image(200*200) will be given to us
    imageURL: "http://picsum.photos/200",
    tags: ["tag1", "tag2", "tag3"] //array
  };

  styles = {
    //creating styles for html tag for reuseablity in this property
    // now where on which tag we call this styles property these styles will be applied on that
    fontSize: 10, //format should be in camel case value will be auto converted to 10px
    fontWeight: "bold"
  };

  // constructor() {
  //   super(); //first call the parent constructor
  //   //  this.handelIncrement = this.handelIncrement.bind(this); //here we binded handleIncrement()
  //if the method was created in simple way as that will be executed like before the dom loads not after
  // }

  //in simple function here we cannot access the "state" properties e.g 'count' value to increment as this
  //is normal function i.e not binded as this method runs before the DoM gets loaded so to bind either bind it
  //in class constructor i.e we did above commented or change way of declaring method to  Name=()=>{ }
  handelIncrement = productId => {
    // this method is require a parameter of any type what passed while calling can be accessed from productId
    console.log("increment product : " + productId);
    //to update any variable of the state we use setSate() this will overwrite the property and its value if exists
    this.setState({ count: this.state.count + 1 });
  };

  //like main method
  render() {
    //here for the html we wrote automatically calls  React.createElement()    //calls to create these html tags or elements
    //to create these html tags or elements
    //this method requires only one element/tag not more then one so for
    // more then one tag enclose them in the React.Fragment tag.

    return (
      <div>
        {/* this will display any tag or code enclosed in <counter> <h4>lkj</h4> </counter> tag */}
        {this.props.children}
        {/* same thing did by using the id property also passed by <counter> tag and writing inner tag<h4> here */}
        <h4>Counter #{this.props.counter.id}</h4>

        {/* <img src={this.state.imageURL} alt="no Image" /> */}
        {/* m-2 here means that apply margin 2px all sides  calling the styles property for styles*/}
        {/* <span style={{fontSize: 10}} className={this.getBadgeClasses()}>   for inline styling/css */}
        <span style={this.styles} className={this.getBadgeClasses()}>
          {this.formatCount()}
        </span>

        {/* for inline styling use double {{ }} */}
        <button
          //onClick() for name of the function follow the camel case
          //onClick={this.handelIncrement} //called handelIncrement() on the click of this Buton if it requires
          // no parameters also here we cannot pass parameter as we cannot write handleIncrement with braces()
          onClick={() => this.handelIncrement(1)} //so solution is create a method or annoymous method and call
          //the method there and we know we can call there function with braces as handleIncrement() so can pass paraemeter here
          style={{ fontSize: 20 }}
          className="btn btn-secondary btn-sm m-2"
        >
          Increment
        </button>

        {/* here is the delete button which will delete the specific <counter> component from 
         the list of all counters so we will use here onClick method and call a funcion to delete
         that spefic counter the bu we know that all the list of counters are in Counters.jsx(component) satate
         and we know that the state of any component is private cannot be accessed outside the component
         i.e here Counters.jsx so solution is we define the method there to delete the component as
         the method will be in that file so it will be able to mak changes to the state i.e remove the counter we clicked
         so we created a method there and passed its ref in the property named onDelete which we accessed here to get
         method ref and bind that method to the click of this component <counter> */}
        <button
          style={{ fontSize: 20 }}
          onClick={() => this.props.onDelete(this.props.counter.id)}
          className="btn btn-danger btn-sm m-2"
        >
          Delete
        </button>

        {/*calling the method that will display list if it has element else msg we can also do that directly here  */}
        {this.renderTags()}
        {/* additionlly showing this msg also is length of array is 0 for this first see
         true && false => false
         true && "Hi" => Hi      //string is non empty so true then as true && true is true so Hi is output
         true && "Hi" && 9 => 9  // as no is not zero so true so all three true so last will be printed i.e 9
         so for below if length is 0 display msg if not then ignore it
         */}
        {this.state.tags.length === 0 && "Please create a new tag!"}
      </div>

      // we can write as many tags in <React.Fragment> inpite of using <div> the benifit is
      //its not a tag like div the will be shown on final Html so now output will be only
      //<h1> and <button> enclosed in nothing e.g <div>
      //   <React.Fragment>
      //     <h1>Hello World</h1>
      //     <button>Increment</button>
      //   </React.Fragment>
    );
  }

  //this mehtod will return a list of tags if its length is > 0 else it will display a msg
  renderTags() {
    if (this.state.tags.length === 0) return <p>There are no tags!</p>;
    return (
      <ul>
        {/* we assigned key property to each <li> and its value should be unique i.e like id
         this value/id should be unique for this very block not for the complete document
         or application i.e in this case <ul> so another <ul> can also have the same set of id as this.*/}
        {this.state.tags.map(tag => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    );
  }

  //this method was auto generated by first lining the inner lines the selecting both and rightClick -> Refactor
  // which will move this code to a auto created method and we can also enter its name the method while creation
  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.state.count === 0 ? "warning" : "primary"; //either will be appeneded end of classes var
    return classes;
  }

  formatCount() {
    const { count } = this.state; //to get the reference of the count property of state
    // not its value or to make count property accessible outside with name direclty
    // inspite of   this.state.count.

    //return count === 0 ? <h1>Zero</h1> : count;
    return count === 0 ? "Zero" : count;
  }
}

export default Counter;
