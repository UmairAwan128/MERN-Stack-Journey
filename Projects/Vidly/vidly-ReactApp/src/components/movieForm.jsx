// first see the login form
import React from "react";
//first       npm i joi-browser@13.4
import Joi from "joi-browser";
import Form from "./common/form";
import { getGenres } from "../services/genreService";
import { saveMovie, getMovie } from "../services/movieService";
//we created a new class "form" which has all the reuseable code no render method, code which was
//previously in this file now its in form.jsx and now this loginForm extends Form
class createMovie extends Form {
  //extends Form anf Form extends component
  state = {
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    genres: [],
    errors: {}
  };

  //scheema is unique for every form
  scheema = {
    // id for the movie
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"), //label is the name shown while showing error
    genreId: Joi.string()
      .required()
      .label("Genre"), //label is the name shown while showing error
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate")
  };

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres: genres });
  }

  async populateMovie() {
    try {
      //while calling this component as we know its url requires one parameter i.e
      //id so if createMovie button is clicked then value "new" is passed as the value
      //for id so id=new
      const movieId = this.props.match.params.id;
      if (movieId === "new") return; //Id is new return don,t execute next lines
      // i.e don,t need to fill form with existing movie object

      //so the id is passed i.e we are editting so get existing movie by this id
      //      const { data: movie } = await getMovie(movieId);
      //if invalid id and movie not found so redirect to not-found page, and
      //as replace() used so no history otherwise we will get into a loop pressing back button.
      // only valid for fakeMovieService.js as there getMovie() return null if movie not found
      //  if (!movie) return this.props.history.replace("/not-found");
      //but in case of getting data from online API it return no response and status code 404 and
      //also the code is in try catch so moved code for gettting movie to try{}
      const { data: movie } = await getMovie(movieId);
      //if valid id so movie object found so set values of movie in the state
      //convert to movie object to be having set of properties what we want and
      //in what names we want.
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.history.replace("/not-found"); //redirect to notfound page
      }
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }

  doSubmit = async () => {
    await saveMovie(this.state.data);
    //call the server save data
    this.props.history.push("/movies");
    console.log("submitted");
  };

  render() {
    return (
      <div className="content">
        <h1>Movie Form</h1>
        {/* {console.log(this.state.genres)} */}
        <form onSubmit={this.handleSubmit}>
          {/*as some code we were passing to input compoent was also 
          duplicating so we created its method in form.jsx and called here  */}
          {this.renderInput("title", "Title")}
          {/* last parameter is type which is optional */}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {/*  */}
          {this.renderSelect("genreId", "Genre", this.state.genres)}

          {this.renderInput("dailyRentalRate", "Rate")}

          {/* //every form will have submit button label migth change so 
          moved in method of form.jsx and called method here */}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default createMovie;
