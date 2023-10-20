"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const screenSchema = new mongoose_1.Schema({
    screenName: {
        type: String,
        required: true
    },
    rows: {
        type: Number,
        required: true
    },
    columns: {
        type: Number,
        required: true
    },
    shows: {
        type: Array
    },
    theatreId: {
        type: String,
        required: true
    },
    theatreName: {
        type: String,
        required: true
    },
    movieTitle: {
        type: String
    },
    movieId: {
        type: String
    },
    ticketPrice: {
        type: Number
    },
    selectedDates: {
        type: Array
    }
});
const Screen = (0, mongoose_1.model)("ScreenSchema", screenSchema);
exports.default = Screen;
