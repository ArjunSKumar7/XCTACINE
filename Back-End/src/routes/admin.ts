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
    router.get("/fetchbanner",admincontroller.fetchBanner)
    router.delete("/deletebanner",admincontroller.deleteBanner)
    router.patch("/bannerstatechange",admincontroller.bannerStateChange)
    router.get("/fetchlocation",admincontroller.fetchLocation)
    router.delete("/deletelocation",admincontroller.deleteLocation)
    router.get("/fetchgraphinfo",admincontroller.adminGraphInfo)
    router.get("/fetchdashboxinfo",admincontroller.fetchdashboxinfo)


export default router