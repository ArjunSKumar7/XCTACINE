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
  movieReleaseDate: {
    type: Date,
  },
});

const Movie = model("MovieSchema", movieSchema);
export default Movie;
