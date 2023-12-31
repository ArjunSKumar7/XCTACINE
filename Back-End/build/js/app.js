"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
// import mongoose from 'mongoose';
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const database_1 = __importDefault(require("./config/database"));
const user_1 = __importDefault(require("./routes/user"));
const auth_1 = __importDefault(require("./routes/auth"));
const admin_1 = __importDefault(require("./routes/admin"));
const theatre_1 = __importDefault(require("./routes/theatre"));
const guest_1 = __importDefault(require("./routes/guest"));
const serverConfig_1 = __importDefault(require("./config/serverConfig"));
const authMiddlewares_1 = __importDefault(require("./middlewares/authMiddlewares"));
const accessCheckMiddleware_1 = __importDefault(require("./middlewares/accessCheckMiddleware"));
const cloudinary_1 = require("cloudinary");
const userRole = process.env.USER_ROLE;
const adminRole = process.env.ADMIN_ROLE;
const theatreRole = process.env.THEATER_ROLE;
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
app.use((0, morgan_1.default)("dev"));
const corsOptions = {
    // origin: "http://localhost:5173", // Replace this with your frontend's domain
    origin: ["https://xctacine.online"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Enable sending cookies from the frontend to the backend
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
// Custom error handling middleware
database_1.default.connect();
cloudinary_1.v2.config({
    cloud_name: 'xctacine',
    api_key: '794227963189558',
    api_secret: 'Tx1xRWAb1iFHUGDK731SRCilxMA'
});
//routes
app.use("/api/auth", auth_1.default);
app.use("/api/guest", guest_1.default);
app.use("/api/user", (0, authMiddlewares_1.default)(userRole), accessCheckMiddleware_1.default.checkUserBlock, user_1.default);
app.use("/api/theatre", (0, authMiddlewares_1.default)(theatreRole), accessCheckMiddleware_1.default.checkTheatreBlock, theatre_1.default);
app.use("/api/admin", (0, authMiddlewares_1.default)(adminRole), admin_1.default);
(0, serverConfig_1.default)(server);
