import { Request, Response } from "express";
import Movie from "../model/movieSchema";



const theatrecontroller = {

  addMovie: async (req: Request, res: Response) => {
    try {

      console.log("addMovie",req.body);

      const  movieExist = await Movie.findOne({movieTitle: req.body?.movieData?.title})
      if(movieExist){
        res.json({message:"movie already exist"})
      }
      else{
      const movieUrl =`https://image.tmdb.org/t/p/w500${req.body?.movieData?.poster_path}  `
      const movieObj = new Movie({
        movieId : req.body?.movieData?.id,
        movieTitle: req.body?.movieData?.title,
        movieLanguage: req.body?.movieData?. original_language,
        movieOverview: req.body.movieData?.overview,
        moviePoster: movieUrl,
        movieReleaseDate: req.body.movieData?.release_date,
        theatreId: req.body?.theatreData?.theatreId,
        theatreName: req.body.theatreData?.theatreName
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
       const theatreId=req.params.id
      console.log("theatreId",theatreId)
        const movieListData=await Movie.find({theatreId:theatreId})
      
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
