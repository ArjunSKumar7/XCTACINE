import express from 'express'
import userController from '../controller/userController'



    const router = express.Router()


    router.get('/usermovielist',userController.moviesFetchUser)



export default router