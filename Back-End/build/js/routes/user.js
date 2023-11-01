"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controller/userController"));
const multer_1 = require("../multer/multer");
const router = express_1.default.Router();
router.get('/usermovielist', userController_1.default.moviesFetchUser);
router.get("/findNumber", userController_1.default.findNumber);
router.get("/moviename-search", userController_1.default.getMoviesBySearch);
router.get("/fetchtheatrelocation", userController_1.default.getLocation);
router.get("/moviepagedata", userController_1.default.moviepagedata);
router.get("/fetchuserdata", userController_1.default.fetchUserData);
router.get("/bookingmoviefetch", userController_1.default.fetchBookingMovie);
router.post("/booking/stripeGateWay", userController_1.default.stripeGateWay);
router.post("/booking/confirmation", userController_1.default.createBooking);
router.put("/editprofile", multer_1.uploadProfilePic, userController_1.default.editProfile);
router.get("/fetchuserbookings", userController_1.default.fetchUserBookings);
router.post("/fetchbookedseats", userController_1.default.fetchBookedSeats);
router.patch("/profilepicedit/:id", multer_1.uploadProfilePic, userController_1.default.editProfilePic);
router.get("/fetchBanners", userController_1.default.fetchBanners);
exports.default = router;
