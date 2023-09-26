
import { useCallback, useContext, useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserContext"

import { useLocalStorage } from "../hooks/useLocalStorage"

import { GameLogEntry, GameLogEntryProps } from "../components/GameLogEntry"
import { GameLog } from "../types/GameLogType"

import { get } from '../utils/http'

export default function GameHistoryPage() {

    //const [gameLogs] = useLocalStorage("gameLogs", [])

    // get gameLogs from DB instead of local storage now!
    const [gameLogs, setGameLogs] = useState<Array<GameLog>>([])

    const navigate = useNavigate()


    const fetchGameLogs = useCallback(async () => {
        try {
            const result: any = await get('http://localhost:8080/games')
            setGameLogs(result.games)
        }
        catch (error) {
            console.log(error)
            navigate('/')
        }
    }, [navigate])

    useEffect(() => {
        fetchGameLogs()
    }, [fetchGameLogs])

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