import express from 'express'
import authController from '../controller/authcontroller'



    const router = express.Router()


//user login and signup
    
    router.post('/user/login',authController.userLogin)
    router.post('/signup',authController.UserSignup)
//theater login and signup
   
    router.post('/theater/login',authController.TheaterLogin)
    router.post('/theater/signup',authController.TheaterSignUp)
//admin login
    router.post('/admin/login',authController.adminLogin)





export default router