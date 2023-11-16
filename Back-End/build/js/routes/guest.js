"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const guestController_1 = __importDefault(require("../controller/guestController"));
const router = express_1.default.Router();
router.get("/guestmovielist", guestController_1.default.guestMovieList);
exports.default = router;
