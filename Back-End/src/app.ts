import express, { Application, Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import http from "http";
// import mongoose from 'mongoose';
import cookieParser from "cookie-parser";
import db from "./config/database";
import { configKeys } from "./config/keys";
import userRoute from "./routes/user";
import authRoute from "./routes/auth";
import adminRoute from "./routes/admin";
import theatreRoute from "./routes/theatre";
import guestRoute from "./routes/guest"
import serverConfig from "./config/serverConfig";
import authMiddlewares from "./middlewares/authMiddlewares";
import accessCheckMiddleware from "./middlewares/accessCheckMiddleware";
import {v2 as cloudinary} from 'cloudinary';
const userRole = process.env.USER_ROLE as string;
const adminRole = process.env.ADMIN_ROLE as string;
const theatreRole = process.env.THEATER_ROLE as string;

const app: Application = express();
const server = http.createServer(app);

app.use(morgan("dev"));

const corsOptions = {
  // origin: "http://localhost:5173", // Replace this with your frontend's domain
  origin: ["https://xctacine.online"], // For production 
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Enable sending cookies from the frontend to the backend
};





app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Custom error handling middleware



db.connect();

          


          

          
cloudinary.config({ 
  cloud_name: 'xctacine', 
  api_key: '794227963189558', 
  api_secret: 'Tx1xRWAb1iFHUGDK731SRCilxMA' 
});

//routes

app.use("/api/auth", authRoute);
app.use("/api/guest",guestRoute);
app.use("/api/user", authMiddlewares(userRole),accessCheckMiddleware.checkUserBlock,userRoute);
app.use("/api/theatre",authMiddlewares(theatreRole),accessCheckMiddleware.checkTheatreBlock, theatreRoute);
app.use("/api/admin",authMiddlewares(adminRole), adminRoute);

serverConfig(server);
