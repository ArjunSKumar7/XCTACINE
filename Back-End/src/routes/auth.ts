import express from "express";
import authController from "../controller/authcontroller";

const router = express.Router();

//user login and signup

router.post("/user/login", authController.userLogin);
router.post("/user/signup", authController.UserSignup);
router.post("/user/glogin", authController.usergLogin);
//theater login and signup

router.post("/theatre/login", authController.TheatreLogin);
router.post("/theatre/signup", authController.TheatreSignUp);


//admin login
router.post("/admin/login", authController.adminLogin);



export default router;
