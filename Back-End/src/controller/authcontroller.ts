import { Request, Response } from "express";
import User from "../model/userSchema";
import Theatre from "../model/theaterSchema";
import bcrypt from "bcryptjs";

import { generateJWT, verifyjwt } from "../authService/JwtAuth";

const adminCredentials = {
  username: "admin",
  password: "admin123",
};

const authController = {
  userLogin: async (req: Request, res: Response) => {
    try {
      console.log("loginbody", req.body);
      const { Email, Password }: { Email: string; Password: string } = req.body;

      const userData = await User.findOne({ Email: Email });
      if (!userData) {
        return res.json({
          created: false,
          status: "user not found/exist",
        });
      }

      if (userData) {
        const validPassword = await bcrypt.compare(Password, userData.Password);
        if (validPassword) {
          const token = generateJWT(userData._id.toString());
          res.json({
            user: userData,
            created: true,
            token: token,
            status: "success",
          });
        } else {
          res.json({
            created: false,
            status: "password not matched",
          });
        }
      }
    } catch (err: any) {
      return res.json({
        status: "failed",
        message: err.message,
      });
    }
  },

  UserSignup: async (req: Request, res: Response) => {
    try {
      // console.log("sasdsdsdasdasd")
      const {
        Email,
        Name,
        Password,
      }: { Email: string; Name: string; Password: string } = req.body;

      let hashedPassword: string = await bcrypt.hash(Password, 10);

      const existingUser = await User.findOne({ Email: Email });
      if (existingUser) {
        return res.json({ userExist: true, message: "User already exists" });
      }

      // Creating a new user
      const newUserData: any = await User.create({
        Email,
        Name,
        Password: hashedPassword,
      });
      delete newUserData._doc.Password;

      const jwt = generateJWT(newUserData._id.toString());

      res.json({
        user: newUserData,
        created: true,
        token: jwt,
        status: "success",
      });
    } catch (error) {
      res.json({ status: "failed", message: "password not matched" });
    }
  },

  TheatreLogin: (req: Request, res: Response) => {},

  TheatreSignUp: async(req: Request, res: Response) => {

    try{
    const {
      Email,
      Name,
      Password,
    }: { Email: string; Name: string; Password: string } = req.body;

    let hashedPassword: string = await bcrypt.hash(Password, 10);

    const existingtheatre = await User.findOne({ Email: Email });
      if (existingtheatre) {
        return res.json({ theatreExist: true, message: "Theatre already exists" });
      }

      const newTheatreData: any = await Theatre.create({
        Email,
        Name,
        Password: hashedPassword,
      });
      delete newTheatreData._doc.Password;

      const jwt = generateJWT(newTheatreData._id.toString());
      
      res.json({
        user: newTheatreData,
        created: true,
        token: jwt,
        status: "success",
      });
    }
    catch (error) {
      res.json({ status: "failed", message: "password not matched" });
    }
   

  },

  adminLogin: (req: Request, res: Response) => {},
};
export default authController;
