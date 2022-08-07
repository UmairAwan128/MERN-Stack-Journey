import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = props => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  //console.log(itemsCount);
  const pagesCount = Math.ceil(itemsCount / pageSize);

  if (pagesCount === 1) {
    //then pagination will be not shown as thers is only one page
    //so pagination should not be shown
    return null;
  }

  //create an array having elements 1 to pagesCount must +1
  let pageNoArr = _.range(1, pagesCount + 1);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        {pageNoArr.map(pageNo => (
          <li
            className={
              pageNo === currentPage ? "page-item active" : "page-item"
            }
            key={pageNo}
          >
            <a className="page-link" onClick={() => onPageChange(pageNo)}>
              {pageNo}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

//here we are defining rules for the props this component wants when its used
//in another component for details see register
//first install install npm i prop-types@15.6.2
//then import the file above import PropTypes from "prop-types";
//now if wrong props value of if a required prop is not passed
//react will auto generate error in console only in developer mode
//not after its deployed.
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};
//in such component we can just see this to get what the component
// expect as props and their types also

export default Pagination;
