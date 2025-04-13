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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUser = exports.updateUser = exports.getUser = exports.getAllUsers = exports.logout = exports.googleLogin = exports.login = exports.signup = void 0;
const models_1 = require("../models/models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const types_1 = require("../types");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwtSecret = (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : 'sendMeHugs';
const handleZodErrors = (error) => {
    // return Object.values(error.format()).flat().map((err: any) => err.message).join(', ');
    return error.errors;
};
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = types_1.signupSchema.safeParse(req.body);
        if (!result.success) {
            const errorMessage = handleZodErrors(result.error);
            return res.status(400).json({ success: false, message: errorMessage });
        }
        const _a = result.data, { email, password } = _a, rest = __rest(_a, ["email", "password"]);
        let user = yield models_1.User.findOne({ email });
        if (user) {
            res.status(409).json({ success: false, message: "User already exists" });
            return;
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        user = new models_1.User(Object.assign(Object.assign({}, rest), { email, password: hashedPassword, token: '' }));
        let token;
        try {
            token = jsonwebtoken_1.default.sign({ email: user.email }, jwtSecret);
        }
        catch (err) {
            res.status(500).json({ success: false, message: "Signup Failed", error: err instanceof Error ? err.message : 'Internal Error' });
            return;
        }
        user.token = token;
        try {
            yield user.save();
            user = yield models_1.User.findOne({ email }).select(['-_id', '-__v', '-password']).exec();
            res.status(201).json({ success: true, message: "User created successfully", user });
        }
        catch (saveError) {
            res.status(500).json({ success: false, message: "Signup Failed", error: saveError instanceof Error ? saveError.message : 'Internal Error' });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Signup Failed", error: error instanceof Error ? error.message : 'Internal Error' });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = types_1.loginSchema.safeParse(req.body);
        if (!result.success) {
            const errorMessage = handleZodErrors(result.error);
            return res.status(400).json({ success: false, message: errorMessage });
        }
        const { email, password } = result.data;
        let user = yield models_1.User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const passwordMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ success: false, message: "Invalid password" });
        }
        const token = jsonwebtoken_1.default.sign({ email: user.email }, jwtSecret);
        user.token = token;
        yield user.save();
        user = yield models_1.User.findOne({ email }).select(['-_id', '-__v', '-password']).exec();
        res.status(200).json({ success: true, message: "User logged in successfully", user });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to Login', error: error instanceof Error ? error.message : 'Internal Error' });
    }
});
exports.login = login;
const googleLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = types_1.googleLoginSchema.safeParse(req.body);
        if (!result.success) {
            const errorMessage = handleZodErrors(result.error);
            return res.status(400).json({ success: false, message: errorMessage });
        }
        const { email } = result.data;
        let user = yield models_1.User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const token = jsonwebtoken_1.default.sign({ email: user.email }, jwtSecret);
        user.token = token;
        yield user.save();
        user = yield models_1.User.findOne({ email }).select(['-_id', '-__v', '-password']).exec();
        res.status(200).json({ success: true, message: "User logged in successfully", user });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Google Login Error', error: error instanceof Error ? error.message : 'Internal Error' });
    }
});
exports.googleLogin = googleLogin;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = types_1.logoutSchema.safeParse(req.body);
        if (!result.success) {
            const errorMessage = handleZodErrors(result.error);
            return res.status(400).json({ success: false, message: errorMessage });
        }
        const { email } = result.data;
        const user = yield models_1.User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        user.token = '';
        yield user.save();
        res.status(200).json({ success: true, message: "User logged out successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error', error: error instanceof Error ? error.message : 'Internal Error' });
    }
});
exports.logout = logout;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield models_1.User.find();
        if (users.length === 0) {
            return res.status(404).json({ success: false, message: "Users not found" });
        }
        res.status(200).json({ success: true, users });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch users', error: error instanceof Error ? error.message : 'Internal Error' });
    }
});
exports.getAllUsers = getAllUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield models_1.User.findOne({ email: req.email }).populate('fundraisings').exec();
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch user', error: error instanceof Error ? error.message : 'Internal Error' });
    }
});
exports.getUser = getUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const result = types_1.updateUserSchema.safeParse(req.body);
        if (!result.success) {
            const errorMessage = handleZodErrors(result.error);
            return res.status(400).json({ success: false, message: errorMessage });
        }
        const hashedPassword = yield bcryptjs_1.default.hash((_a = result.data.password) !== null && _a !== void 0 ? _a : '', 10);
        const user = yield models_1.User.findOneAndUpdate({ email: req.email }, Object.assign(Object.assign({}, result.data), { password: hashedPassword }), { new: true }).select(['-_id', '-__v', '-password']).exec();
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, message: "User updated successfully", user });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update user', error: error instanceof Error ? error.message : 'Internal Error' });
    }
});
exports.updateUser = updateUser;
const removeUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield models_1.User.findOneAndDelete({ email: req.email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, message: "User deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete user', error: error instanceof Error ? error.message : 'Internal Error' });
    }
});
exports.removeUser = removeUser;
