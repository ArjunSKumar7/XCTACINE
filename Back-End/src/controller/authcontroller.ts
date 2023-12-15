import { Request, Response } from "express";
import User from "../model/userSchema";
import Admin from "../model/adminSchema";
import Theatre from "../model/theaterSchema";
import bcrypt from "bcryptjs";

import { generateJWT, verifyjwt } from "../authService/JwtAuth";
const userRole = process.env.USER_ROLE as string;
const adminRole = process.env.ADMIN_ROLE as string;
const theatreRole = process.env.THEATER_ROLE as string;
const authController = {
  userLogin: async (req: Request, res: Response) => {
    try {
      const { Email, Password }: { Email: string; Password: string } = req.body;
      const userData = await User.findOne({ Email: Email });
  
      if (!userData) {
        res.json({
          status: 400,
          created: false,
          message: "user not found/exist",
        });
      } else if (userData.blockedStatus) {
        res.json({
          status: 400,
          created: false,
          message: "user blocked",
        });
      } else if (userData.Password) {
        const validPassword = await bcrypt.compare(Password, userData.Password);
        
        if (validPassword) {
          const token = generateJWT(userData._id.toString(), userRole);
          res.json({
            user: userData,
            created: true,
            token: token,
            status: 200,
            message: "success",
          });
        } else {
          res.json({
            status: 400,
            created: false,
            token: "",
            message: "password not matched",
          });
        }
      }
    } catch (err: any) {
      res.json({
        message: `something went wrong: ${err}`,
        status: 500,
        token: "",
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
      }: { Email: string; Name: string; Password: string; Mobile: string } =
        req.body;
      let hashedPassword: string = await bcrypt.hash(Password, 10);
      const existingUser = await User.findOne({ Email: Email });
      if (existingUser) {
        return res.json({ userExist: true, message: "User already exists" });
      } else {
        // Creating a new user
        const newUserData: any = await User.create({
          Email,
          Name,
          Password: hashedPassword,
          Mobile,
        });
        delete newUserData._doc.Password;
        const jwt = generateJWT(newUserData._id.toString(),userRole);
        res.json({
          status: 200,
          user: newUserData,
          created: true,
          token: jwt,
          message: "success! User LoggedIn",
        });
      }
    } catch (error) {
      res.json({
        user: "",
        message: `something went wrong: ${error}`,
        token: "",
        status: 400,
      });
    }
  },

  TheatreLogin: async (req: Request, res: Response) => {
    try {
      const { Email, Password }: { Email: string; Password: string } = req.body;

      const theatreData = await Theatre.findOne({ Email: Email });
      console.log("theatreDta",theatreData);

      if (!theatreData) {
        return res.json({
          status: 400,
          created: false,
          messsage: "Theatre not found/exist",
        });
      }
      if(theatreData.approvalStatus){
        return res.json({
          status: 400,
          created: false,
          messsage: "Theatre blocked",
        });
      }

      if (theatreData) {
        const validPassword = await bcrypt.compare(
          Password,
          theatreData.Password
        );
        if (validPassword) {
          const { Password, ...theatreWithoutPassword } =
            theatreData.toObject(); // Exclude Password field
          const token = generateJWT(theatreData._id.toString(),theatreRole);
          res.status(200).json({
            status: 200,
            theatre: theatreWithoutPassword,
            created: true,
            token: token,
            message: "Success Theatre LoggedIn",
          });
        } else {
          res.json({
            status: 400,
            created: false,
            token: "",
            message: "password not matched",
          });
        }
      }
    } catch (err: any) {
      return res.json({
        status: 400,
        token: "",
        message: `something went wrong: ${err}`,
      });
    }
  },

  TheatreSignUp: async (req: Request, res: Response) => {
    try {
      const {
        Email,
        Name,
        Location,
        Password,
      }: { Email: string; Name: string; Location: string; Password: string } =
        req.body;

      let hashedPassword: string = await bcrypt.hash(Password, 10);

      const existingtheatre = await Theatre.findOne({ Email: Email });
      if (existingtheatre) {
        return res.json({
          status: 400,
          theatreExist: true,
          message: "Theatre already exists",
        });
      } else {
        const newTheatreData: any = await Theatre.create({
          Email,
          Name,
          Location,
          Password: hashedPassword,
        });
        delete newTheatreData._doc.Password;

        const jwt = generateJWT(newTheatreData._id.toString(),theatreRole);

        res.json({
          status: 200,
          theatre: newTheatreData,
          created: true,
          token: jwt,
          message: "success! Theatre LoggedIn",
        });
      }
    } catch (error) {
      res.json({
        status: 400,
        token: "",
        message: "password not matched",
      });
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
            const jwt = generateJWT(admin_id,adminRole);

            res.json({
              admin: adminFile,
              created: true,
              token: jwt,
              status: 200,
              message: "success! Admin LoggedIn",
            });
          } else {
            return res.json({
              status: 400,
              login_status: false,
              token: "",
              message: "invalid admin credentials",
            });
          }
        });
      } else {
        return res.json({
          status: 400,
          login_status: false,
          token: "",
          message: "invalid admin username or password",
        });
      }
    } catch (error) {
      res.json({
        status: 400,
        loginStatus: false,
        message: `something went wrong: ${error}`,
      });
    }
  },

  usergLogin: async (req: Request, res: Response) => {
    try {
      const { Email, Name }: { Email: string; Name: string } = req.body;
      const userFile = await User.findOne({ Email: Email });
      if (userFile) {
        const user_id = userFile._id.toString();
        const jwt = generateJWT(user_id,userRole);
        res.json({
          status: 200,
          user: userFile,
          created: true,
          token: jwt,
          message: "success ! User LoggedIn",
        });
      } else {
        const defaultMobile = 1111111111;
        const newGUserData = await User.create({
          Email,
          Name,
          Mobile: defaultMobile,
        });

        const jwt = generateJWT(newGUserData._id.toString(),userRole);
        res.json({
          status: 200,
          user: newGUserData,
          created: true,
          token: jwt,
          message: "success ! User LoggedIn",
        });
      }
    } catch (error) {
      res.json({
        status: 400,
        loginStatus: false,
        message: `something went wrong: ${error}`,
      });
    }
  },
};
export default authController;
