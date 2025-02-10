// path: server/index.ts
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3002;
const url = process.env.NEXT_PUBLIC_URL || 'http://localhost:3002';

const app = express();

const allowedOrigins = [
    'http://localhost:3000', 
    'http://localhost:3002', 
    'https://twin-three.vercel.app'
];
app.use(express.json());
app.use(cors({
    origin: allowedOrigins
}));

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 5,
    message: 'Too many requests, please try again later.',
});

app.use(limiter);


app.listen(port, () => {
    console.log(`Server running at ${url}`);
});