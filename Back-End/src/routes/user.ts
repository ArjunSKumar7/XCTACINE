import express from 'express'
import userController from '../controller/userController'
import {uploadProfilePic} from "../multer/multer"



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
    router.put("/editprofile",uploadProfilePic,userController.editProfile)
    router.get ("/fetchuserbookings",userController.fetchUserBookings)
    router.post("/fetchbookedseats",userController.fetchBookedSeats)
    router.patch("/profilepicedit/:id",uploadProfilePic,userController.editProfilePic)
    router.get("/fetchBanners",userController.fetchBanners)

export default router