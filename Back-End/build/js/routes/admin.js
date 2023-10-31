"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = __importDefault(require("../controller/adminController"));
const multer_1 = require("../multer/multer");
const router = express_1.default.Router();
router.get("/userlist", adminController_1.default.userlistfetch);
router.get("/theatrelist", adminController_1.default.theatrelistfetch);
router.put("/theatrelist/approval", adminController_1.default.theatreAppoval);
router.put("/userlist/approval", adminController_1.default.userApproval);
router.post("/addlocation", adminController_1.default.addLocation);
router.post("/addbanner", multer_1.uploadBannerImage, adminController_1.default.addBanner);
exports.default = router;
