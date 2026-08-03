import { NextFunction, Response } from "express";
import jwt from 'jsonwebtoken';
import { CustomRequest } from "../types";

const jwtSecret = process.env.JWT_SECRET ?? 'sendMeHugs';

export function authMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
    let token = (req.headers['authorization'] || '').trim();

    if (token.startsWith('Bearer ')) {
        token = token.slice(7).trim();
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);

        if (typeof decoded === 'object' && decoded !== null && 'email' in decoded) {
            req.email = (decoded as { email: string }).email;
            next();
        } else {
            res.status(403).json({ success: false, message: "User not Authorized" });
        }

    } catch (e) {
        res.status(403).json({ success: false, message: "User not Authorized" });
    }
}