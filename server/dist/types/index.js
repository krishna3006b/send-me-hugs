"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.logoutSchema = exports.googleLoginSchema = exports.loginSchema = exports.signupSchema = void 0;
const zod_1 = require("zod");
exports.signupSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1, 'Enter First Name'),
    lastName: zod_1.z.string().min(1, 'Enter Last Name'),
    email: zod_1.z.string().min(1, 'Enter Email').email('Please enter a valid email'),
    password: zod_1.z.string().min(8, 'Password must be at least 8 characters long'),
    walletAddress: zod_1.z.string().min(20, 'Enter Wallet Address'),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().min(1, 'Email is required').email('Invalid email format'),
    password: zod_1.z.string().min(1, 'Password is required'),
});
exports.googleLoginSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email format'),
});
exports.logoutSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email format'),
});
exports.updateUserSchema = zod_1.z.object({
    firstName: zod_1.z.string().optional(),
    lastName: zod_1.z.string().optional(),
    password: zod_1.z.string().min(8, 'Password must be at least 8 characters long').optional(),
    dp: zod_1.z.string().optional(),
});
