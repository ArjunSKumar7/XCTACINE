"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    ticketPrice: {
        type: Number,
    },
    userId: {
        type: String,
    },
    email: {
        type: String,
    },
    userName: {
        type: String,
    },
    showDate: {
        type: String,
    },
    showTime: { type: String },
    bookedDate: {
        type: Date,
    },
    paymentId: {
        type: String,
    },
    paymentStatus: {},
    movieName: {
        type: String,
    },
    theaterId: {
        type: String,
    },
    screenName: {
        type: String,
    },
    screenId: {
        type: String,
    },
    startAt: {
        type: String,
        trim: true,
    },
    bookedSeats: {
        type: [],
    },
    theaterName: {
        type: String,
    },
    totalAmount: {
        type: Number,
    },
    ticketCount: {
        type: Number,
    },
    movieId: {
        type: String,
    },
    checkin: {
        type: Boolean,
        default: false,
    },
    qrCode: {
        type: String,
    },
}, {
    timestamps: true,
});
const Booking = (0, mongoose_1.model)('BookingSchema', bookingSchema);
exports.default = Booking;
