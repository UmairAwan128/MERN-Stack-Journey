import React, { Component } from "react";
import _ from "lodash";
class TableBody extends Component {
  renderCell = (column, item) => {
    if (column.content) {
      //if column has content field which is function requiring an item parameter
      return column.content(item);
    }
    //_.get(item,column.name)  is same as item[column.name] here it means
    //get value on specific movie[title or other]
    return _.get(item, column.name);
  };

  createKey = (item, column) => {
    //if column.name field don,t exist use column.key
    return item._id + (column.name || column.key);
  };

  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map(row => (
          <tr key={row._id}>
            {columns.map(column => (
              <td key={this.createKey(row, column)}>
                {this.renderCell(column, row)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
