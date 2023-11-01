import User from "../model/userSchema";
import Theatre from "../model/theaterSchema";
import Location from "../model/locationSchema";
import Banner from "../model/bannerSchema";

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
};

export default admincontroller;
