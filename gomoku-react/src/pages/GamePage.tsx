import Game from "../components/gomoku/Game";

import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { UserContext } from "../context/UserContext"

export default function GamePage() {

    // Page is protected, if user is not logged in, redirect to login page
    const { user } = useContext(UserContext)
    if (!user) return <Navigate to="/login" />

    return (
        <>
            <Game />
        </>
    )
}