import { Request, Response } from "express";
import Movie from "../model/movieSchema";
import User from "../model/userSchema";
import Location from "../model/locationSchema";
import Theatre from "../model/theaterSchema";

const guestController={

    guestMovieList:async(req:Request,res:Response)=>{
        try {
            const page = parseInt(req.query.page as string);
            const limit = parseInt(req.query.limit as string);
            const locationValue = req.query.locationValue;
            const skip = Math.abs((page - 1) * limit);
            const totalMovieCount = await Movie.find().countDocuments();
            const totalPages = Math.ceil(totalMovieCount / limit);
    
            if (locationValue === "") {
              const movieListData = await Movie.find()
                .skip(skip)
                .limit(limit)
                .sort({ movieReleaseDate: -1 });
              res.json({ movieList: movieListData, totalPages: totalPages });
            } else {
              const theatreAggregation = await Theatre.aggregate([
                {
                  $match: { Location: locationValue },
                },
                {
                  $project: { _id: { $toString: "$_id" } },
                },
                {
                  $lookup: {
                    from: "movieschemas", // Use the correct collection name
                    localField: "_id",
                    foreignField: "theatreId",
                    as: "locationBasedMovieList",
                  },
                },
                {
                  $unwind: "$locationBasedMovieList",
                },
                {
                  $skip: skip,
                },
                {
                  $limit: limit,
                },
                {
                  $sort: { "locationBasedMovieList.movieReleaseDate": -1 },
                },
              ]);
              //maping so that i get it in exact format as no location selected response
              const movieList = theatreAggregation.map(
                (theatre) => theatre.locationBasedMovieList
              );
              res.json({ movieList: movieList, totalPages: totalPages });
            }
          } catch (err) {
            res.json({ message: "fecthUserMovieList backend error:", err });
          }
        
    }

}

export default guestController