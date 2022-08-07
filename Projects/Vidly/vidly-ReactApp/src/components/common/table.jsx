import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
const Table = ({ columns, sortBy, data, onSort }) => {
  return (
    <table className="table">
      <TableHeader columns={columns} sortBy={sortBy} onSort={onSort} />
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;
