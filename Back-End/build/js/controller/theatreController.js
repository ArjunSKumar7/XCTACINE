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
const theatrecontroller = {
    addMovie: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
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
                const movieObj = new movieSchema_1.default({
                    movieId: (_h = (_g = req.body) === null || _g === void 0 ? void 0 : _g.movieData) === null || _h === void 0 ? void 0 : _h.id,
                    movieTitle: (_k = (_j = req.body) === null || _j === void 0 ? void 0 : _j.movieData) === null || _k === void 0 ? void 0 : _k.title,
                    movieLanguage: (_m = (_l = req.body) === null || _l === void 0 ? void 0 : _l.movieData) === null || _m === void 0 ? void 0 : _m.original_language,
                    movieOverview: (_o = req.body.movieData) === null || _o === void 0 ? void 0 : _o.overview,
                    moviePoster: movieUrl,
                    movieReleaseDate: (_p = req.body.movieData) === null || _p === void 0 ? void 0 : _p.release_date,
                    theatreId: (_r = (_q = req.body) === null || _q === void 0 ? void 0 : _q.theatreData) === null || _r === void 0 ? void 0 : _r.theatreId,
                });
                // await movieObj.save().then((resposne) => {
                //   console.log("movie obj response",response);
                //   res.json({ message: "movie added successfully!", resposne });
                // });
                const response = yield movieObj.save();
                console.log("movie obj response", response);
                res.json({ message: "movie added successfully!", response });
            }
        }
        catch (error) {
            console.log("addmovie backend error:", error);
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
            console.log("fecthMovieList backend error:", err);
            res.json({ message: "fecthMovieList backend error:", err });
        }
    }),
    deleteMovie: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Aaaaaaaa");
        try {
            console.log("req", req.query);
            const { movieId, theatreId } = req.query;
            const movieDeleteResponse = yield movieSchema_1.default.updateOne({ movieId: movieId }, { $pull: { theatreId: theatreId } });
            console.log("movieDeleteResponse", movieDeleteResponse);
            res.json({ message: "movie deleted", movieDeleteResponse });
        }
        catch (err) {
            res.json({ message: "fecthUserMovieList backend error:", err });
        }
    }),
    addScreen: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _s, _t, _u, _v, _w, _x, _y;
        try {
            const screenExist = yield screenSchema_1.default.findOne({
                screenName: (_s = req.body) === null || _s === void 0 ? void 0 : _s.screenName,
            });
            if (screenExist) {
                res.json({ message: "screen already exist" });
            }
            else {
                const screenObj = new screenSchema_1.default({
                    screenName: (_t = req.body) === null || _t === void 0 ? void 0 : _t.screenName,
                    rows: (_u = req.body) === null || _u === void 0 ? void 0 : _u.Rows,
                    columns: (_v = req.body) === null || _v === void 0 ? void 0 : _v.Columns,
                    shows: (_w = req.body) === null || _w === void 0 ? void 0 : _w.shows,
                    theatreId: (_x = req.body) === null || _x === void 0 ? void 0 : _x.theatreId,
                    theatreName: (_y = req.body) === null || _y === void 0 ? void 0 : _y.theatreName,
                });
                yield screenObj.save().then((resposne) => {
                    res.json({ message: "screen added successfully!", resposne });
                });
            }
        }
        catch (error) {
            console.log("addScreen backend error:", error);
            res.json({ message: "fecthUserMovieList backend error:", error });
        }
    }),
    fetchScreenList: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const theatreId = req.params.id;
            const screenListData = yield screenSchema_1.default.find({ theatreId: theatreId });
            console.log("screenListData", screenListData);
            res.json({ screenList: screenListData });
        }
        catch (err) {
            res.json({ message: "fecthMovieList backend error:", err });
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
    })
};
exports.default = theatrecontroller;
