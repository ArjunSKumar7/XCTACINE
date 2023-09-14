import { Request, Response } from "express";
import Movie from "../model/movieSchema";
const userController = {

    moviesFetchUser: async (req: Request, res: Response) => {
        try{
        console.log("Aaaaaaa",req.query)
            const page = parseInt(req.query.page as string);
            const limit = parseInt(req.query.limit as string);
            const skip = Math.abs((page-1)*limit);
            console.log(page, limit, skip)
            const totalMovieCount=await Movie.find().countDocuments();
            const totalPages=Math.ceil(totalMovieCount/limit);
            console.log(totalPages)
            const movieListData=await Movie.find().skip(skip).limit(limit).sort({movieReleaseDate:-1})
            // console.log(movieListData)
            res.json({movieList:movieListData,totalPages:totalPages})
        }catch(err){
            res.json({message:"fecthUserMovieList backend error:",err});
        }
    }
}

export default userController;
;