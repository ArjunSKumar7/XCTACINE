import { Request, Response } from "express";
import User from "../model/userSchema";
import Admin from "../model/adminSchema";
import Theatre from "../model/theaterSchema";
import bcrypt from "bcryptjs";

import { generateJWT, verifyjwt } from "../authService/JwtAuth";

const authController = {
  userLogin: async (req: Request, res: Response) => {
   
    try {
      const { Email, Password }: { Email: string; Password: string } = req.body;

      const userData = await User.findOne({ Email: Email });
      if (!userData) {
        res.json({
          created: false,
          status: "user not found/exist",
        });
      }



      if (userData) {
        if(userData.blockedStatus){
          res.json({
            created: false,
            status: "user blocked",
          });
        }
        if (userData.Password) {
          const validPassword = await bcrypt.compare(
            Password,
            userData?.Password
          );
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
              token: "",
              status: "password not matched",
            });
          }
        }
      }
    } catch (err: any) {
      res.json({
        status: "failed",
        token: "",
        message: err.message,
      });
    }
  },

  UserSignup: async (req: Request, res: Response) => {
    try {
      const {
        Email,
        Name,
        Password,
        Mobile,
      }: { Email: string; Name: string; Password: string,Mobile:string } = req.body;

      let hashedPassword: string = await bcrypt.hash(Password, 10);

      const existingUser = await User.findOne({ Email: Email });
      if (existingUser) {
        return res.json({ userExist: true,token: "", message: "User already exists" });
      }
      else{

      // Creating a new user
      const newUserData: any = await User.create({
        Email,
        Name,
        Password: hashedPassword,
        Mobile,
      });
      delete newUserData._doc.Password;

      const jwt = generateJWT(newUserData._id.toString());

      res.json({
        user: newUserData,
        created: true,
        token: jwt,
        status: "success",
      });
    } }catch (error) {
      res.json({ user:"",status: "failed",token: "", message: "something went wrong   : ", error });
    }
  },

  TheatreLogin: async (req: Request, res: Response) => {
    try {
      const { Email, Password }: { Email: string; Password: string } = req.body;

      const theatreData = await Theatre.findOne({ Email: Email });
      
      if (!theatreData) {
        return res.json({
          created: false,
          status: "user not found/exist",
        });
      }

      if (theatreData) {
        const validPassword = await bcrypt.compare(
          Password,
          theatreData.Password
        );
        if (validPassword) {
          const { Password, ...theatreWithoutPassword } = theatreData.toObject(); // Exclude Password field
          const token = generateJWT(theatreData._id.toString());
          res.json({
            theatre: theatreWithoutPassword,
            created: true,
            token: token,
            status: "success",
          });
        } else {
          res.json({
            created: false,
            token: "",
            status: "password not matched",
          });
        }
      }
    } catch (err: any) {
      return res.json({
        status: "failed",
        token: "",
        message: err.message,
      });
    }
  },

  TheatreSignUp: async (req: Request, res: Response) => {
    console.log("req", req.body);
    try {
      const {
        Email,
        Name,
        Location,
        Password,
      }: { Email: string; Name: string; Location: string; Password: string } = req.body;

      let hashedPassword: string = await bcrypt.hash(Password, 10);

      const existingtheatre = await Theatre.findOne({ Email: Email });
      if (existingtheatre) {
        return res.json({
          theatreExist: true,
          message: "Theatre already exists",
        });
      }
      else{

      const newTheatreData: any = await Theatre.create({
        Email,
        Name,
        Location,
        Password: hashedPassword,
      });
      delete newTheatreData._doc.Password;

      const jwt = generateJWT(newTheatreData._id.toString());

      res.json({
        theatre: newTheatreData,
        created: true,
        token: jwt,
        status: "success",
      });
    } }catch (error) {
      res.json({ status: "failed", token: "", message: "password not matched" });
    }
  },

  adminLogin: async (req: Request, res: Response) => {
    try {
      const { Email, Password }: { Email: string; Password: string } = req.body;
      const adminFile = await Admin.findOne({ Email: Email });

      if (adminFile) {
        bcrypt.compare(Password, adminFile.Password, function (err, result) {
          if (result === true) {
            //generate jwt and send to client
            const admin_id = adminFile._id.toString();
            const jwt = generateJWT(admin_id);

            res.json({
              admin: adminFile,
              created: true,
              token: jwt,
              status: "success",
            });
          } else {
            return (
              res
                // .status(401)
                .json({
                  login_status: false,
                  token: "",
                  message: "invalid admin credentials",
                })
            );
          }
        });
      } else {
        return res.json({
          login_status: false,
          token: "",
          message: "invalid admin username or password",
        });
      }
    } catch (error) {
      console.log("backendloginerror", error);
    }
  },

  usergLogin: async (req: Request, res: Response) => {
   
    try {
      const { Email, Name }: { Email: string; Name: string } = req.body;
      const userFile = await User.findOne({ Email: Email });
      if (userFile) {
        const user_id = userFile._id.toString();
        const jwt = generateJWT(user_id);
        res.json({
          user: userFile,
          created: true,
          token: jwt,
          status: "success",
        });
      } else {
        const newGUserData = await User.create({
          Email,
          Name,
        });
       
        const jwt = generateJWT(newGUserData._id.toString());
        res.json({
          user: newGUserData,
          created: true,
          token: jwt,
          status: "success",
        });
      }
    } catch (error) {
      res.json({ error,loginStatus: false, message: "login failed" });
    }
  },
};
export default authController;
