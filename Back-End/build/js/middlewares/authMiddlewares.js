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
Object.defineProperty(exports, "__esModule", { value: true });
const JwtAuth_1 = require("../authService/JwtAuth");
const authMiddlewares = (role) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let token = null;
            if (req.headers.authorization &&
                req.headers.authorization.startsWith("Bearer ")) {
                token = req.headers.authorization.split(" ")[1];
            }
            const response = (0, JwtAuth_1.verifyjwt)(token);
            if (response && response.role === role) {
                next();
            }
            else {
                res.status(401).json({ message: "Unauthorized" });
            }
        }
        catch (error) {
            res.status(401).json({ message: "Token expired" });
        }
    });
};
exports.default = authMiddlewares;
