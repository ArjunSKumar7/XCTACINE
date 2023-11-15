import { Request, Response, response } from "express";
import Movie from "../model/movieSchema";
import Screen from "../model/screenSchema";
import Location from "../model/locationSchema";
import Theatre from "../model/theaterSchema";
import { ObjectId } from "mongoose";

import mongoose from "mongoose";
import Booking from "../model/bookingSchema";

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
        const moviebackpath = `https://image.tmdb.org/t/p/w500${req.body?.movieData?.backdrop_path}  `;
        const movieObj = new Movie({
          movieId: req.body?.movieData?.id,
          movieTitle: req.body?.movieData?.title,
          movieLanguage: req.body?.movieData?.original_language,
          movieOverview: req.body.movieData?.overview,
          moviePoster: movieUrl,
          movieBackgroundPoster: moviebackpath,
          movieReleaseDate: req.body.movieData?.release_date,
          theatreId: req.body?.theatreData?.theatreId,
        });

        const response = await movieObj.save();
        res.json({ message: "movie added successfully!", response });
      }
    } catch (error) {
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
      res.json({ message: "fecthMovieList backend error:", err });
    }
  },

  deleteMovie: async (req: Request, res: Response) => {
    try {
      const { movieId, theatreId } = req.query;
      const movie = await Movie.findOne({ movieId: movieId });
      if (movie?.theatreId.length === 1 && movie?.theatreId[0] === theatreId) {
        const movieDeleteResponse = await Movie.deleteOne({ movieId: movieId });

        return res.json({ message: "Movie deleted", movieDeleteResponse });
      } else {
        const movieDeleteResponse = await Movie.updateOne(
          { movieId: movieId },
          { $pull: { theatreId: theatreId } }
        );

        res.json({
          message: "movie deleted",
          status: 200,
          movieDeleteResponse,
        });
      }
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
        const resposne = await screenObj.save();
        res.json({
          message: "screen added successfully!",
          addedScreenObj: resposne,
        });
      }
    } catch (error) {
      res.json({ message: "fecthUserMovieList backend error:", error });
    }
  },

  fetchScreenList: async (req: Request, res: Response) => {
    try {
      const theatreId = req.params.id;
      const screenListData = await Screen.find({ theatreId: theatreId });

      res.json({ screenList: screenListData });
    } catch (err) {
      res.json({ message: "fetchScreenList backend error:", err });
    }
  },

  deleteScreen: async (req: Request, res: Response) => {
    try {
      const screenId = req.query.screenId;
      const screenDeleteResponse = await Screen.deleteOne({ _id: screenId });
      res.json({ message: "screen deleted", screenDeleteResponse });
    } catch (err) {
      res.json({ message: "deleteScreen backend error:", err });
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
      console.log(data);
      const movie = await Movie.findOne({ movieId: data.movieId });
      console.log(movie?.movieTitle);
      const response = await Screen.updateOne(
        { _id: data.screenId },
        {
          $set: {
            movieId: data.movieId,
            movieTitle: movie?.movieTitle,
            // selectedDates: data.selectedDates,
          },
        }
      );
      console.log("backendres",response);
      if (response.modifiedCount > 0) {
        res.json({ message: "moviescreenallocation successfully!", response });
      } else {
        res.json({ message: "moviescreenallocation failed!", response });
      }
    } catch (error) {
      res.json({ message: "moviescreenallocation backend error:", error });
    }
  },

  fetchDashInfo: async (req: Request, res: Response) => {
    try {
      const totalRevenue = await Booking.aggregate([
        { $match: { theatreId: req.params.id, bookingStatus: "confirmed" } },
        { $group: { _id: null, totalAmount: { $sum: "$totalAmount" } } },
      ]);
      const totalUsers = await Booking.aggregate([
        { $match: { theatreId: req.params.id, bookingStatus: "confirmed" } },
        { $group: { _id: "$userId" } },
        { $group: { _id: "$userId", totalUsers: { $sum: 1 } } },
      ]);

      const totalBookings = await Booking.countDocuments({
        theatreId: req.params.id,
      });
 res.json({ dashInfo: { totalRevenue, totalUsers, totalBookings } });
    } catch (error) {
      res.json({ message: "fetchDashInfo backend error:", error });
    }
  },

  fetchGraphInfo: async (req: Request, res: Response) => {
    try {
      const response = await Booking.aggregate([
         {$match:{theatreId:req.query.theatreId}},
        {
          $match: {
            $or: [{ bookingStatus: "confirmed" }, { bookingStatus: "cancelled" }]
          }
        },
        {
          $group: {
            _id: {
              month: { $month:"$createdAt"},
              status: "$bookingStatus"
            },
            count: { $sum: 1 }
          }
        },
        {
          $group: {
            _id: { month: "$_id.month" },
            data: {
              $push: { status: "$_id.status", count: "$count" }
            }
          }
        },
        {
          $project: {
            _id: 0,
            month:{ $toInt: "$_id.month" },
             data: 1
           
            },
           
        },
        {
          $sort: {
            month: 1
          }
        }
      ]);
    
      // console.log('response aggregation chart data', response);
      const result = Array.from({ length: 12 }, (_, index) => {
        const monthData = response.find(item => item.month === (index + 1));
        return monthData ? monthData : { data: null, month: index + 1 };
      })
      // .map((item,index) => ({
      //   data: item.data,
      //   month: item.data ? item.month : index+1
      // }));
  
  
  
  
  
      res.json({status:200,response})
    
    } catch (error) {
      res.json({ status: 500, message: `TheatreGraphInfo backend error:${error}`});
    }
  },
  fetchBookings: async (req: Request, res: Response) => {
    try {
      const page= parseInt(req.query.page as string);
      const limit= parseInt(req.query.limit as string);
      const totalBookingCount = await Booking.countDocuments({
        theatreId: req.query?.theatreId,
      })
      const totalPages= Math.ceil(totalBookingCount/limit);
      const skip = Math.abs((page - 1) * limit);

      const bookings = await Booking.find({ theatreId: req.query?.theatreId }).skip(skip).limit(limit).sort({ showDate: -1 });
      res.json({ bookings,totalPages });
    } catch (error) {
      res.json({ status: 500, message: `fetchBookings backend error:${error}` });
    }
  },

  fetchShowManagement: async (req: Request, res: Response) => {
    try {
      const shows = await Screen.find({ theatreId: req.query?.theatreId });
      res.json({ shows });
    } catch (error) {
      res.json({ status: 500, message: `fetchShowManagement backend error:${error}` });
    }
  },

  checkTheatreBlocked: async (req: Request, res: Response,Id: string) => {
    try {
      const response = await Theatre.findOne({ _id: Id });
      const blockStatus =response?.approvalStatus
      return blockStatus;
    } catch (error) {
      res.json({ message: "checkTheatreBlocked backend error:", error });
    }
  },



};

export default theatrecontroller;
