import User from "../model/userSchema";
import Theatre from "../model/theaterSchema";

import { Request, Response } from "express";

const admincontroller = {

userlistfetch: async (req: Request, res: Response) => {
    console.log("aaa")
    try{
        
        const usersData = await User.find();
      
        res.json({usersDetails:usersData})
    }catch(err){
        res.json({message:err});
    }
},

theatrelistfetch: async (req: Request, res: Response) => {
   
    try{
       
        const theatreData = await Theatre.find();
    
        
        res.json({theatreDetails:theatreData})
    }catch(err){
        res.json({message:err});
    }
},


theatreAppoval: async (req: Request, res: Response) => {
    console.log("theatreappoval",req.body)
    try {
        const approvalStatus = req.body
        console.log("theatreappovalsatuss",approvalStatus)
        await Theatre.updateOne({ _id: approvalStatus.id }, { $set: { approvalStatus: approvalStatus.status } }).then(()=>{
            res.json({approvalStatus:approvalStatus.status})
        })
    }
    catch (err) {
        console.log("theatreAppoval backend error:", err)
    }
},



userApproval : async (req: Request, res: Response) => {
    console.log("userappoval",req.body)
    try{
        const approvalStatus = req.body
        await User.updateOne({_id:approvalStatus.id},{$set:{blockedStatus:approvalStatus.status}}).then(()=>{
            console.log("userAppovalresponse",approvalStatus.status)
            res.json({blockedStatus:approvalStatus.status})
        })

    }
    catch(err){
        console.log("userAppoval backend error:", err)
    }
}


    
}


export default admincontroller;