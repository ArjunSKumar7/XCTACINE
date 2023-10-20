"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadProfilePic = void 0;
const multer_1 = __importDefault(require("multer"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const cloudinary_1 = require("cloudinary");
const profilePic = {
    cloudinary: cloudinary_1.v2,
    params: {
        folder: 'ProfilePic',
        allowed_formats: ['jpg', 'jpeg', 'png', 'svg', 'webp', 'gif', 'jfif', 'webp'],
        public_id: (req, file) => {
            console.log('cloudinary  filee', file, req.body);
            const originalname = file.originalname.split('.');
            return `image-${Date.now()}-${originalname[0]}`;
        }
    }
};
const profilePicStorage = new multer_storage_cloudinary_1.CloudinaryStorage(profilePic);
const uploadProfilePic = (0, multer_1.default)({ storage: profilePicStorage }).single('ProfilePic');
exports.uploadProfilePic = uploadProfilePic;
