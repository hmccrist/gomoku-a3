
import { GameLog } from "../types/GameLogType"

import style from './GameLogEntry.module.css'

import { useNavigate } from "react-router-dom"

export type GameLogEntryProps = {
    id: number,
    gameLog: GameLog,
}

export function GameLogEntry(props: GameLogEntryProps) {
    const navigate = useNavigate()
    
    const date = new Date(props.gameLog.date).toLocaleDateString()
    const winnerText = () => {
        if (props.gameLog.gameOutcome === 'draw')
            return 'Game is a draw'
        else
            return `Winner: ${props.gameLog.gameOutcome === 'blackWin' ? 'Black' : 'White'}`
    }

    return (
        <div className={style.entryDiv}>
            <div style={{display: "flex", gap: '30px'}}>
                <p>Game #{props.id}</p>
                <p>@{date}</p>
                <p>{winnerText()}</p>
            </div>
            <div>
                <button className={style.button} onClick={() => {navigate(`/game-log/${props.id}`)}}>View game log</button>
            </div>
        </div>
    )

}