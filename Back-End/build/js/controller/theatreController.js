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
const screenSchema_1 = __importDefault(require("../model/screenSchema"));
const locationSchema_1 = __importDefault(require("../model/locationSchema"));
const bookingSchema_1 = __importDefault(require("../model/bookingSchema"));
const theatrecontroller = {
    addMovie: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
        try {
            const movieTitle = (_b = (_a = req.body) === null || _a === void 0 ? void 0 : _a.movieData) === null || _b === void 0 ? void 0 : _b.title;
            const theatreId = (_d = (_c = req.body) === null || _c === void 0 ? void 0 : _c.theatreData) === null || _d === void 0 ? void 0 : _d.theatreId;
            const existingMovie = yield movieSchema_1.default.findOne({ movieTitle: movieTitle });
            if (existingMovie) {
                if (existingMovie.theatreId.includes(theatreId)) {
                    // Movie with the same title and theatreId already exists
                    res.json({ message: "Movie already exists for this theatre." });
                }
                else {
                    // Add the new theatreId to the existing movie
                    existingMovie.theatreId.push(theatreId);
                    const response = yield existingMovie.save();
                    res.json({ message: "Movie updated with new theatreId.", response });
                }
            }
            else {
                const movieUrl = `https://image.tmdb.org/t/p/w500${(_f = (_e = req.body) === null || _e === void 0 ? void 0 : _e.movieData) === null || _f === void 0 ? void 0 : _f.poster_path}  `;
                const moviebackpath = `https://image.tmdb.org/t/p/w500${(_h = (_g = req.body) === null || _g === void 0 ? void 0 : _g.movieData) === null || _h === void 0 ? void 0 : _h.backdrop_path}  `;
                const movieObj = new movieSchema_1.default({
                    movieId: (_k = (_j = req.body) === null || _j === void 0 ? void 0 : _j.movieData) === null || _k === void 0 ? void 0 : _k.id,
                    movieTitle: (_m = (_l = req.body) === null || _l === void 0 ? void 0 : _l.movieData) === null || _m === void 0 ? void 0 : _m.title,
                    movieLanguage: (_p = (_o = req.body) === null || _o === void 0 ? void 0 : _o.movieData) === null || _p === void 0 ? void 0 : _p.original_language,
                    movieOverview: (_q = req.body.movieData) === null || _q === void 0 ? void 0 : _q.overview,
                    moviePoster: movieUrl,
                    movieBackgroundPoster: moviebackpath,
                    movieReleaseDate: (_r = req.body.movieData) === null || _r === void 0 ? void 0 : _r.release_date,
                    theatreId: (_t = (_s = req.body) === null || _s === void 0 ? void 0 : _s.theatreData) === null || _t === void 0 ? void 0 : _t.theatreId,
                });
                const response = yield movieObj.save();
                res.json({ message: "movie added successfully!", response });
            }
        }
        catch (error) {
            res.json({ message: "addmovie backend error:", error });
        }
    }),
    fetchMovieList: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const theatreId = req.params.id;
            const movieListData = yield movieSchema_1.default.find({
                theatreId: { $in: [theatreId] },
            });
            res.json({ movieList: movieListData });
        }
        catch (err) {
            res.json({ message: "fecthMovieList backend error:", err });
        }
    }),
    deleteMovie: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { movieId, theatreId } = req.query;
            const movie = yield movieSchema_1.default.findOne({ movieId: movieId });
            if ((movie === null || movie === void 0 ? void 0 : movie.theatreId.length) === 1 && (movie === null || movie === void 0 ? void 0 : movie.theatreId[0]) === theatreId) {
                const movieDeleteResponse = yield movieSchema_1.default.deleteOne({ movieId: movieId });
                return res.json({ message: "Movie deleted", movieDeleteResponse });
            }
            else {
                const movieDeleteResponse = yield movieSchema_1.default.updateOne({ movieId: movieId }, { $pull: { theatreId: theatreId } });
                res.json({
                    message: "movie deleted",
                    status: 200,
                    movieDeleteResponse,
                });
            }
        }
        catch (err) {
            res.json({ message: "fecthUserMovieList backend error:", err });
        }
    }),
    addScreen: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _u, _v, _w, _x, _y, _z, _0, _1;
        try {
            const screenExist = yield screenSchema_1.default.findOne({
                screenName: (_u = req.body) === null || _u === void 0 ? void 0 : _u.screenName,
            });
            if (screenExist) {
                res.json({ message: "screen already exist" });
            }
            else {
                const screenObj = new screenSchema_1.default({
                    screenName: (_v = req.body) === null || _v === void 0 ? void 0 : _v.screenName,
                    rows: (_w = req.body) === null || _w === void 0 ? void 0 : _w.Rows,
                    columns: (_x = req.body) === null || _x === void 0 ? void 0 : _x.Columns,
                    shows: (_y = req.body) === null || _y === void 0 ? void 0 : _y.shows,
                    theatreId: (_z = req.body) === null || _z === void 0 ? void 0 : _z.theatreId,
                    theatreName: (_0 = req.body) === null || _0 === void 0 ? void 0 : _0.theatreName,
                    ticketPrice: (_1 = req.body) === null || _1 === void 0 ? void 0 : _1.ticketPrice,
                });
                const resposne = yield screenObj.save();
                res.json({
                    message: "screen added successfully!",
                    addedScreenObj: resposne,
                });
            }
        }
        catch (error) {
            res.json({ message: "fecthUserMovieList backend error:", error });
        }
    }),
    fetchScreenList: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const theatreId = req.params.id;
            const screenListData = yield screenSchema_1.default.find({ theatreId: theatreId });
            res.json({ screenList: screenListData });
        }
        catch (err) {
            res.json({ message: "fetchScreenList backend error:", err });
        }
    }),
    deleteScreen: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("req", req.query);
            const screenId = req.query.screenId;
            const screenDeleteResponse = yield screenSchema_1.default.deleteOne({ _id: screenId });
            res.json({ message: "screen deleted", screenDeleteResponse });
        }
        catch (err) {
            res.json({ message: "deleteScreen backend error:", err });
        }
    }),
    fetchLocation: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const locationData = yield locationSchema_1.default.find({});
            const locationList = locationData[0].location;
            res.json({ locationList: locationList });
        }
        catch (err) {
            res.json({ message: "fecthMovieList backend error:", err });
        }
    }),
    moviescreenallocation: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = req.body;
            const movie = yield movieSchema_1.default.findOne({ movieId: data.movieId });
            const response = yield screenSchema_1.default.updateOne({ _id: data.screenId }, {
                $set: {
                    movieId: data.movieId,
                    movieTitle: movie === null || movie === void 0 ? void 0 : movie.movieTitle,
                    selectedDates: data.selectedDates,
                },
            });
            if (response.modifiedCount > 0) {
                res.json({ message: "moviescreenallocation successfully!", response });
            }
            else {
                res.json({ message: "moviescreenallocation failed!", response });
            }
        }
        catch (error) {
            res.json({ message: "moviescreenallocation backend error:", error });
        }
    }),
    fetchDashInfo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("fetchDashInfo", req.params.id);
            const totalRevenue = yield bookingSchema_1.default.aggregate([
                { $match: { theatreId: req.params.id, bookingStatus: "confirmed" } },
                { $group: { _id: null, totalAmount: { $sum: "$totalAmount" } } },
            ]);
            const totalUsers = yield bookingSchema_1.default.aggregate([
                { $match: { theatreId: req.params.id, bookingStatus: "confirmed" } },
                { $group: { _id: "$userId" } },
                { $group: { _id: "$userId", totalUsers: { $sum: 1 } } },
            ]);
            const totalBookings = yield bookingSchema_1.default.countDocuments({
                theatreId: req.params.id,
            });
            res.json({ dashInfo: { totalRevenue, totalUsers, totalBookings } });
        }
        catch (error) {
            res.json({ message: "fetchDashInfo backend error:", error });
        }
    }),
};
exports.default = theatrecontroller;
