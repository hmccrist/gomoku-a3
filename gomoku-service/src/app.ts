import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import gamesRouter from './router/games.router'

import connectDB from './util/connectDB';

dotenv.config();

// connect to database
connectDB();

const app: Express = express();
const port = process.env.PORT || '8080';
app.use(express.json());

// cors
app.use(
    cors({
        origin: true,
    })
)

app.use('/games', gamesRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World! From the server');
});
    
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});