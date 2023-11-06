"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const movieSchema_1 = __importDefault(require("../model/movieSchema"));
const userSchema_1 = __importDefault(require("../model/userSchema"));
const locationSchema_1 = __importDefault(require("../model/locationSchema"));
const theaterSchema_1 = __importDefault(require("../model/theaterSchema"));
const bookingSchema_1 = __importDefault(require("../model/bookingSchema"));
const bannerSchema_1 = __importDefault(require("../model/bannerSchema"));
const uuid = __importStar(require("uuid"));
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const userController = {
    moviesFetchUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);
            const locationValue = req.query.locationValue;
            const skip = Math.abs((page - 1) * limit);
            const totalMovieCount = yield movieSchema_1.default.find().countDocuments();
            const totalPages = Math.ceil(totalMovieCount / limit);
            if (locationValue === "") {
                const movieListData = yield movieSchema_1.default.find()
                    .skip(skip)
                    .limit(limit)
                    .sort({ movieReleaseDate: -1 });
                res.json({ movieList: movieListData, totalPages: totalPages });
            }
            else {
                const theatreAggregation = yield theaterSchema_1.default.aggregate([
                    {
                        $match: { Location: locationValue },
                    },
                    {
                        $project: { _id: { $toString: "$_id" } },
                    },
                    {
                        $lookup: {
                            from: "movieschemas",
                            localField: "_id",
                            foreignField: "theatreId",
                            as: "locationBasedMovieList",
                        },
                    },
                    {
                        $unwind: "$locationBasedMovieList",
                    },
                    {
                        $skip: skip,
                    },
                    {
                        $limit: limit,
                    },
                    {
                        $sort: { "locationBasedMovieList.movieReleaseDate": -1 },
                    },
                ]);
                //maping so that i get it in exact format as no location selected response
                const movieList = theatreAggregation.map((theatre) => theatre.locationBasedMovieList);
                res.json({ movieList: movieList, totalPages: totalPages });
            }
        }
        catch (err) {
            res.json({ message: "fecthUserMovieList backend error:", err });
        }
    }),
    findNumber: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const phoneNumber = req.query.number;
            const userValid = yield userSchema_1.default.findOne({ Mobile: phoneNumber });
            if (userValid === null || userValid === void 0 ? void 0 : userValid.Name) {
                res.json({ userExist: true, message: "User already exists" });
            }
            else {
                res.json({ userExist: false, message: "User does not exist" });
            }
        }
        catch (error) {
            res.json({ message: "findNumber backend error:", error });
        }
    }),
    getMoviesBySearch: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const searchText = req.query.search;
            const search = new RegExp(searchText, "i");
            const movieSearchData = yield movieSchema_1.default.find({ movieTitle: search })
                .limit(8)
                .sort({ movieReleaseDate: -1 });
            res.json({ movieList: movieSearchData });
        }
        catch (err) {
            res.json({ message: "fecthMovieList backend error:", err });
        }
    }),
    getLocation: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const locationData = yield locationSchema_1.default.find({});
            const locationList = locationData[0].location;
            res.json({ locationList: locationList });
        }
        catch (err) {
            res.json({ message: "fecthMovieList backend error:", err });
        }
    }),
    moviepagedata: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const movieId = req.query.movieId;
            const location = req.query.location;
            const movieDetails = yield movieSchema_1.default.findOne({ movieId: movieId });
            const moviepageaggregation = yield theaterSchema_1.default.aggregate([
                { $match: { Location: location, blockedStatus: false } },
                { $addFields: { _id: { $toString: "$_id" } } },
                {
                    $lookup: {
                        from: "screenschemas",
                        localField: "_id",
                        foreignField: "theatreId",
                        as: "screen",
                    },
                },
                { $unwind: { path: "$screen", includeArrayIndex: "string" } },
                { $match: { "screen.movieId": movieId } },
                {
                    $project: {
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
                    $group: {
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
                    },
                },
            ]);
            res.json({
                movieDetails: movieDetails,
                screenList: moviepageaggregation,
            });
        }
        catch (error) {
            res.json({ message: "moviepagedata backend error:", error });
        }
    }),
    fetchUserData: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userData = yield userSchema_1.default.findOne({ _id: req.query.userId });
            res.json({ userData: userData });
        }
        catch (err) {
            res.json({ message: "fecthUserData backend error:", err });
        }
    }),
    fetchBookingMovie: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const bookingMovieData = yield movieSchema_1.default.findOne({
                movieId: req.query.movieId,
            });
            res.json({ bookingMovieData: bookingMovieData });
        }
        catch (error) {
            res.json({ message: "fecthBookingMovie backend error:", error });
        }
    }),
    stripeGateWay: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const bookingdata = req.body;
            const user = yield userSchema_1.default.findOne({ _id: bookingdata.userId });
            const userEmail = user === null || user === void 0 ? void 0 : user.Email;
            const seatBookedQty = bookingdata === null || bookingdata === void 0 ? void 0 : bookingdata.ticketCount;
            const totalTicketAmount = (bookingdata === null || bookingdata === void 0 ? void 0 : bookingdata.ticketPrice) * (bookingdata === null || bookingdata === void 0 ? void 0 : bookingdata.ticketCount);
            if ((bookingdata === null || bookingdata === void 0 ? void 0 : bookingdata.gateway) === "stripe") {
                try {
                    const uniqueId = uuid.v4();
                    const successUrl = `${process.env.XCTACINE_STRIPE_PAYMENT_REDIRECT_URL}/success/${uniqueId}`;
                    const cancelUrl = `${process.env.XCTACINE_STRIPE_PAYMENT_REDIRECT_URL}/cancel/${uniqueId}`;
                    const session = yield stripe.checkout.sessions.create({
                        payment_method_types: ["card"],
                        mode: "payment",
                        line_items: [
                            {
                                price_data: {
                                    currency: "inr",
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
                        },
                    });
                    res.json({
                        paymenturl: session.url,
                        paymentId: session.id,
                        uniqueId: uniqueId,
                        status: "success",
                    });
                }
                catch (error) {
                    res.json({ message: "stripeGateWay backend error:", error });
                }
            }
        }
        catch (error) {
            res.json({ message: "stripeGateWay backend error:", error });
        }
    }),
    createBooking: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const bookingdata = req.body;
            const user = yield userSchema_1.default.findOne({ _id: bookingdata === null || bookingdata === void 0 ? void 0 : bookingdata.userId });
            const bookingSeatsQty = bookingdata === null || bookingdata === void 0 ? void 0 : bookingdata.ticketCount;
            const totalTicketAmount = (bookingdata === null || bookingdata === void 0 ? void 0 : bookingdata.ticketPrice) * bookingSeatsQty;
            bookingdata.totalTicketAmount = totalTicketAmount;
            bookingdata.userMailId = user === null || user === void 0 ? void 0 : user.Email;
            bookingdata.bookeddate = new Date();
            if ((bookingdata === null || bookingdata === void 0 ? void 0 : bookingdata.paymentStatus) === "success") {
                try {
                    const bookingExist = yield bookingSchema_1.default.findOne({
                        paymentId: bookingdata === null || bookingdata === void 0 ? void 0 : bookingdata.paymentId,
                    });
                    if (bookingExist) {
                        res.json({ message: "booking already exist" });
                    }
                    else {
                        const bookingObject = new bookingSchema_1.default({
                            ticketPrice: bookingdata === null || bookingdata === void 0 ? void 0 : bookingdata.ticketPrice,
                            userId: bookingdata === null || bookingdata === void 0 ? void 0 : bookingdata.userId,
                            email: bookingdata === null || bookingdata === void 0 ? void 0 : bookingdata.userMailId,
                            userName: user === null || user === void 0 ? void 0 : user.Name,
                            showDate: bookingdata === null || bookingdata === void 0 ? void 0 : bookingdata.showDate,
                            showTime: bookingdata === null || bookingdata === void 0 ? void 0 : bookingdata.selectedShow,
                            bookedDate: bookingdata === null || bookingdata === void 0 ? void 0 : bookingdata.bookeddate,
                            paymentId: bookingdata === null || bookingdata === void 0 ? void 0 : bookingdata.paymentId,
                            paymentStatus: bookingdata === null || bookingdata === void 0 ? void 0 : bookingdata.paymentStatus,
                            movieName: bookingdata === null || bookingdata === void 0 ? void 0 : bookingdata.movieName,
                            theatreId: bookingdata === null || bookingdata === void 0 ? void 0 : bookingdata.theatreId,
                            screenName: bookingdata === null || bookingdata === void 0 ? void 0 : bookingdata.selectedScreen,
                            screenId: bookingdata === null || bookingdata === void 0 ? void 0 : bookingdata.screenId,
                            bookedSeats: bookingdata === null || bookingdata === void 0 ? void 0 : bookingdata.selectedSeats,
                            theatreName: bookingdata === null || bookingdata === void 0 ? void 0 : bookingdata.selectedtheatre,
                            totalAmount: bookingdata === null || bookingdata === void 0 ? void 0 : bookingdata.totalTicketAmount,
                            movieId: bookingdata === null || bookingdata === void 0 ? void 0 : bookingdata.movieId,
                            bookingStatus: bookingdata === null || bookingdata === void 0 ? void 0 : bookingdata.bookingStatus,
                        });
                        const response = yield bookingObject.save();
                        res.json({
                            message: "You have successfully booked you ticket. Enjoy!!",
                            status: 200,
                            response,
                        });
                    }
                }
                catch (error) {
                    res.json({
                        message: "createBooking backend condition error:",
                        error,
                    });
                }
            }
            else {
                res.json({ status: 400, message: "Payment failed" });
            }
        }
        catch (error) {
            res.json({ message: "createBooking backend error:", error });
        }
    }),
    editProfile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userSchema_1.default.updateOne({ _id: req.query.userId }, {
                $set: {
                    Name: req.body.Name,
                    Email: req.body.Email,
                    Mobile: req.body.Mobile,
                },
            });
            res.json({ message: "User updated successfully", user });
        }
        catch (error) {
            res.json({ message: "editProfile backend error:", error });
        }
    }),
    fetchUserBookings: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield bookingSchema_1.default.find({ userId: req.query.userId });
            res.json({ response });
        }
        catch (error) {
            res.json({ message: "fetchUserBookings backend error:", error });
        }
    }),
    fetchBookedSeats: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f;
        try {
            const aggregateData = yield bookingSchema_1.default.aggregate([
                {
                    $match: {
                        bookingStatus: (_a = req.body) === null || _a === void 0 ? void 0 : _a.bookingStatus,
                        showDate: (_b = req.body) === null || _b === void 0 ? void 0 : _b.date,
                        showTime: (_c = req.body) === null || _c === void 0 ? void 0 : _c.show,
                        theatreName: (_d = req.body) === null || _d === void 0 ? void 0 : _d.theatre,
                        screenId: (_e = req.body) === null || _e === void 0 ? void 0 : _e.screen,
                        movieId: (_f = req.body) === null || _f === void 0 ? void 0 : _f.movie,
                    },
                },
            ]);
            const bookedSeats = aggregateData.map((obj) => obj.bookedSeats).flat();
            res.json({ bookedSeats });
        }
        catch (error) {
            res.json({ message: "fetchBookedSeats backend error:", error });
        }
    }),
    editProfilePic: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _g;
        try {
            const profilePicPath = (_g = req.file) === null || _g === void 0 ? void 0 : _g.path;
            const user = yield userSchema_1.default.updateOne({ _id: req.params.id }, {
                $set: {
                    ProfilePic: profilePicPath,
                },
            });
            res.json({
                message: "User Profile Pic updated successfully",
                status: 200,
                user,
            });
        }
        catch (error) {
            res.json({ message: "editProfilePic backend error:", error });
        }
    }),
    fetchBanners: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield bannerSchema_1.default.find({ bannerState: true });
            res.json({ response });
        }
        catch (error) {
            res.json({ message: "fetchBanners backend error:", error });
        }
    }),
};
exports.default = userController;
