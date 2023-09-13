import { Request, Response } from "express";
import Movie from "../model/movieSchema";
const userController = {

    moviesFetchUser: async (req: Request, res: Response) => {
        try{
            const page = parseInt(req.query.page as string);
            const limit = parseInt(req.query.limit as string);
            const skip = Math.abs((page-1)*limit);
            console.log(page, limit, skip)
            const movieListData=await Movie.find().skip(skip).limit(limit).sort({movieReleaseDate:-1})
            // console.log(movieListData)
            res.json({movieList:movieListData})
        }catch(err){
            res.json({message:"fecthUserMovieList backend error:",err});
        }
    }
}

export default userController;
;