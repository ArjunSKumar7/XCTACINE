import express from 'express'

import theatrecontoller from '../controller/theatreController'

    const router = express.Router()


    router.post('/addmovie',theatrecontoller.addMovie)
    router.get('/fetchmovielist/:id',theatrecontoller.fetchMovieList)
    router.delete("/deletemovie",theatrecontoller.deleteMovie)
    router.post("/addscreen",theatrecontoller.addScreen)
    router.get("/fetchscreenlist/:id",theatrecontoller.fetchScreenList)
    router.get ("/fetchlocation",theatrecontoller.fetchLocation)
    router.post("/moviescreenallocation",theatrecontoller.moviescreenallocation)
    router.delete("/deletescreen",theatrecontoller.deleteScreen)
    router.get("/fetchdashinfo/:id",theatrecontoller.fetchDashInfo)
    router.get ("/fetchGraphInfo",theatrecontoller.fetchGraphInfo)
    router.get ("/fetchbookings",theatrecontoller.fetchBookings)
    router.get ("/fetchshowmanagement",theatrecontoller.fetchShowManagement)


export default router