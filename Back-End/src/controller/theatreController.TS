import { Request, Response } from "express";
import Movie from "../model/movieSchema";



const theatrecontroller = {

  addMovie: async (req: Request, res: Response) => {
    try {

      console.log("addMovie",req.body);

      const  movieExist = await Movie.findOne({movieTitle: req.body.title})
      if(movieExist){
        res.json({message:"movie already exist"})
      }
      else{
      const movieUrl =`https://image.tmdb.org/t/p/w500${req.body?.poster_path}  `
      const movieObj = new Movie({
        movieId : req.body.id,
        movieTitle: req.body.title,
        movieLanguage: req.body.original_language,
        movieOverview: req.body.overview,
        moviePoster: movieUrl,
        movieReleaseDate: req.body.release_date,
        theatreId: req.body.theatreId,
        theatreName: req.body.theatreName
      });
      await movieObj.save().then((resposne)=>{
       
       res.json({message:"movie added successfully!",resposne})
      })
      
    }
      
    } catch (error) {
      console.log("addmovie backend error:", error);
     return res.json({ message: "addmovie backend error:", error });
    }
  },


  fetchMovieList: async (req: Request, res: Response) => {
      try{
        const movieListData=await Movie.find()
      
        res.json({movieList:movieListData})
      }
      catch(err){
        console.log("fecthMovieList backend error:", err);
      res.json({message:"fecthMovieList backend error:",err});
      }
  },

  deleteMovie: async (req: Request, res: Response) => {
    try{
      const id = req.params.id
      const movieData = await Movie.deleteOne({movieId:id});
      res.json({message:"movie deleted",movieData})
    }
    catch(err){
      res.json({message:"fecthUserMovieList backend error:",err});
    }
  }





};

export default theatrecontroller;
