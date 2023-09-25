import express, { Request, Response } from 'express';

const testRouter = express.Router();

testRouter.get('/', (req: Request, res: Response) => {
    //res.send('Hello World! From the test router');
    res.status(200).json({ message: 'Hello World! From the test router' });
});

testRouter.put('/:id', (req: Request, res: Response) => {
    // test put
    const id = req.params.id;
    const body = req.body;
    console.log(id)
    console.log(body);
    res.status(200).json({ message: `Hello World! From the test router with id ${id}` });
});



// game api

// - API endpoint to retrieve a list of played games = easy, just get from DB
// - API endpoint to retrieve a single game (with a game ID) = easy, 
// - API endpoint to create a new game = easy, 
// - API endpoint to update the current moves and respond with a current game status = gonna need to transfer game logic to backend
// - Game history API is integrated with web application correctly (idk what this means)








export default testRouter;