import 'dotenv/config'
import connect from './connectDB'

import gamesModel from '../model/games.model'
import games from '../data/games.json'

const run = async () => {
    try {
        await connect();

        await gamesModel.deleteMany();
        await gamesModel.insertMany(games);

        process.exit(0);
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
}

run();