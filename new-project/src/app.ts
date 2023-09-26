import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import testRouter from './router/test.router'
import gamesRouter from './router/games.router'

import connectDB from './util/connectDB';

import { getAllGames } from './service/games.service';

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


app.use('/test', testRouter);
app.use('/games', gamesRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World! From the server');
});
    
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

/*

app.get('/games', async (req: Request, res: Response) => {
    try {
        const games = await getAllGames();
        return res.status(200).json({ games });
    }
    catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }
    
});

*/