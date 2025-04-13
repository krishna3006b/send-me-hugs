import { Request } from "express";
import mongoose, { Document, Schema } from "mongoose";
import { z } from "zod";

export interface IRaising extends Document {
    walletAddress?: string;
    id?: string;
    address?: string;
    donors: {
        user: Schema.Types.ObjectId, amount: number, donatedAt:Date , status:string
    }[];
    images?: string[];
    certificate?: string;
    amountDonated: number;
    role?: "NGO" | "Individual";
    name: string;
    email: string;
    title: string,
    story: string,
    thumbnail?: string,
    user: string,
    // youtube?: string,
    category: string,
    fundraisingFor: string,
    amount: number,
    location: string;
    isCompleted: boolean;
    createdAt: Date;
    amountWithdrawn:number;
}

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    walletAddress?: String;
    token?: string;
    dp?: string;
    fundraisings?: mongoose.Types.ObjectId[] | [];
    withdrawals?: mongoose.Types.ObjectId[] | [];
    location:string;
}

export interface IWithdraw extends Document {
    amount: number;
    status: String;
    date:  Date;
    user:mongoose.Types.ObjectId;
    fundraising: mongoose.Types.ObjectId;
}

export interface CustomRequest extends Request {
    email?: string;
    token?: string;
}

export const signupSchema = z.object({
    firstName: z.string().min(1, 'Enter First Name'),
    lastName: z.string().min(1, 'Enter Last Name'),
    email: z.string().min(1, 'Enter Email').email('Please enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    walletAddress: z.string().min(20,'Enter Wallet Address'),
});

export type SignupType = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email format'),
    password: z.string().min(1, 'Password is required'),
});

export const googleLoginSchema = z.object({
    email: z.string().email('Invalid email format'),
});

export const logoutSchema = z.object({
    email: z.string().email('Invalid email format'),
});

export const updateUserSchema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    password: z.string().min(8, 'Password must be at least 8 characters long').optional(),
    dp: z.string().optional(),
});