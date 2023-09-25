import { Request, Response } from "express";
import Movie from "../model/movieSchema";
import User from "../model/userSchema";
const userController = {
  moviesFetchUser: async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string);
      const limit = parseInt(req.query.limit as string);
      const skip = Math.abs((page - 1) * limit);
      const totalMovieCount = await Movie.find().countDocuments();
      const totalPages = Math.ceil(totalMovieCount / limit);
      const movieListData = await Movie.find()
        .skip(skip)
        .limit(limit)
        .sort({ movieReleaseDate: -1 });
      res.json({ movieList: movieListData, totalPages: totalPages });
    } catch (err) {
      res.json({ message: "fecthUserMovieList backend error:", err });
    }
  },

  findNumber: async (req: Request, res: Response) => {
    try {
      const phoneNumber = req.query.number;
      const userValid = await User.findOne({ Mobile: phoneNumber });
      if (userValid?.Name) {
        res.json({ userExist: true, message: "User already exists" });
      } else {
        res.json({ userExist: false, message: "User does not exist" });
      }
    } catch (error) {
      res.json({ message: "findNumber backend error:", error });
    }
  },

  getMoviesBySearch: async (req: Request, res: Response) => {
    try {
        
      const searchText = req.query.search;
      const search = new RegExp(searchText as string, "i");
      const movieSearchData = await Movie.find({ movieTitle: search}).limit(8).sort({ movieReleaseDate: -1 });
      res.json({ movieList: movieSearchData });
    } catch (err) {
      res.json({ message: "fecthMovieList backend error:", err });
    }
  },
};

export default userController;
