import React, { Component } from "react";
class TableHeader extends Component {
  //previously the code for deciding the sort order
  //or toggling the sort order was in the handleSort() method of movies.jsx
  // but we moved that code to here as that is the
  //part of moviesTable component and it should have this code inside it
  //also we don,t need to duplicate it ever time we use this component.
  //so we created a method here that calculates the sort order and calls the
  //handleSort() of the movies.jsx.
  raiseOnSort = columnName => {
    //as user click on any column name data gets sorted by that column but
    //we want that if user again click the column we revert sortOrder i.e
    //if pre it was asc now it will be desc and viceversa.
    const sortBy = { ...this.props.sortBy };
    //craete a sortBy object according to requirments
    if (columnName === sortBy.columnName) {
      sortBy.order = sortBy.order === "asc" ? "desc" : "asc";
    } else {
      sortBy.columnName = columnName;
      sortBy.order = "asc";
    }
    //now this method will will change the state
    this.props.onSort(sortBy);
  };

  renderSortIcon = column => {
    const { sortBy } = this.props;
    //if the column passed is not equal to the current sortBy then remove the icon
    if (column.name !== sortBy.columnName) return null;
    //so now its equal to current sortBy column so return asc icon
    if (sortBy.order === "asc") return <i className="fa fa-sort-asc" />;
    //else return desc arrow icon
    return <i className="fa fa-sort-desc" />;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(column => (
            <th
              //key  will be column.name if that property don,t exist then use column.key
              key={column.name || column.key}
              style={{ cursor: "pointer" }}
              onClick={() => this.raiseOnSort(column.name)}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
