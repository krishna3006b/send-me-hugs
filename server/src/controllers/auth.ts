import { Request, Response } from 'express';
import { User } from '../models/models';
import jwt from 'jsonwebtoken';
import { CustomRequest, googleLoginSchema, loginSchema, logoutSchema, signupSchema, SignupType, updateUserSchema } from '../types';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const jwtSecret = process.env.JWT_SECRET ?? 'sendMeHugs';

const handleZodErrors = (error: z.ZodError) => {
    // return Object.values(error.format()).flat().map((err: any) => err.message).join(', ');
    return error.errors;
};

export const signup = async (req: Request, res: Response) => {
    try {
        const result = signupSchema.safeParse(req.body);

        if (!result.success) {
            const errorMessage = handleZodErrors(result.error);
            return res.status(400).json({ success: false, message: errorMessage });
        }

        const { email, password, ...rest } = result.data as SignupType;

        let user = await User.findOne({ email });
        if (user) {
            res.status(409).json({ success: false, message: "User already exists" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user = new User({ ...rest, email, password: hashedPassword, token: '' });

        let token;
        try {
            token = jwt.sign({ email: user.email }, jwtSecret);
        } catch (err) {
            res.status(500).json({ success: false, message: "Signup Failed", error: err instanceof Error ? err.message : 'Internal Error' });
            return;
        }

        user.token = token;

        try {
            await user.save();
            user = await User.findOne({ email }).select(['-_id', '-__v', '-password']).exec()
            res.status(201).json({ success: true, message: "User created successfully", user });
        } catch (saveError) {
            res.status(500).json({ success: false, message: "Signup Failed", error: saveError instanceof Error ? saveError.message : 'Internal Error' });
        }

    } catch (error) {
        res.status(500).json({ success: false, message: "Signup Failed", error: error instanceof Error ? error.message : 'Internal Error' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const result = loginSchema.safeParse(req.body);

        if (!result.success) {
            const errorMessage = handleZodErrors(result.error);
            return res.status(400).json({ success: false, message: errorMessage });
        }

        const { email, password } = result.data;

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ success: false, message: "Invalid password" });
        }

        const token = jwt.sign({ email: user.email }, jwtSecret);
        user.token = token;

        await user.save();
        user = await User.findOne({ email }).select(['-_id', '-__v', '-password']).exec()
        res.status(200).json({ success: true, message: "User logged in successfully", user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to Login', error: error instanceof Error ? error.message : 'Internal Error' });
    }
};

export const googleLogin = async (req: Request, res: Response) => {
    try {
        const result = googleLoginSchema.safeParse(req.body);

        if (!result.success) {
            const errorMessage = handleZodErrors(result.error);
            return res.status(400).json({ success: false, message: errorMessage });
        }

        const { email } = result.data;

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const token = jwt.sign({ email: user.email }, jwtSecret);
        user.token = token;

        await user.save();
        user = await User.findOne({ email }).select(['-_id', '-__v', '-password']).exec()
        res.status(200).json({ success: true, message: "User logged in successfully", user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Google Login Error', error: error instanceof Error ? error.message : 'Internal Error' });
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        const result = logoutSchema.safeParse(req.body);

        if (!result.success) {
            const errorMessage = handleZodErrors(result.error);
            return res.status(400).json({ success: false, message: errorMessage });
        }

        const { email } = result.data;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        user.token = '';
        await user.save();
        res.status(200).json({ success: true, message: "User logged out successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error', error: error instanceof Error ? error.message : 'Internal Error' });
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find()
        if (users.length === 0) {
            return res.status(404).json({ success: false, message: "Users not found" });
        }
        res.status(200).json({ success: true, users });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch users', error: error instanceof Error ? error.message : 'Internal Error' });
    }
};

export const getUser = async (req: CustomRequest, res: Response) => {
    try {

        let user = await User.findOne({ email: req.email }).populate('fundraisings').exec();
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch user', error: error instanceof Error ? error.message : 'Internal Error' });
    }
};

export const updateUser = async (req: CustomRequest, res: Response) => {
    try {
        const result = updateUserSchema.safeParse(req.body);

        if (!result.success) {
            const errorMessage = handleZodErrors(result.error);
            return res.status(400).json({ success: false, message: errorMessage });
        }

        const hashedPassword = await bcrypt.hash(result.data.password ?? '', 10);
        const user = await User.findOneAndUpdate({ email: req.email }, { ...result.data, password: hashedPassword }, { new: true }).select(['-_id', '-__v', '-password']).exec();

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, message: "User updated successfully", user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update user', error: error instanceof Error ? error.message : 'Internal Error' });
    }
};

export const removeUser = async (req: CustomRequest, res: Response) => {
    try {
        const user = await User.findOneAndDelete({ email: req.email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete user', error: error instanceof Error ? error.message : 'Internal Error' });
    }
};
