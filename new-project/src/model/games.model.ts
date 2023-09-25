import mongoose, { Document } from "mongoose";

export interface GamesDocument extends Document {
    boardSize: number;
    date: string,
    gameOutcome: string,
    gameHistory: [[string]]
}

const gameSchema = new mongoose.Schema({
    boardSize: { type: Number, required: true },
    date: { type: String, required: true },
    gameOutcome: { type: String, required: true },
    gameHistory: { type: [[String]], required: true }
});

export default mongoose.model<GamesDocument>('Game', gameSchema);