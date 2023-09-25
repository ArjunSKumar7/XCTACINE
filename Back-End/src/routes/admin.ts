import express from 'express'
import admincontroller from '../controller/adminController'


    const router = express.Router()


    router.get("/userlist",admincontroller.userlistfetch)
    router.get("/theatrelist",admincontroller.theatrelistfetch)
    router.put("/theatrelist/approval",admincontroller.theatreAppoval)
    router.put("/userlist/approval",admincontroller.userApproval)
    router.post("/addlocation",admincontroller.addLocation)


export default router