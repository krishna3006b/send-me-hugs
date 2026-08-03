import Express, { Request, Response, NextFunction } from 'express';
import Mongoose from 'mongoose';
import cors from 'cors';
import raisingRouter from './routes/raising';
import authRouter from './routes/auth';
import userRouter from './routes/user';
import { getWithdrawals, makeWithdraw } from './controllers/raising';
import { authMiddleware } from './middlewares/middleware';

const app = Express();

// MongoDB Connection Caching for Serverless
let isConnected = false;
async function connectDB() {
    if (isConnected || Mongoose.connection.readyState >= 1) {
        isConnected = true;
        return;
    }
    try {
        await Mongoose.connect(process.env.MONGO_URL ?? '');
        isConnected = true;
        console.log('Connected to MongoDB Successfully');
    } catch (err) {
        console.error('MongoDB Connection Error:', err);
    }
}

// Connect to DB middleware
app.use(async (req: Request, res: Response, next: NextFunction) => {
    await connectDB();
    next();
});

// Middlewares & Routes
app.use(cors())
    .use(Express.json())
    .use('/raising', raisingRouter)
    .use('/auth', authRouter)
    .use('/users', userRouter)
    .post('/withdraw/:id', authMiddleware, makeWithdraw)
    .get('/withdraw', authMiddleware, getWithdrawals);

// Health Check Endpoint
app.get('/', (req: Request, res: Response) => {
    res.send('Send-Me-Hugs Server is running on Vercel!');
});

// Local Server Listening
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
}

export default app;