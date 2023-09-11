import express from 'express'

import theatrecontoller from '../controller/theatreController'

    const router = express.Router()


    router.post('/addmovie',theatrecontoller.addMovie)
    router.get('/fetchmovielist',theatrecontoller.fetchMovieList)
    router.delete("/deletemovie/:id",theatrecontoller.deleteMovie)


export default router