import Express from 'express';
import Mongoose from 'mongoose';
import cors from 'cors'
import raisingRouter from './routes/raising';
import authRouter from './routes/auth';
import userRouter from './routes/user';
import { getWithdrawals, makeWithdraw } from './controllers/raising';
import { authMiddleware } from './middlewares/middleware';

const app = Express();

// MongoDB Connection

(async () => {
    Mongoose.connect(process.env.MONGO_URL ?? '')
        .then(() => console.log('Connected Successfully'))
        .catch(err => console.log(err))
})();

// Middlewares

app.use(cors())
    .use(Express.json())
    .use('/raising', raisingRouter)
    .use('/auth',authRouter)
    .use('/users',userRouter)
    .post('/withdraw/:id',authMiddleware,makeWithdraw)
    .get('/withdraw',authMiddleware,getWithdrawals)

// Server Listening

app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`);
})