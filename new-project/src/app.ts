import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import testRouter from './router/test.router'
import connectDB from './util/connectDB';

dotenv.config();

// connect to database
connectDB();

const app: Express = express();
const port = process.env.PORT || '8080';
app.use(express.json());

app.use('/test', testRouter);

mongoose.connection.once(port, () => {

    app.get('/', (req: Request, res: Response) => {
        res.send('Hello World! From the server');
      });
      
    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });

});

