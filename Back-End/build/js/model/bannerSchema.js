"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bannerSchema = new mongoose_1.Schema({
    bannerName: { type: String },
    bannerDescription: { type: String },
    bannerImage: { type: String },
    bannerState: { type: Boolean,
        default: false }
});
const Banner = (0, mongoose_1.model)('BannerSchema', bannerSchema);
exports.default = Banner;
