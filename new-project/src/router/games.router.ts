import express, { Request, Response } from 'express';
import { getAllGames, createGame, getGameById } from '../service/games.service';

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


export default gamesRouter;