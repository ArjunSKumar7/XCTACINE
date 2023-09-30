"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const theatreController_1 = __importDefault(require("../controller/theatreController"));
const router = express_1.default.Router();
router.post('/addmovie', theatreController_1.default.addMovie);
router.get('/fetchmovielist/:id', theatreController_1.default.fetchMovieList);
router.delete("/deletemovie", theatreController_1.default.deleteMovie);
router.post("/addscreen", theatreController_1.default.addScreen);
router.get("/fetchscreenlist/:id", theatreController_1.default.fetchScreenList);
router.get("/fetchlocation", theatreController_1.default.fetchLocation);
exports.default = router;
