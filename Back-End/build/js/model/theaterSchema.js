"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const theatreSchema = new mongoose_1.Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true,
        minlength: 6
    },
    Location: {
        type: String,
        required: true,
    },
    ProfilePic: {
        type: Array
    },
    blockedStatus: {
        type: Boolean,
        default: false
    },
    approvalStatus: {
        type: Boolean,
        default: false
    }
});
const Theatre = (0, mongoose_1.model)('TheatreSchema', theatreSchema);
exports.default = Theatre;
