
import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { UserContext } from "../context/UserContext"

import { useLocalStorage } from "../hooks/useLocalStorage"

import { GameLogEntry, GameLogEntryProps } from "../components/GameLogEntry"
import { GameLog } from "../types/GameLogType"

export default function GameHistoryPage() {

    const [gameLogs] = useLocalStorage("gameLogs", [])

    // Page is protected, if user is not logged in, redirect to login page
    const { user } = useContext(UserContext)
    if (!user) return <Navigate to="/login" />

    function createGameLogEntryProps(gl: GameLog, index: number) {
        const props: GameLogEntryProps = {
            id: index,
            gameLog: gameLogs[index],
        }
        return props
    }

    function createGameLogEntries() {
        const entries = gameLogs.map((gameLog, index) => {
            return <GameLogEntry key={index} {...createGameLogEntryProps(gameLog, index)}/>
        })
        return entries
    }

    return <div>
        <div style={ {display: "flex", flexDirection: 'column-reverse', margin: '20px', gap: '10px'}}>
            {createGameLogEntries()}
        </div>
    </div>
}