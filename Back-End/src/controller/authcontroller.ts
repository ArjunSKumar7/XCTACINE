import { Request,Response } from "express"
import User from "../model/userSchema"
import bcrypt from "bcryptjs"


import {generateJWT,verifyjwt} from "../authService/JwtAuth"







const adminCredentials = {
    username:'admin',
    password:'admin123'

}


const authController = {

  
    userLogin:(req:Request,res:Response)=>{
req.body
    },
    
     UserSignup: async (req: Request, res: Response) => {
        try {
          console.log("sasdsdsdasdasd")
          const { Email, Name, Password}: { Email: string, Name: string, Password: string } = req.body;
        console.log("req.body",req.body)

          let hashedPassword:string = await bcrypt.hash(Password,10)


      
          const existingUser = await User.findOne({ Email:Email });
          if (existingUser) {
            return res.json({ userExist: true, message: "User already exists" });
          }
      
          // Creating a new user
          const newUserData:any = await User.create({
            Email,
            Name,
            Password:hashedPassword
          });

         


      const jwt = generateJWT(newUserData._id.toString());
      console.log("aaa",newUserData,jwt);
          res.json({ user: newUserData, created: true, token:jwt,status:"success" });
        } catch (error) {
          res.json({ error, created: false });
        }
    },
      
  
    TheaterLogin:(req:Request,res:Response)=>{

    },
   
    TheaterSignUp:(req:Request,res:Response)=>{

    },

    adminLogin:(req:Request,res:Response)=>{

    },


    

}
export default authController