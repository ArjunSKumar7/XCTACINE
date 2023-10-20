import { Request, Response } from "express";
import Movie from "../model/movieSchema";
import User from "../model/userSchema";
import Location from "../model/locationSchema";
import Theatre from "../model/theaterSchema";
import Booking from "../model/bookingSchema";
import * as uuid from 'uuid';
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const userController = {
  moviesFetchUser: async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string);
      const limit = parseInt(req.query.limit as string);
      const locationValue = req.query.locationValue;
      const skip = Math.abs((page - 1) * limit);
      const totalMovieCount = await Movie.find().countDocuments();
      const totalPages = Math.ceil(totalMovieCount / limit);
      
      if (locationValue === "") {
        const movieListData = await Movie.find()
          .skip(skip)
          .limit(limit)
          .sort({ movieReleaseDate: -1 });
        res.json({ movieList: movieListData, totalPages: totalPages });
      } else {
        const theatreAggregation = await Theatre.aggregate([
          {
            $match: { Location: locationValue }
          },
          {
            $project: { _id: { $toString: "$_id" } }
          },
          {
            $lookup: {
              from: "movieschemas", // Use the correct collection name
              localField: "_id",
              foreignField: "theatreId",
              as: "locationBasedMovieList"
            }
          },
          {
            $unwind: "$locationBasedMovieList"
          },
          {
            $skip: skip
          },
          {
            $limit: limit
          },
          {
            $sort: { "locationBasedMovieList.movieReleaseDate": -1 }
          }
        ]);
     //maping so that i get it in exact format as no location selected response
        const movieList = theatreAggregation.map((theatre) => theatre.locationBasedMovieList);
        res.json({ movieList: movieList, totalPages: totalPages });
      }
    } catch (err) {
      res.json({ message: "fecthUserMovieList backend error:", err });
    }
  },
  

  findNumber: async (req: Request, res: Response) => {
    try {
      const phoneNumber = req.query.number;
      const userValid = await User.findOne({ Mobile: phoneNumber });
      if (userValid?.Name) {
        res.json({ userExist: true, message: "User already exists" });
      } else {
        res.json({ userExist: false, message: "User does not exist" });
      }
    } catch (error) {
      res.json({ message: "findNumber backend error:", error });
    }
  },

  getMoviesBySearch: async (req: Request, res: Response) => {
    try {
      const searchText = req.query.search;
      const search = new RegExp(searchText as string, "i");
      const movieSearchData = await Movie.find({ movieTitle: search })
        .limit(8)
        .sort({ movieReleaseDate: -1 });
      res.json({ movieList: movieSearchData });
    } catch (err) {
      res.json({ message: "fecthMovieList backend error:", err });
    }
  },

  getLocation: async (req: Request, res: Response) => {
    try {
      const locationData = await Location.find({});
      const locationList = locationData[0].location;
      res.json({ locationList: locationList });
    } catch (err) {
      res.json({ message: "fecthMovieList backend error:", err });
    }
  },

  fetchcolumnsandrows: async (req: Request, res: Response) => {
    
  },



  moviepagedata: async (req: Request, res: Response) => {
    try {
      const movieId=req.query.movieId
      const location=req.query.location
     
      const movieDetails=await Movie.findOne({movieId:movieId})

      const moviepageaggregation = await Theatre.aggregate([
        {$match:{Location:location,blockedStatus:false}},
        {$addFields:{_id:{$toString:"$_id"}}},
        {$lookup:{from:"screenschemas",localField:"_id",foreignField:"theatreId",as:"screen"}},
        {$unwind:{path: "$screen",
        includeArrayIndex: "string",}},
        {$match:{"screen.movieId":movieId}},
        {
          $project:
           
              {
                Email: false,
                Password: false,
               
                __v: false,
                string: false,
                screen: {
                  theatreId: false,
                  theatreName: false,
                  __v: false,
                },
              },
        },
        {
          $group:
           
          {
            _id: "$_id",
                                
          blockedStatus: {
           $first: "$blockedStatus",
          },
          approvalStatus: {
          $first: "$approvalStatus",
                                },
          theatreName: {
          $first: "$Name",
                                },
          location: {
          $first: "$Location",
          },
          screen: {
          $push: "$screen",
            },
          }
        },
        
      ])
    
res.json({movieDetails:movieDetails,screenList:moviepageaggregation})

      
      
    } catch (error) {
      res.json({ message: "moviepagedata backend error:", error });
      
    }
  },


  fetchUserData: async (req: Request, res: Response) => {
    try {
      const userData = await User.findOne({_id:req.query.userId});
      res.json({ userData: userData });
    } catch (err) {
      res.json({ message: "fecthUserData backend error:", err });
    }
  },

  fetchBookingMovie: async (req: Request, res: Response) => {
    try {
      const bookingMovieData = await Movie.findOne({movieId:req.query.movieId});
      res.json({ bookingMovieData: bookingMovieData });
      
    } catch (error) {
      res.json({ message: "fecthBookingMovie backend error:", error });
      
    }
  },

  stripeGateWay:async (req:Request, res:Response)=>{
    try {
      const bookingdata=req.body
    
      const user = await User.findOne({ _id: bookingdata.userId });
     
      const userEmail=user?.Email
      const seatBookedQty=bookingdata?.ticketCount
      const totalTicketAmount =bookingdata?.ticketPrice*bookingdata?.ticketCount
      if(bookingdata?.gateway==="stripe"){
       try {
        const uniqueId = uuid.v4();
        const successUrl = `${process.env.XCTACINE_STRIPE_PAYMENT_REDIRECT_URL}/success/${uniqueId}`;
      const cancelUrl = `${process.env.XCTACINE_STRIPE_PAYMENT_REDIRECT_URL}/cancel/${uniqueId}`;
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          mode: 'payment',
          line_items: [
            {
              price_data: {
                currency: 'inr',
                product_data: {
                  name: bookingdata.movieName,
                },
                unit_amount: totalTicketAmount * 100,
              },
              quantity: 1,
            },
          ],
          
          success_url: successUrl,

          cancel_url: cancelUrl,
          metadata: {
            uniqueId: uniqueId,
          }
        });

       
        res.json({paymenturl: session.url, paymentId: session.id,uniqueId:uniqueId, status: 'success' });
      
       } catch (error) {
        res.json({ message: "stripeGateWay backend error:", error });
       }
      }
      
    } catch (error) {
      res.json({ message: "stripeGateWay backend error:", error });
    }
  },

  createBooking:async (req:Request, res:Response)=>{
    try {
      const bookingdata=req.body
    
      const user = await User.findOne({ _id: bookingdata?.userId });
      const bookingSeatsQty = bookingdata?.ticketCount
      const totalTicketAmount = bookingdata?.ticketPrice*bookingSeatsQty
      bookingdata.totalTicketAmount=totalTicketAmount
      bookingdata.userMailId=user?.Email
      bookingdata.bookeddate=new Date()
     
      if(bookingdata?.paymentStatus==='success'){
        try {
          const bookingExist = await Booking.findOne({paymentId:bookingdata?.paymentId});
          if(bookingExist){
            res.json({ message: "booking already exist" });
          }else{
            const bookingObject = new Booking({
              ticketPrice: bookingdata?.ticketPrice,
              userId: bookingdata?.userId,
              email: bookingdata?.userMailId,
              userName: user?.Name,
              showDate: bookingdata?.showDate,
              showTime: bookingdata?.selectedShow,
              bookedDate: bookingdata?.bookeddate,
              paymentId: bookingdata?.paymentId,
              paymentStatus: bookingdata?.paymentStatus,
              movieName: bookingdata?.movieName,  
              theaterId: bookingdata?.theaterId,
              screenName: bookingdata?.selectedScreen,
              screenId: bookingdata?.screenId,
              bookedSeats: bookingdata?.selectedSeats,
              theaterName: bookingdata?.selectedtheatre,
              totalTicketAmount: bookingdata?.totalTicketAmount,
              movieId: bookingdata?.movieId


            });
            const response=await bookingObject.save()
            res.json({ message: "You have successfully booked you ticket. Enjoy!!",status:200, response });
          }
        } catch (error) {
          res.json({ message: "createBooking backend condition error:", error });
        }
      }
    } catch (error) {
      res.json({ message: "createBooking backend error:", error });
      
    }
  },

  editProfile:async (req:Request, res:Response)=>{
    try {
      console.log("req.body",req.body)
      console.log("req.file",req.file)
      console.log("req.query",req.query)
    } catch (error) {
      res.json({ message: "editProfile backend error:", error });
      
    }
  },

  fetchUserBookings:async (req:Request, res:Response)=>{
    try {
      const response=await Booking.find({userId:req.query.userId})
      res.json({ response });
      
      
    } catch (error) {
      res.json({ message: "fetchUserBookings backend error:", error });
      
    }
  }








  
};

export default userController;
