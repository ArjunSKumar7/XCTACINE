"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controller/userController"));
const router = express_1.default.Router();
router.get('/usermovielist', userController_1.default.moviesFetchUser);
router.get("/findNumber", userController_1.default.findNumber);
router.get("/moviename-search", userController_1.default.getMoviesBySearch);
router.get("/fetchtheatrelocation", userController_1.default.getLocation);
router.get("/fetchcolumnsandrows", userController_1.default.fetchcolumnsandrows);
exports.default = router;
