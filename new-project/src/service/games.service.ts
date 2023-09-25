import gamesModel, { GamesDocument } from "../model/games.model";

export async function getAllGames() {
  return await gamesModel.find().lean();
}

export async function getGameById(id: string) {
  return await gamesModel.findById(id).lean();
}

export async function createGame(game: GamesDocument) {
    return await gamesModel.create(game);
}