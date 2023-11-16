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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userSchema_1 = __importDefault(require("../model/userSchema"));
const adminSchema_1 = __importDefault(require("../model/adminSchema"));
const theaterSchema_1 = __importDefault(require("../model/theaterSchema"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const JwtAuth_1 = require("../authService/JwtAuth");
const userRole = process.env.USER_ROLE;
const adminRole = process.env.ADMIN_ROLE;
const theatreRole = process.env.THEATER_ROLE;
console.log(userRole);
const authController = {
    userLogin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { Email, Password } = req.body;
            const userData = yield userSchema_1.default.findOne({ Email: Email });
            if (!userData) {
                res.json({
                    status: 400,
                    created: false,
                    message: "user not found/exist",
                });
            }
            else if (userData.blockedStatus) {
                res.json({
                    status: 400,
                    created: false,
                    message: "user blocked",
                });
            }
            else if (userData.Password) {
                const validPassword = yield bcryptjs_1.default.compare(Password, userData.Password);
                if (validPassword) {
                    const token = (0, JwtAuth_1.generateJWT)(userData._id.toString(), userRole);
                    res.json({
                        user: userData,
                        created: true,
                        token: token,
                        status: 200,
                        message: "success",
                    });
                }
                else {
                    res.json({
                        status: 400,
                        created: false,
                        token: "",
                        message: "password not matched",
                    });
                }
            }
        }
        catch (err) {
            res.json({
                message: `something went wrong: ${err}`,
                status: 500,
                token: "",
            });
        }
    }),
    UserSignup: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { Email, Name, Password, Mobile, } = req.body;
            let hashedPassword = yield bcryptjs_1.default.hash(Password, 10);
            const existingUser = yield userSchema_1.default.findOne({ Email: Email });
            if (existingUser) {
                return res.json({ userExist: true, message: "User already exists" });
            }
            else {
                // Creating a new user
                const newUserData = yield userSchema_1.default.create({
                    Email,
                    Name,
                    Password: hashedPassword,
                    Mobile,
                });
                delete newUserData._doc.Password;
                const jwt = (0, JwtAuth_1.generateJWT)(newUserData._id.toString(), userRole);
                res.json({
                    status: 200,
                    user: newUserData,
                    created: true,
                    token: jwt,
                    message: "success! User LoggedIn",
                });
            }
        }
        catch (error) {
            res.json({
                user: "",
                message: `something went wrong: ${error}`,
                token: "",
                status: 400,
            });
        }
    }),
    TheatreLogin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { Email, Password } = req.body;
            const theatreData = yield theaterSchema_1.default.findOne({ Email: Email });
            console.log("theatreDta", theatreData);
            if (!theatreData) {
                return res.json({
                    status: 400,
                    created: false,
                    messsage: "Theatre not found/exist",
                });
            }
            if (theatreData.approvalStatus) {
                return res.json({
                    status: 400,
                    created: false,
                    messsage: "Theatre blocked",
                });
            }
            if (theatreData) {
                const validPassword = yield bcryptjs_1.default.compare(Password, theatreData.Password);
                if (validPassword) {
                    const _a = theatreData.toObject(), { Password } = _a, theatreWithoutPassword = __rest(_a, ["Password"]); // Exclude Password field
                    const token = (0, JwtAuth_1.generateJWT)(theatreData._id.toString(), theatreRole);
                    res.status(200).json({
                        status: 200,
                        theatre: theatreWithoutPassword,
                        created: true,
                        token: token,
                        message: "Success Theatre LoggedIn",
                    });
                }
                else {
                    res.json({
                        status: 400,
                        created: false,
                        token: "",
                        message: "password not matched",
                    });
                }
            }
        }
        catch (err) {
            return res.json({
                status: 400,
                token: "",
                message: `something went wrong: ${err}`,
            });
        }
    }),
    TheatreSignUp: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { Email, Name, Location, Password, } = req.body;
            let hashedPassword = yield bcryptjs_1.default.hash(Password, 10);
            const existingtheatre = yield theaterSchema_1.default.findOne({ Email: Email });
            if (existingtheatre) {
                return res.json({
                    status: 400,
                    theatreExist: true,
                    message: "Theatre already exists",
                });
            }
            else {
                const newTheatreData = yield theaterSchema_1.default.create({
                    Email,
                    Name,
                    Location,
                    Password: hashedPassword,
                });
                delete newTheatreData._doc.Password;
                const jwt = (0, JwtAuth_1.generateJWT)(newTheatreData._id.toString(), theatreRole);
                res.json({
                    status: 200,
                    theatre: newTheatreData,
                    created: true,
                    token: jwt,
                    message: "success! Theatre LoggedIn",
                });
            }
        }
        catch (error) {
            res.json({
                status: 400,
                token: "",
                message: "password not matched",
            });
        }
    }),
    adminLogin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { Email, Password } = req.body;
            const adminFile = yield adminSchema_1.default.findOne({ Email: Email });
            if (adminFile) {
                bcryptjs_1.default.compare(Password, adminFile.Password, function (err, result) {
                    if (result === true) {
                        //generate jwt and send to client
                        const admin_id = adminFile._id.toString();
                        const jwt = (0, JwtAuth_1.generateJWT)(admin_id, adminRole);
                        res.json({
                            admin: adminFile,
                            created: true,
                            token: jwt,
                            status: 200,
                            message: "success! Admin LoggedIn",
                        });
                    }
                    else {
                        return res.json({
                            status: 400,
                            login_status: false,
                            token: "",
                            message: "invalid admin credentials",
                        });
                    }
                });
            }
            else {
                return res.json({
                    status: 400,
                    login_status: false,
                    token: "",
                    message: "invalid admin username or password",
                });
            }
        }
        catch (error) {
            res.json({
                status: 400,
                loginStatus: false,
                message: `something went wrong: ${error}`,
            });
        }
    }),
    usergLogin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { Email, Name } = req.body;
            const userFile = yield userSchema_1.default.findOne({ Email: Email });
            if (userFile) {
                const user_id = userFile._id.toString();
                const jwt = (0, JwtAuth_1.generateJWT)(user_id, userRole);
                res.json({
                    status: 200,
                    user: userFile,
                    created: true,
                    token: jwt,
                    message: "success ! User LoggedIn",
                });
            }
            else {
                const defaultMobile = 1111111111;
                const newGUserData = yield userSchema_1.default.create({
                    Email,
                    Name,
                    Mobile: defaultMobile,
                });
                const jwt = (0, JwtAuth_1.generateJWT)(newGUserData._id.toString(), userRole);
                res.json({
                    status: 200,
                    user: newGUserData,
                    created: true,
                    token: jwt,
                    message: "success ! User LoggedIn",
                });
            }
        }
        catch (error) {
            res.json({
                status: 400,
                loginStatus: false,
                message: `something went wrong: ${error}`,
            });
        }
    }),
};
exports.default = authController;
