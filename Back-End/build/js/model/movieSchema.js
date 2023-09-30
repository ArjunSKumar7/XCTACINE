"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const movieSchema = new mongoose_1.Schema({
    movieId: {
        type: String,
    },
    movieTitle: {
        type: String,
    },
    movieLanguage: {
        type: String,
    },
    movieOverview: {
        type: String,
    },
    moviePoster: {
        type: String,
    },
    movieReleaseDate: {
        type: Date,
    },
    theatreId: {
        type: Array,
    },
});
const Movie = (0, mongoose_1.model)("MovieSchema", movieSchema);
exports.default = Movie;
