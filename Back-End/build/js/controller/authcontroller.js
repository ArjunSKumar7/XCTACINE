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
const authController = {
    userLogin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { Email, Password } = req.body;
            const userData = yield userSchema_1.default.findOne({ Email: Email });
            if (!userData) {
                res.json({
                    created: false,
                    status: "user not found/exist",
                });
            }
            if (userData) {
                if (userData.blockedStatus) {
                    res.json({
                        created: false,
                        status: "user blocked",
                    });
                }
                if (userData.Password) {
                    const validPassword = yield bcryptjs_1.default.compare(Password, userData === null || userData === void 0 ? void 0 : userData.Password);
                    if (validPassword) {
                        const token = (0, JwtAuth_1.generateJWT)(userData._id.toString());
                        res.json({
                            user: userData,
                            created: true,
                            token: token,
                            status: "success",
                        });
                    }
                    else {
                        res.json({
                            created: false,
                            token: "",
                            status: "password not matched",
                        });
                    }
                }
            }
        }
        catch (err) {
            res.json({
                status: "failed",
                token: "",
                message: err,
            });
        }
    }),
    UserSignup: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("req", req.body);
            const { Email, Name, Password, Mobile, } = req.body;
            let hashedPassword = yield bcryptjs_1.default.hash(Password, 10);
            const existingUser = yield userSchema_1.default.findOne({ Email: Email });
            console.log("existingUser", existingUser);
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
                console.log("newUserData", newUserData._id.toString());
                const jwt = (0, JwtAuth_1.generateJWT)(newUserData._id.toString());
                console.log("jwt", jwt);
                console.log("newUserData", newUserData);
                res.json({
                    user: newUserData,
                    created: true,
                    token: jwt,
                    status: "success",
                });
            }
        }
        catch (error) {
            res.json({ user: "", status: `${error}`, token: "", message: "something went wrong   : ", error });
        }
    }),
    TheatreLogin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { Email, Password } = req.body;
            const theatreData = yield theaterSchema_1.default.findOne({ Email: Email });
            if (!theatreData) {
                return res.json({
                    created: false,
                    status: "user not found/exist",
                });
            }
            if (theatreData) {
                const validPassword = yield bcryptjs_1.default.compare(Password, theatreData.Password);
                if (validPassword) {
                    const _a = theatreData.toObject(), { Password } = _a, theatreWithoutPassword = __rest(_a, ["Password"]); // Exclude Password field
                    const token = (0, JwtAuth_1.generateJWT)(theatreData._id.toString());
                    res.json({
                        theatre: theatreWithoutPassword,
                        created: true,
                        token: token,
                        status: "success",
                    });
                }
                else {
                    res.json({
                        created: false,
                        token: "",
                        status: "password not matched",
                    });
                }
            }
        }
        catch (err) {
            return res.json({
                status: "failed",
                token: "",
                message: err.message,
            });
        }
    }),
    TheatreSignUp: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("req", req.body);
        try {
            const { Email, Name, Location, Password, } = req.body;
            let hashedPassword = yield bcryptjs_1.default.hash(Password, 10);
            const existingtheatre = yield theaterSchema_1.default.findOne({ Email: Email });
            if (existingtheatre) {
                return res.json({
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
                const jwt = (0, JwtAuth_1.generateJWT)(newTheatreData._id.toString());
                res.json({
                    theatre: newTheatreData,
                    created: true,
                    token: jwt,
                    status: "success",
                });
            }
        }
        catch (error) {
            res.json({ status: "failed", token: "", message: "password not matched" });
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
                        const jwt = (0, JwtAuth_1.generateJWT)(admin_id);
                        res.json({
                            admin: adminFile,
                            created: true,
                            token: jwt,
                            status: "success",
                        });
                    }
                    else {
                        return (res
                            // .status(401)
                            .json({
                            login_status: false,
                            token: "",
                            message: "invalid admin credentials",
                        }));
                    }
                });
            }
            else {
                return res.json({
                    login_status: false,
                    token: "",
                    message: "invalid admin username or password",
                });
            }
        }
        catch (error) {
            console.log("backendloginerror", error);
        }
    }),
    usergLogin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { Email, Name } = req.body;
            const userFile = yield userSchema_1.default.findOne({ Email: Email });
            if (userFile) {
                const user_id = userFile._id.toString();
                const jwt = (0, JwtAuth_1.generateJWT)(user_id);
                res.json({
                    user: userFile,
                    created: true,
                    token: jwt,
                    status: "success",
                });
            }
            else {
                const newGUserData = yield userSchema_1.default.create({
                    Email,
                    Name,
                });
                const jwt = (0, JwtAuth_1.generateJWT)(newGUserData._id.toString());
                res.json({
                    user: newGUserData,
                    created: true,
                    token: jwt,
                    status: "success",
                });
            }
        }
        catch (error) {
            res.json({ error, loginStatus: false, message: "login failed" });
        }
    }),
};
exports.default = authController;
