import express from 'express'
import admincontroller from '../controller/adminController'
import { uploadBannerImage } from '../multer/multer'


    const router = express.Router()


    router.get("/userlist",admincontroller.userlistfetch)
    router.get("/theatrelist",admincontroller.theatrelistfetch)
    router.put("/theatrelist/approval",admincontroller.theatreAppoval)
    router.put("/userlist/approval",admincontroller.userApproval)
    router.post("/addlocation",admincontroller.addLocation)
    router.post("/addbanner",uploadBannerImage,admincontroller.addBanner)


export default router