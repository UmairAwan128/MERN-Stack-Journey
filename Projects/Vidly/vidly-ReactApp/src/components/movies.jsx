import React, { Component } from "react";
//as the files are outside this folder so doubleDots(../__) used
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import Pagination from "./common/Pagination";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import { paginate } from "../utils/paginate";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";
import { toast } from "react-toastify";
//import { getByGenre } from "../utils/getDataByGenre";
import _ from "lodash";

class Movies extends Component {
  state = {
    //define them with an empty array as it will be having list of elements
    movies: [],
    genres: [],
    searchQuery: "",
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null,
    sortBy: { columnName: "title", order: "asc" }
  };

  //this is a life cycle hook of mounting phase this will be called
  //on mounting phase only right after the render() moethod is called
  //so dom will be loaded forsure
  async componentDidMount() {
    //as "AllMovies" is not a category so we don,t need to enter it in Genre
    // table inspite we will add it in start of all genres here and assign it
    //const genres = [{ name: "All Genres" }, ...getGenres()];

    //method getGenres return "promise" but wew need object so used await for details see genreService
    const { data } = await getGenres(); //direclty get the data from the response or object
    const genres = [{ name: "All Genres" }, ...data];

    const { data: movies } = await getMovies(); //direclty get the data from the response or object
    //this.setState({ movies: getMovies(), genres: genres });
    this.setState({ movies: movies, genres: genres });
  }
  //as we know methods don,t have access to "this" or Movies class
  //object and state so solution is bind the method either in constructor
  //or use the arrow function
  // handleDelete = id => {
  //   //console.log(id);

  //   //for delete there can be two ways
  //   //1. is delete movie by calling method and then again call the getMovies()
  //   //debugger;
  //   //console.log(deleteMovie(id));
  //   //this.setState({ movies: getMovies() });

  //   //2. or use filter method on current state object as
  //   const moviesAfterDel = this.state.movies.filter(movie => movie._id !== id);
  //   console.log(getMovies());

  //   this.setState({ movies: moviesAfterDel });
  // };

  //now using online api for data so code gets changed for details see vidly-HttpApp  Project....
  //so on online api deletion/updation can be done in two ways
  //1. premistic (in which we first call the server if its a success then we update the state the problem here is it is slow)
  //   so solution is we let that our call to server will always be a success so set the state first then call the server.
  //2. optimistic (in which we first update the state then we call the server if request fails then we set the state to its old value. this is very fast)
  handleDelete = async id => {
    const orignalmovies = this.state.movies; //create a backup of old state value or posts
    const movies = orignalmovies.filter(m => m._id !== id); //update state
    this.setState({ movies });
    try {
      await deleteMovie(id);
    } catch (ex) {
      //request to server for deletion failed or error occured
      //these errors can be of two types.
      //Expected Errors(Client Mistakes) e.g 404 not found(deleting record that is not in DB) , 400 bad request(invalid values in form)
      // so for these we should display a specific msg to client so he understand and resolve error.
      //UnExpected Errors (server side/Code errors) (e.g Internet off , server down, DB down, bug in our code)
      // we should log such errors in console so programmer or we can resolve it
      // and display a generic friendly msg for the user
      //console.log("Hanled delete catch block");
      //in our case we handled only on expected error 404
      if (ex.response && ex.response.status === 404) {
        //if invalid post id found the this will be shown
        toast.error("The movie has already been deleted");
      }

      //otherwise error is unexpected so log and display msg
      //else {
      //but this error msg will be same for all requests e.g in get/post/put in any of these if unexpected error
      // occur e.g server gets down or internet off so we will be duplicating this code in all methods so solution
      //is use 'Intercepter in axios' in axios each request type get/post or any control first goes to intercepter method
      // then from there it comes to next line from where the server was called i.e await axios.get(___)
      //so moved the code to interceptor method in seperate file httpService for reusability.
      //}

      //so as error ccured now set the state to old state values that were before deletion so.
      this.setState({ movies: orignalmovies });
    }
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies: movies });
  };

  handlePageChange = pageNo => {
    this.setState({ currentPage: pageNo });
  };

  handleGenreSelect = genre => {
    //on selecting another genre also set currentPage to 1 as we know its the state it will
    //will only change when we change it otherwise we will get errors like if e.g all movies has
    //5 pages and Action genre has only 1 page so comming from allMovies tab to Action tab currentPage
    //will be same it will not change so we will not see any data on action Tab.
    //also did same for searchQuery as we don,t want to perform search in specific genre
    //while its selected search should be everywhere so onSelecting genre we will be
    //able to show all movies related to genre
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSort = sortBy => {
    //previously this method was getting column name and then then deciding the sort order
    //or toggling the sort order but we moved that code to the moviesTable.jsx as that is the
    //part of moviesTable comonent and we don,t need to duplicate it ever time we use that component.
    this.setState({ sortBy: sortBy });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      movies: allMovies,
      sortBy,
      searchQuery
    } = this.state;

    // my method for filtering
    // //calling method
    // let moviesByGenre = getByGenre(allMovies, this.state.selectedGenre);
    // count = moviesByGenre.length;

    // mosh way
    // first check if selectedGenre property state exists if exists then true then use its true
    // value and filter allMovies according to selectGenre else if selectedGenre not
    // exists i.e when app is launched byDef then show all movies
    // const filteredMovies =
    //   selectedGenre
    //     ? allMovies.filter(movie => movie.genre._id === selectedGenre._id)
    //     : allMovies;

    //as now we added a new genre named "AllGenre" and we want to show all movies on its click
    //we can do this by as it does not have _id field so we added this in condition with &&
    //now if selectedGenre exists and its also has _id field then filter else show all movies
    //"allGenre" item is added to genres in componentDidMount()
    //so
    // filteredMovies =
    // selectedGenre && selectedGenre._id
    //   ? allMovies.filter(movie => movie.genre._id === selectedGenre._id)
    //   : allMovies;

    //but now as additionally we want to search and search should be on all movies
    //we don,t want to do this on specific genre so logic should be either do search
    //or filter by genre so
    let filteredMovies = allMovies;
    if (searchQuery)
      filteredMovies = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filteredMovies = allMovies.filter(
        movie => movie.genre._id === selectedGenre._id
      );

    //second and third arguments are array so here we can pass more then one
    //column names or order to sort data with
    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortBy.columnName],
      [sortBy.order]
    );

    //we called here paginated movies inpite of in the handlePageChange()
    //as there we changed the currentPage state property as as we now when
    //state changes its update phase and in this phase render() method is reexecuted
    //so we did called here as its beter to do this here
    const paginatedMovies = paginate(sortedMovies, currentPage, pageSize);

    return { totalCount: filteredMovies.length, data: paginatedMovies };
  };

  handleSearch = query => {
    //while doing search as we don,t want to perform search in specific genre
    //so search should be everywhere so when user searches selectedGenre is
    //set to null so any slected genre gets removed and only search performs
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };
  // in index.css we changed the top padding of whole app to 10px
  render() {
    //get the length variable value which is a built in variable of array
    //class and store its value in a new variable count so count has the length
    let { length: count } = this.state.movies;

    //here we get user obj/data which is currently loggedIn this is passed from App.js
    //we use this to hide Delete,Create btn so if user is not loggedIn they will be hidden
    const { user } = this.props;

    if (count === 0) {
      return <h2>There are no movies</h2>;
    }

    const { totalCount, data: paginatedMovies } = this.getPagedData();

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-sm-3">
            {/*  textPropertyName   and  idPropertyName  these props are optional
             pass them only if id filed name is not _id and name field is not name
             i.e if they have any other name then pass that name in the property    
         */}
            {/* pay attention when defining name for props as we did here
                names are rhyming i.e all has item then onItemSelect and selectedItem 
                are rhyming don,t use name like currentItem it should by rhyming to other
                as selectedItem */}
            <ListGroup
              onItemSelect={this.handleGenreSelect}
              items={this.state.genres}
              selectedItem={this.state.selectedGenre}
            />
          </div>

          <div className="col-sm-9">
            {/* if the user is logged in or user obj has value then show NewMovie btn ele if user is not loggedIn they will be hidden */}
            {user && (
              <Link
                // new is the value for id parameter i.e id=new so create Movie form opens
                to="/movies/new"
                className="btn btn-primary"
                style={{ marginBottom: 20 }}
              >
                New Movie
              </Link>
            )}
            <p>There are {totalCount} movies</p>

            <SearchBox
              value={this.state.searchQuery}
              onChange={this.handleSearch}
            />

            <MoviesTable
              movies={paginatedMovies}
              sortBy={this.state.sortBy}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />

            {/* on this component we have applied prop Type-checking or validation
        on props passed to this component  */}
            <Pagination
              itemsCount={totalCount}
              pageSize={this.state.pageSize}
              onPageChange={this.handlePageChange}
              currentPage={this.state.currentPage}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
