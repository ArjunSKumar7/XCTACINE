"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
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
        minlength: 6
    },
    ProfilePic: {
        type: Array
    },
    blockedStatus: {
        type: Boolean,
        default: false
    },
    Mobile: {
        type: Number,
        required: true,
        unique: true
    }
});
const User = (0, mongoose_1.model)('UserSchema', userSchema);
exports.default = User;
