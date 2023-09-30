"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
function capitalizeLocation(location) {
    return location.replace(/\b\w/g, (match) => match.toUpperCase()); // Helper function to capitalize the first letter of each word
}
const locationSchema = new mongoose_1.Schema({
    location: {
        type: [String],
        unique: true,
        set: capitalizeLocation,
    },
});
const Location = (0, mongoose_1.model)("LocationSchema", locationSchema);
exports.default = Location;
