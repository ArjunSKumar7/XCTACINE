import { Schema, model } from "mongoose";

const movieSchema = new Schema({
  movieId: {
    type: String,
  },
  movieTitle: {
    type: String,
  },
  movieLanguage: {
    type: String,
  },
  movieOverview: {
    type: String,
  },
  moviePoster: {
    type: String,
  },
  movieBackgroundPoster: {
    type: String,
  },
  movieReleaseDate: {
    type: Date,
  },
  theatreId: {
    type: Array,
  },

});

const Movie = model("MovieSchema", movieSchema);
export default Movie;
