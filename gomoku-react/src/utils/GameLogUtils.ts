import { GameLog } from "../types/GameLogType";

export function saveGameLog(gl: GameLog) {
    // get the local stored game logs and append the new game log
    const str = localStorage.getItem('gameLogs')
    let gameLogs = []
    if (str !== null) {
        gameLogs = JSON.parse(str)
    }
    gameLogs.push(gl)
    localStorage.setItem('gameLogs', JSON.stringify(gameLogs))
}

export function getSavedGameLogCount(): number {
    // get the local stored game logs that have key: gameLogs
    const str = localStorage.getItem('gameLogs')
    if (str === null) return 0;
    const gameLogs:Array<GameLog> = JSON.parse(str)
    return gameLogs.length
}

