"use strict";
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
                        $match: { Location: locationValue }
                    },
                    {
                        $project: { _id: { $toString: "$_id" } }
                    },
                    {
                        $lookup: {
                            from: "movieschemas",
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
    fetchcolumnsandrows: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    })
};
exports.default = userController;
