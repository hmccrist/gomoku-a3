
import { useContext } from "react"
import { Navigate, useParams } from "react-router-dom"
import { UserContext } from "../context/UserContext"
import { GameLog } from "../types/GameLogType"
import { useLocalStorage } from "../hooks/useLocalStorage"
import Game from "../components/gomoku/Game"

export default function GameLogPage() {

    const { id } = useParams()
    const [gameLogs] = useLocalStorage("gameLogs", [])

    // Page is protected, if user is not logged in, redirect to login page
    const { user } = useContext(UserContext)
    if (!user) return <Navigate to="/login" />

    // If ID is undefined or ID is not in gameLogs, redirect to home page
    if (!id || !gameLogs[parseInt(id)]) return <Navigate to="/" />

    const idNumber = parseInt(id)

    // Create a read-only Game component with the predefined GameLog as its history.
    const gameLog = gameLogs[idNumber] as GameLog
    const gameHistory = gameLog.gameHistory as ("empty" | "black" | "white")[][]
    const boardSize = gameLog.boardSize
    const gameOutcome = gameLog.gameOutcome

    return (
        <>
            <Game initGameHistory={gameHistory} readonly={true} boardSize={boardSize} outcome={gameOutcome}/>
        </>
    )
}
