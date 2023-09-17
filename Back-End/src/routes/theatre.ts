import express from 'express'

import theatrecontoller from '../controller/theatreController'

    const router = express.Router()


    router.post('/addmovie',theatrecontoller.addMovie)
    router.get('/fetchmovielist/:id',theatrecontoller.fetchMovieList)
    router.delete("/deletemovie/:id",theatrecontoller.deleteMovie)
    router.post("/addscreen",theatrecontoller.addScreen)


export default router