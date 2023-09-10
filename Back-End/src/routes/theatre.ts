import express from 'express'

import theatrecontoller from '../controller/theatreController'

    const router = express.Router()


    router.post('/addmovie',theatrecontoller.addMovie)
    router.get('/fetchmovielist',theatrecontoller.fetchMovieList)


export default router