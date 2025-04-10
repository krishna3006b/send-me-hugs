import { Router } from 'express'
import {  googleLogin, login, logout, signup } from '../controllers/auth';

const authRouter = Router();

authRouter
    .post("/signup", signup)
    .post('/login', login)
    .post('/google/login', googleLogin)
    .post('/logout', logout)

export default authRouter