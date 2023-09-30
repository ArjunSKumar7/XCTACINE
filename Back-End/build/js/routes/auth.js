"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authcontroller_1 = __importDefault(require("../controller/authcontroller"));
const router = express_1.default.Router();
//user login and signup
router.post("/user/login", authcontroller_1.default.userLogin);
router.post("/user/signup", authcontroller_1.default.UserSignup);
router.post("/user/glogin", authcontroller_1.default.usergLogin);
//theater login and signup
router.post("/theatre/login", authcontroller_1.default.TheatreLogin);
router.post("/theatre/signup", authcontroller_1.default.TheatreSignUp);
//admin login
router.post("/admin/login", authcontroller_1.default.adminLogin);
exports.default = router;
