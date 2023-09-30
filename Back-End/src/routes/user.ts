import express from 'express'
import userController from '../controller/userController'



    const router = express.Router()


    router.get('/usermovielist',userController.moviesFetchUser)
    router.get("/findNumber",userController.findNumber)
    router.get("/moviename-search",userController.getMoviesBySearch)
    router.get("/fetchtheatrelocation",userController.getLocation)
    router.get("/fetchcolumnsandrows",userController.fetchcolumnsandrows)


export default router