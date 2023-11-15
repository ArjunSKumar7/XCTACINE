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
const userSchema_1 = __importDefault(require("../model/userSchema"));
const theaterSchema_1 = __importDefault(require("../model/theaterSchema"));
const locationSchema_1 = __importDefault(require("../model/locationSchema"));
const bannerSchema_1 = __importDefault(require("../model/bannerSchema"));
const bookingSchema_1 = __importDefault(require("../model/bookingSchema"));
const admincontroller = {
    userlistfetch: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const usersData = yield userSchema_1.default.find();
            res.json({ usersDetails: usersData });
        }
        catch (err) {
            res.json({ message: err });
        }
    }),
    theatrelistfetch: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const theatreData = yield theaterSchema_1.default.find();
            res.json({ theatreDetails: theatreData });
        }
        catch (err) {
            res.json({ message: err });
        }
    }),
    theatreAppoval: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const approvalStatus = req.body;
            console.log("approvalStatusback", req.body);
            yield theaterSchema_1.default.updateOne({ _id: approvalStatus.id }, { $set: { approvalStatus: approvalStatus.status } }).then(() => {
                res.json({
                    status: 200,
                    message: "Theatre Status Changed",
                    approvalStatus: approvalStatus.status,
                });
            });
        }
        catch (err) {
            res.json({ status: 400, message: "error occured:" + err });
        }
    }),
    userApproval: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const approvalStatus = req.body;
            yield userSchema_1.default.updateOne({ _id: approvalStatus.id }, { $set: { blockedStatus: approvalStatus.status } }).then(() => {
                res.json({
                    status: 200,
                    message: "User Status Changed",
                    blockedStatus: approvalStatus.status,
                });
            });
        }
        catch (err) {
            res.json({ status: 400, message: "error occured:" + err });
        }
    }),
    addLocation: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const locationToAdd = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.LocationField.toLowerCase();
            const locationWord = locationToAdd.replace(/\b\w/g, (match) => match.toUpperCase());
            const existingLocations = yield locationSchema_1.default.findOne({});
            if (existingLocations === null || existingLocations === void 0 ? void 0 : existingLocations.location.length) {
                if (existingLocations === null || existingLocations === void 0 ? void 0 : existingLocations.location.includes(locationWord)) {
                    res.json({
                        status: 400,
                        message: "Location already exists",
                    });
                }
                else {
                    const response = yield locationSchema_1.default.findOneAndUpdate({}, {
                        $addToSet: { location: locationWord },
                    }, { upsert: true, new: true });
                    res.status(200).json({
                        status: 200,
                        message: "Location added successfully",
                    });
                }
            }
            else {
                const response = yield locationSchema_1.default.findOneAndUpdate({}, { $addToSet: { location: locationWord } }, // Use $addToSet to avoid duplicates
                { upsert: true, new: true } // Create a new document if it doesn't exist
                );
                res.status(201).json({
                    status: 201,
                    message: "Location added successfully!",
                    response,
                });
            }
        }
        catch (error) {
            res.json({ status: 500, message: "addLocation backend error!", error });
        }
    }),
    addBanner: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        try {
            const bannerPath = (_b = req.file) === null || _b === void 0 ? void 0 : _b.path;
            const response = yield bannerSchema_1.default.create({
                bannerImage: bannerPath,
                bannerName: req.body.bannerName,
                bannerDescription: req.body.bannerDescription,
            });
            res.status(200).json({
                status: 200,
                message: "Banner added successfully!",
                response,
            });
        }
        catch (error) {
            res.json({
                status: 500,
                message: "addBanner backend error!" + error,
            });
        }
    }),
    fetchBanner: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const bannerData = yield bannerSchema_1.default.find();
            res.json({ bannerData });
        }
        catch (err) {
            res.json({
                status: 500,
                message: "fetchBanner backend error!" + err,
            });
        }
    }),
    deleteBanner: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const bannerId = req.query.bannerId;
            const bannerDeleteResponse = yield bannerSchema_1.default.deleteOne({ _id: bannerId });
            res.json({ status: 200, message: "Banner deleted", bannerDeleteResponse });
        }
        catch (err) {
            res.json({ status: 500, message: `deleteBanner backend error:${err}` });
        }
    }),
    bannerStateChange: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const bannerState = req.body.state;
            const response = yield bannerSchema_1.default.updateOne({ _id: req.body.id }, { $set: { bannerState: bannerState } }).then((response) => {
                if (response.modifiedCount > 0) {
                    res.json({ status: 200, message: "Banner state changed", bannerState: bannerState });
                }
                else {
                    res.json({ status: 400, message: "Banner state not changed" });
                }
            });
        }
        catch (error) {
            res.json({ status: 500, message: `bannerStateChange backend error:${error}` });
        }
    }),
    fetchLocation: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const locationData = yield locationSchema_1.default.find({});
            res.json({ locationData });
        }
        catch (err) {
            res.json({ status: 500, message: `fetchLocation backend error:${err}` });
        }
    }),
    deleteLocation: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield locationSchema_1.default.deleteOne({ _id: req.query.id });
        }
        catch (error) {
        }
    }),
    adminGraphInfo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response1 = yield bookingSchema_1.default.aggregate([
                {
                    $match: {
                        $or: [{ bookingStatus: "confirmed" }, { bookingStatus: "cancelled" }]
                    }
                },
                {
                    $project: {
                        month: { $month: '$bookedDate' },
                        userId: 1,
                    },
                },
                {
                    $group: {
                        _id: {
                            month: "$month",
                        },
                        userCount: {
                            $addToSet: "$userId",
                        },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        month: "$_id.month",
                        data: [{ usercount: { $size: "$userCount" } }]
                    },
                },
                {
                    $sort: {
                        month: 1
                    }
                },
                {
                    $group: {
                        _id: null,
                        result: { $push: "$$ROOT" }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        result: 1,
                    }
                }
            ]);
            const response2 = yield theaterSchema_1.default.aggregate([
                {
                    $group: {
                        _id: {
                            month: { $month: "$createdAt" },
                        },
                        count: { $sum: 1 },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        month: "$_id.month",
                        data: [{ theatrecount: "$count" }],
                    },
                },
                {
                    $group: {
                        _id: null,
                        result: { $push: "$$ROOT" },
                    }
                },
                {
                    $project: {
                        _id: 0,
                        result: 1,
                    }
                }
            ]);
            // const resultArr=response1
            // // console.log('response aggregation chart data', response);
            // const result = Array.from({ length: 12 }, (_, index) => {
            //   const monthData = response1.find(item => item.month === (index + 1));
            //   return monthData ? monthData : { data: null, month: index + 1 };
            // })
            // .map((item,index) => ({
            //   data: item.data,
            //   month: item.data ? item.month : index+1
            // }));
            res.json({ status: 200, userData: response1, theatreData: response2 });
        }
        catch (error) {
            res.json({ status: 500, message: `adminGraphInfo backend error:${error}` });
        }
    }),
    fetchdashboxinfo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const usersCount = yield userSchema_1.default.countDocuments({});
            const theatresCount = yield theaterSchema_1.default.countDocuments({});
            res.json({ status: 200, usersCount, theatresCount });
        }
        catch (error) {
            res.json({ status: 500, message: `fetchdashboxinfo backend error:${error}` });
        }
    }),
};
exports.default = admincontroller;
