import express from 'express'
import userController from '../controller/userController'



    const router = express.Router()


    router.get('/usermovielist',userController.moviesFetchUser)
    router.get("/findNumber",userController.findNumber)
    router.get("/moviename-search",userController.getMoviesBySearch)



export default router