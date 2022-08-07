import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";
import auth from "../services/authService";

class MoviesTable extends Component {
  //we moved raiseOnSort method to tableHeader.jsx
  //making our table comonent flexible
  columns = [
    {
      name: "title",
      label: "Title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { name: "genre.name", label: "Genre" },
    { name: "numberInStock", label: "Stock" },
    { name: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: movie => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      )
    }
  ];

  // we want that if the user is loggedIn and is also admin we show the delete Button
  //as only admin user can delete movie as our requirement of vidly-api-node project so we should hide del btn for other users
  // so we know using MongoDBCompass directly add this "isAdmin:true"
  //property in user object we wanted to make admin also assign it type boolean. so only that
  //user will now be able to see the delete btn for all other they will be hidden so
  //so we removed Delete Button code from above Columns object as we cannot apply any condition there
  //and moved here in constructor and added that Delete Button on a Condition if the user is loggedIn and is also admin
  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) {
      //if user is loggedIn and admin then in columns array/object at the end of it push this
      //object i.e key and a content method otherwise don,t push so columns object will not have this
      //Delete Button.
      this.columns.push({
        key: "delete",
        content: movie => (
          <button
            onClick={() => this.props.onDelete(movie._id)}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        )
      });
    }
  }

  render() {
    const { movies, onSort, sortBy } = this.props;

    return (
      <Table
        data={movies}
        columns={this.columns}
        sortBy={sortBy}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
