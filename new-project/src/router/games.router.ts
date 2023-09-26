import express, { Request, Response } from 'express';
import { getAllGames, createGame, getGameById } from '../service/games.service';

import { checkGomokuDraw, checkGomokuWin } from '../util/checkGameStatus';

const gamesRouter = express.Router();

gamesRouter.get('/', async (req: Request, res: Response) => {
    console.log(`GET /games`);
    try {
        const games = await getAllGames();
        return res.status(200).json({ games });
    }
    catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }
    
});

gamesRouter.get('/:id', async (req: Request, res: Response) => {
    console.log(`GET /games/:id`);
    const id = req.params.id;
    try {
        const game = await getGameById(id);
        return res.status(200).send(game);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    
});

gamesRouter.post('/', async (req: Request, res: Response) => {
    console.log(`POST /games`);
    const body = req.body;
    const newGame = await createGame(body);
    return res.status(200).send(newGame)
});


// Handles calculating a gameResult provided with the correct information.
gamesRouter.put('/gameResult', async (req: Request, res: Response) => {
    console.log(`PUT /games/gameResult`);
    const body = req.body;
    //console.log(body);
    let win = false;
    let draw = false;

    try {
        win = checkGomokuWin(body.grid, body.gridSize, body.cellIndex, body.valueToCheck);
        draw = checkGomokuDraw(body.grid, 'empty');
    }
    catch {
        return res.status(500).send('Error checking game status');
    }

    return res.status(200).send({ win, draw });

});


export default gamesRouter;