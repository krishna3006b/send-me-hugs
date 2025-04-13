"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecret = (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : 'sendMeHugs';
function authMiddleware(req, res, next) {
    var _a;
    const token = (_a = req.headers['authorization']) !== null && _a !== void 0 ? _a : "";
    try {
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        if (typeof decoded === 'object' && 'email' in decoded) {
            req.email = decoded.email;
            next();
        }
        else {
            res.status(403).json({ msg: "User not Authorized" });
        }
    }
    catch (e) {
        res.status(403).json({ success: false, message: "User not Authorized" });
    }
}
