import express from 'express'
import userController from '../controller/userController'



    const router = express.Router()


    router.get('/usermovielist',userController.moviesFetchUser)
    router.get("/findNumber",userController.findNumber)
    router.get("/moviename-search",userController.getMoviesBySearch)
    router.get("/fetchtheatrelocation",userController.getLocation)
    router.get("/fetchcolumnsandrows",userController.fetchcolumnsandrows)
    router.get("/moviepagedata",userController.moviepagedata)
    router.get("/fetchuserdata",userController.fetchUserData)
    router.get("/bookingmoviefetch",userController.fetchBookingMovie)
    router.post("/booking/stripeGateWay",userController.stripeGateWay)
    router.post("/booking/confirmation",userController.createBooking)

export default router