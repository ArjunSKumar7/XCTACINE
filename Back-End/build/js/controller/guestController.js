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
const theaterSchema_1 = __importDefault(require("../model/theaterSchema"));
const guestController = {
    guestMovieList: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    })
};
exports.default = guestController;
