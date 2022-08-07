import React from "react";
const SearchBox = ({ value, onChange }) => {
  return (
    <input
      value={value}
      //here we directly passed the searchTerm which user enters to handleSearch() in movies.jsx
      onChange={event => onChange(event.currentTarget.value)}
      name="query"
      type="text"
      placeholder="Search..."
      //   my-3 means margin on y-axis i.e top and bottom i.e 3px
      className="form-control my-3"
    />
  );
};

export default SearchBox;
