import { Router } from 'express'
import { getAllUsers, getUser, removeUser, updateUser } from '../controllers/auth';
import { authMiddleware } from '../middlewares/middleware';

const userRouter = Router();

userRouter
    .get('/all', getAllUsers)
    .get('/', authMiddleware, getUser)  
    .put("/", authMiddleware, updateUser)
    .delete('/', authMiddleware, removeUser)

export default userRouter