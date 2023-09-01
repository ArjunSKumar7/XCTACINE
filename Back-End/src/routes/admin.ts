import express from 'express'
import admincontroller from '../controller/adminController'


    const router = express.Router()


    router.get("/userlist",admincontroller.userlistfetch)
    router.get("/theatrelist",admincontroller.theatrelistfetch)


export default router