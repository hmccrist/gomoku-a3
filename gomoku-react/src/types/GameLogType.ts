export type GameLog = {
    boardSize: number;
    date: Date;
    gameOutcome: 'draw' | 'blackWin' | 'whiteWin';
    gameHistory: Array<string>[];
}