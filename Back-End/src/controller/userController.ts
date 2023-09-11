import { Request, Response } from "express";
import Movie from "../model/movieSchema";
const userController = {

    moviesFetchUser: async (req: Request, res: Response) => {
        try{
            const movieData = await Movie.find();
            res.json({movieList:movieData})
        }catch(err){
            res.json({message:"fecthUserMovieList backend error:",err});
        }
    }
}

export default userController;
;