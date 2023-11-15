import User from "../model/userSchema";
import Theatre from "../model/theaterSchema";
import Location from "../model/locationSchema";
import Banner from "../model/bannerSchema";
import Booking from "../model/bookingSchema";

import { Request, Response } from "express";

const admincontroller = {
  userlistfetch: async (req: Request, res: Response) => {
    try {
      const usersData = await User.find();

      res.json({ usersDetails: usersData });
    } catch (err) {
      res.json({ message: err });
    }
  },

  theatrelistfetch: async (req: Request, res: Response) => {
    try {
      const theatreData = await Theatre.find();

      res.json({ theatreDetails: theatreData });
    } catch (err) {
      res.json({ message: err });
    }
  },

  theatreAppoval: async (req: Request, res: Response) => {
    try {
      const approvalStatus = req.body;
      console.log("approvalStatusback",req.body);
      await Theatre.updateOne(
        { _id: approvalStatus.id },
        { $set: { approvalStatus: approvalStatus.status } }
      ).then(() => {
        res.json({
          status: 200,
          message: "Theatre Status Changed",
          approvalStatus: approvalStatus.status,
        });
      });
    } catch (err) {
      res.json({ status: 400, message: "error occured:" + err });
    }
  },

  userApproval: async (req: Request, res: Response) => {
    try {
      const approvalStatus = req.body;
      await User.updateOne(
        { _id: approvalStatus.id },
        { $set: { blockedStatus: approvalStatus.status } }
      ).then(() => {
        res.json({
          status: 200,
          message: "User Status Changed",
          blockedStatus: approvalStatus.status,
        });
      });
    } catch (err) {
      res.json({ status: 400, message: "error occured:" + err });
    }
  },

  addLocation: async (req: Request, res: Response) => {
    try {
      const locationToAdd = req?.body?.LocationField.toLowerCase();
      const locationWord = locationToAdd.replace(/\b\w/g, (match: string) =>
        match.toUpperCase()
      );
      const existingLocations = await Location.findOne({});
      if (existingLocations?.location.length) {
        if (existingLocations?.location.includes(locationWord)) {
          res.json({
            status: 400,
            message: "Location already exists",
          });
        } else {
          const response = await Location.findOneAndUpdate(
            {},
            {
              $addToSet: { location: locationWord },
            },
            { upsert: true, new: true }
          );

          res.status(200).json({
            status: 200,
            message: "Location added successfully",
          });
        }
      } else {
        const response = await Location.findOneAndUpdate(
          {},
          { $addToSet: { location: locationWord } }, // Use $addToSet to avoid duplicates
          { upsert: true, new: true } // Create a new document if it doesn't exist
        );
        res.status(201).json({
          status: 201,
          message: "Location added successfully!",
          response,
        });
      }
    } catch (error) {
      res.json({ status: 500, message: "addLocation backend error!", error });
    }
  },

  addBanner: async (req: Request, res: Response) => {
    try {
      const bannerPath = req.file?.path;
      const response = await Banner.create({
        bannerImage: bannerPath,
        bannerName: req.body.bannerName,
        bannerDescription: req.body.bannerDescription,
      });
      res.status(200).json({
        status: 200,
        message: "Banner added successfully!",
        response,
      });
    } catch (error) {
      res.json({
        status: 500,
        message: "addBanner backend error!"+error,
        
      })
    }
  },

  fetchBanner: async (req: Request, res: Response) => {
    try {
      const bannerData = await Banner.find();
      res.json({bannerData });
    } catch (err) {
      res.json({
        status: 500,
        message: "fetchBanner backend error!"+err,
        
      })
    }
  },

  deleteBanner: async (req: Request, res: Response) => {
    try {
      const bannerId = req.query.bannerId;
      const bannerDeleteResponse = await Banner.deleteOne({ _id: bannerId });
      res.json({ status: 200, message: "Banner deleted", bannerDeleteResponse });
    } catch (err) {
      res.json({ status: 500, message: `deleteBanner backend error:${err}`});
    }
  },
  bannerStateChange: async (req: Request, res: Response) => {
    try {
      const bannerState=req.body.state
      const response= await Banner.updateOne({_id:req.body.id},{$set:{bannerState:bannerState}}).then((response)=>{
        if(response.modifiedCount>0){
        res.json({ status: 200, message: "Banner state changed",bannerState: bannerState});
        }else{
          res.json({ status: 400, message: "Banner state not changed"});
        }
      });
     
      
    } catch (error) {
      res.json({ status: 500, message: `bannerStateChange backend error:${error}`});
    }
  },
  fetchLocation: async (req: Request, res: Response) => {
    try {
      const locationData = await Location.find({});
      res.json({ locationData });
    } catch (err) {
      res.json({ status: 500, message: `fetchLocation backend error:${err}`});
    }
  },

  deleteLocation: async (req: Request, res: Response) => {
    try {
      const response=await Location.deleteOne({_id:req.query.id})
      res.json({ status: 200, message: "Location deleted", response });
    } catch (error) {
      res.json({ status: 500, message: `deleteLocation backend error:${error}`});
    }
  },

  adminGraphInfo: async (req: Request, res: Response) => {
    try {
      const response1 = await Booking.aggregate([
         
        {
          $match: {
            $or: [{ bookingStatus: "confirmed" }, { bookingStatus: "cancelled" }]
          }
        },
        {
          $project: {
            month: { $month: '$bookedDate' }, // Extract the month from bookedDate
            userId: 1,
          },
        },
        {
          $group: {
            _id: {
              month: "$month",
            },
            userCount: {
              $addToSet: "$userId",
            },
          },
        },
        {
          $project: {
            _id: 0,
            month: "$_id.month",
            data: [{ usercount: { $size: "$userCount" } }]
           
            },
           
        },
        {
          $sort: {
            month: 1
          }
        },
        {
          $group:{
            _id: null,
            result: { $push: "$$ROOT" }
          }
        },
        {
          $project:{
            _id: 0,
            result: 1,
          }
        }

      ]);
      const response2 = await Theatre.aggregate([
         
       
        {
          $group: {
            _id: {
              month: { $month: "$createdAt" },
            },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
      month: "$_id.month",
      data: [{ theatrecount: "$count" }],
            },
           
        },
       
        {
          $group:{
            _id: null,
            result: { $push: "$$ROOT" },
          }
        },
        {
          $project:{
            _id: 0,
            result: 1,
          }
        }

      ]);
     
  
  
  
  
      res.json({status:200,userData:response1,theatreData:response2})
    
    } catch (error) {
      res.json({ status: 500, message: `adminGraphInfo backend error:${error}`});
    }
  },

  fetchdashboxinfo:async (req: Request, res: Response) => {
    try {
      const usersCount= await User.countDocuments({})
      const theatresCount =await Theatre.countDocuments({})
      res.json({status:200,usersCount,theatresCount})
      
    } catch (error) {
      res.json({ status: 500, message: `fetchdashboxinfo backend error:${error}`});
    }

  },



};

export default admincontroller;
