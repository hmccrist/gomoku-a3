
import { useCallback, useContext, useEffect, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../context/UserContext"
import { GameLog } from "../types/GameLogType"
import { useLocalStorage } from "../hooks/useLocalStorage"
import Game from "../components/gomoku/Game"
import { get } from "../utils/http"
import { API_HOST } from "../constants"

export default function GameLogPage() {

    const { id } = useParams()
    //const [gameLogs] = useLocalStorage("gameLogs", [])

    // get gameLogs from DB instead of local storage now!
    const [gameLogs, setGameLogs] = useState<Array<GameLog>>([])
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    const fetchGameLogs = useCallback(async () => {
        try {
            const result: any = await get(`${API_HOST}/games`)
            setGameLogs(result.games)
            setLoading(false)
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

    // If ID is undefined or ID is not in gameLogs, redirect to home page
    //console.log(id)
    //console.log(gameLogs)
    if (!id) return <Navigate to="/" />
    
    function createProps(id: number) {
        if (gameLogs.length === 0) return {}
        const props = {
            initGameHistory: gameLogs[id].gameHistory as ("empty" | "black" | "white")[][],
            readonly: true,
            boardSize: gameLogs[id].boardSize,
            outcome: gameLogs[id].gameOutcome
        }
        return props
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <Game {...createProps(parseInt(id))}/>
        </>
    )
}
