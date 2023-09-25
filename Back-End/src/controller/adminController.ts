import User from "../model/userSchema";
import Theatre from "../model/theaterSchema";
import Location from "../model/locationSchema";

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
      await Theatre.updateOne(
        { _id: approvalStatus.id },
        { $set: { approvalStatus: approvalStatus.status } }
      ).then(() => {
        res.json({ approvalStatus: approvalStatus.status });
      });
    } catch (err) {
      console.log("theatreAppoval backend error:", err);
    }
  },

  userApproval: async (req: Request, res: Response) => {
    try {
      const approvalStatus = req.body;
      await User.updateOne(
        { _id: approvalStatus.id },
        { $set: { blockedStatus: approvalStatus.status } }
      ).then(() => {
        res.json({ blockedStatus: approvalStatus.status });
      });
    } catch (err) {
      console.log("userAppoval backend error:", err);
    }
  },

  addLocation: async (req: Request, res: Response) => {
    console.log("addLocation", req.body);
    try {
      const locationToAdd = req?.body?.LocationField.toLowerCase();

      const locationWord = locationToAdd.replace(/\b\w/g, (match: string) =>
        match.toUpperCase()
      );
      const existingLocations = await Location.findOne({});
      console.log("existingLocations", existingLocations);
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
      console.log("addLocation backend error:", error);
      res.json({ status: 500, message: "addLocation backend error!", error });
    }
  },
};

export default admincontroller;
