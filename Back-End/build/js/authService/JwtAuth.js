"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyjwt = exports.generateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const keys_1 = require("../config/keys");
const generateJWT = (id) => {
    try {
        if (keys_1.configKeys.JWT_SECRET_KEY) {
            const token = jsonwebtoken_1.default.sign({ id }, keys_1.configKeys.JWT_SECRET_KEY, {
                expiresIn: keys_1.configKeys.JWT_EXPIRATION
            });
            return token;
        }
    }
    catch (error) {
        console.error("Error generating JWT:", error);
        throw error;
    }
};
exports.generateJWT = generateJWT;
const verifyjwt = (token) => {
    if (keys_1.configKeys.JWT_SECRET_KEY) {
        const verifyjwtaaaa = jsonwebtoken_1.default.verify(token, keys_1.configKeys.JWT_SECRET_KEY);
        console.log("verifyjwtaaaa", verifyjwtaaaa);
        return verifyjwtaaaa;
    }
};
exports.verifyjwt = verifyjwt;
