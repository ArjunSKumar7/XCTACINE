import { Request, Response, response } from "express";
import Movie from "../model/movieSchema";
import Screen from "../model/screenSchema";
import Location from "../model/locationSchema";
import { ObjectId } from "mongoose";

import mongoose from "mongoose";

const theatrecontroller = {
  addMovie: async (req: Request, res: Response) => {
    try {
      const movieTitle = req.body?.movieData?.title;
      const theatreId = req.body?.theatreData?.theatreId;
      const existingMovie = await Movie.findOne({ movieTitle: movieTitle });
      if (existingMovie) {
        if (existingMovie.theatreId.includes(theatreId)) {
          // Movie with the same title and theatreId already exists
          res.json({ message: "Movie already exists for this theatre." });
        } else {
          // Add the new theatreId to the existing movie
          existingMovie.theatreId.push(theatreId);
          const response = await existingMovie.save();

          res.json({ message: "Movie updated with new theatreId.", response });
        }
      } else {
        const movieUrl = `https://image.tmdb.org/t/p/w500${req.body?.movieData?.poster_path}  `;
        const movieObj = new Movie({
          movieId: req.body?.movieData?.id,
          movieTitle: req.body?.movieData?.title,
          movieLanguage: req.body?.movieData?.original_language,
          movieOverview: req.body.movieData?.overview,
          moviePoster: movieUrl,
          movieReleaseDate: req.body.movieData?.release_date,
          theatreId: req.body?.theatreData?.theatreId,
        });
        // await movieObj.save().then((resposne) => {
        //   console.log("movie obj response",response);
        //   res.json({ message: "movie added successfully!", resposne });
        // });
        const response = await movieObj.save();
        console.log("movie obj response", response);
        res.json({ message: "movie added successfully!", response });
      }
    } catch (error) {
      console.log("addmovie backend error:", error);
      res.json({ message: "addmovie backend error:", error });
    }
  },

  fetchMovieList: async (req: Request, res: Response) => {
    try {
      const theatreId = req.params.id;
      const movieListData = await Movie.find({
        theatreId: { $in: [theatreId] },
      });

      res.json({ movieList: movieListData });
    } catch (err) {
      console.log("fecthMovieList backend error:", err);
      res.json({ message: "fecthMovieList backend error:", err });
    }
  },

  deleteMovie: async (req: Request, res: Response) => {
    console.log("Aaaaaaaa");
    try {
      console.log("req", req.query);

      const { movieId, theatreId } = req.query;

      const movieDeleteResponse = await Movie.updateOne(
        { movieId: movieId },
        { $pull: { theatreId: theatreId } }
      );
      console.log("movieDeleteResponse", movieDeleteResponse);
      res.json({ message: "movie deleted", movieDeleteResponse });
    } catch (err) {
      res.json({ message: "fecthUserMovieList backend error:", err });
    }
  },

  addScreen: async (req: Request, res: Response) => {
    try {
      const screenExist = await Screen.findOne({
        screenName: req.body?.screenName,
      });
      if (screenExist) {
        res.json({ message: "screen already exist" });
      } else {
        const screenObj = new Screen({
          screenName: req.body?.screenName,
          rows: req.body?.Rows,
          columns: req.body?.Columns,
          shows: req.body?.shows,
          theatreId: req.body?.theatreId,
          theatreName: req.body?.theatreName,
          ticketPrice: req.body?.ticketPrice,
        });
        await screenObj.save().then((resposne) => {
          res.json({ message: "screen added successfully!", resposne });
        });
      }
    } catch (error) {
      console.log("addScreen backend error:", error);
      res.json({ message: "fecthUserMovieList backend error:", error });
    }
  },

  fetchScreenList: async (req: Request, res: Response) => {
    try {
      console.log("req", req.params.id);
      const theatreId = req.params.id;
      const screenListData = await Screen.find({ theatreId: theatreId });
      console.log("screenListData", screenListData);

      res.json({ screenList: screenListData });
    } catch (err) {
      res.json({ message: "fecthMovieList backend error:", err });
    }
  },

  fetchLocation: async (req: Request, res: Response) => {
    try {
      const locationData = await Location.find({});
      const locationList = locationData[0].location;
      res.json({ locationList: locationList });
    } catch (err) {
      res.json({ message: "fecthMovieList backend error:", err });
    }
  },

  moviescreenallocation: async (req: Request, res: Response) => {
    try {
      const data = req.body;
      const movie = await Movie.findOne({ movieId: data.movieId });
      console.log("movie", movie);
      const response = await Screen.updateOne(
        { _id: data.screenId },
        {
          $set: {
            movieId: data.movieId,
            movieTitle: movie?.movieTitle,
            selectedDates: data.selectedDates,
          },
        }
      );
      console.log("response", response);
      if (response.modifiedCount > 0) {
        res.json({ message: "moviescreenallocation successfully!", response });
      } else {
        res.json({ message: "moviescreenallocation failed!", response });
      }
    } catch (error) {
      res.json({ message: "moviescreenallocation backend error:", error });
    }
  },
};

export default theatrecontroller;
