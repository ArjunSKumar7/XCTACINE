import User from "../model/userSchema";
import Theatre from "../model/theaterSchema";

import { Request, Response } from "express";

const admincontroller = {

userlistfetch: async (req: Request, res: Response) => {
    console.log("aaa")
    try{
        console.log("inside userlistfetch");
        const usersData = await User.find();
        console.log('db response data',usersData)
        res.json({usersDetails:usersData})
    }catch(err){
        res.json({message:err});
    }
},

theatrelistfetch: async (req: Request, res: Response) => {
    console.log("thetrebackend")
    try{
       
        const theatreData = await Theatre.find();
    
        
        res.json({theatreDetails:theatreData})
    }catch(err){
        res.json({message:err});
    }
}


    
}


export default admincontroller;