import React, { Component } from "react";
//we used here for loop insteD of map()
class myPagination extends Component {
  render() {
    let totalPages = this.props.itemsCount / this.props.pageSize;
    let pagesLiTags = [];

    for (var i = 1; i <= totalPages; i++) {
      pagesLiTags.push(
        <li className="page-item" onClick={} key={i}>
          <a className="page-link" href="#">
            {i}
          </a>
        </li>
      );
    }

    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">{pagesLiTags}</ul>
      </nav>
    );
  }
}

export default myPagination;
