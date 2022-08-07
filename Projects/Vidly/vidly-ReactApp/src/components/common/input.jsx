import React from "react";
const Input = ({ name, value, label, type, error, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      {/* controlled element as get value from state and notify any
    change via raising an event 
    so when we enter any thing event onChange Will raise and that will
    update the state username value and then as state changed so component
    rerenders then the value will be placed in the 'value' of the input so we
    see what we typed   so value entered is assigned first to state and then 
    state assign the value to the input field*/}
      <input
        value={value}
        onChange={onChange}
        name={name}
        id={name}
        type={type}
        className="form-control"
      />
      {/* if error has a value then show error div */}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;

// // rest will get all props
// const Input = ({ name, label, error, ...rest }) => {
//   return (
// //  adding ...rest we don,t need to pass   onChange,value,type
//     <input
//         {...rest}
//         name={name}
//         id={name}
//         className="form-control"
//         placeholder="Enter UserName"
//       />
//   )
