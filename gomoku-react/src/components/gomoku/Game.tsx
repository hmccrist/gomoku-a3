/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";

import Board, { BoardProps } from "./Board";
import { SquareProps } from "./Square";
import { checkGomokuWin, checkGomokuDraw } from "../../utils/GomokuUtils";
import style from './Game.module.css'
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { GameLog } from "../../types/GameLogType";
import { saveGameLog, saveGameLogDB } from "../../utils/GameLogUtils";
import { get, put } from '../../utils/http'
import { API_HOST } from "../../constants";

type PlayerTurn = 'white' | 'black'
type gameState = 'playing' | 'draw' | 'blackWin' | 'whiteWin'

// Right now these props are only used for readonly games.
export type GameProps = {
    readonly?: boolean,
    initGameHistory?: Array<Array<SquareProps['value']>>,
    boardSize?: number
    outcome?: gameState
}

export default function Game(props: GameProps) {
    const [boardSize, setBoardSize] = useState(3)
    const [history, setHistory] = useState([Array<SquareProps['value']>(boardSize * boardSize).fill('empty')])
    const [currentMove, setCurrentMove] = useState(0)
    const [playerTurn, setPlayerTurn] = useState<PlayerTurn>('black')
    const [gameState, setGameState] = useState<gameState>('playing')
    const [sliderValue, setSliderValue] = useState(0)
    const currentSquares = history[currentMove]
    const location = useLocation()
    const navigate = useNavigate()

    // testing a get request
    //const API_HOST = "http://localhost:8080"
    const API_URL = `${API_HOST}/games/gameResult`
    type resultJSON = {
        win: boolean,
        draw: boolean
    }

    const test = useCallback(async (nextSquares: Array<string>, boardSize: number, squareClicked: number, playerTurn: string) => {
        try {
            const data = {
                grid: nextSquares,
                gridSize: boardSize,
                cellIndex: squareClicked,
                valueToCheck: playerTurn
            }
            console.log(data)
            //console.log(`Sending request to server... ${API_URL}`)

            const result: resultJSON = await put(API_URL, data)
            return result
        }
        catch (error) {
            console.log(error)
        }
    }, [])


    // Set the board size initially based on the location state.
    // This is used when navigating from the homepage.
    // Won't run if the location state is undefined.
    useEffect(() => {
        try {
            const boardSize = parseInt(location.state.boardSize)
            if (boardSize > 0) {
                changeBoardSize(boardSize)
            }
        } catch { }
    }, [])

    // If a readonly game then set boardsize and history based on props.
    useEffect(() => {
        if (props.readonly) {
            if (!props.boardSize || !props.initGameHistory || !props.outcome) {
                throw new Error('If readonly, boardSize, initGameHistory and outcome are required.')
            }
            setBoardSize(props.boardSize)
            setHistory(props.initGameHistory)
            setCurrentMove(props.initGameHistory.length - 1)
            setGameState(props.outcome)
            setSliderValue(props.initGameHistory.length - 1) // Set slider value to the last move.
        }
    }, [])

    // Ran when a square is clicked.
    // nextSquares is the new squares array to be set.
    async function handleClick(squareClicked: number) {

        // If the game is over, don't do anything.
        if (gameState !== 'playing') return

        // Create nextSquares which is currentSquares + the new square.
        const nextSquares = currentSquares.slice()
        // If the square is already filled, return.
        if (nextSquares[squareClicked] !== 'empty') return
        // Otherwise, set the square to the player's turn.
        nextSquares[squareClicked] = playerTurn 

        // Get a gameResult from the backend - if no response then return with an error.
        const result = await test(nextSquares, boardSize, squareClicked, playerTurn)
        if (!result) {
            console.log('Error: no response from server.')
            return
        }
        console.log(`win: ${result.win} draw: ${result.draw}`)

        // Update history
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
        setHistory(nextHistory)
        // Update current move
        setCurrentMove(nextHistory.length - 1)    
        
        // Check for win or draw - this now done over backend

        if (result.win) {
            setGameState(playerTurn === 'white' ? 'whiteWin' : 'blackWin')
            return
        }

        if (result.draw) {
            setGameState('draw')
            return
        }
        
        // Update player turn
        setPlayerTurn(playerTurn === 'white' ? 'black' : 'white')
    }

    function checkWin(grid: Array<string>, gridSize: number, cellIndex: number, valueToCheck: string): boolean {
        const win = checkGomokuWin(grid, gridSize, cellIndex, valueToCheck)
        if (win) {
            return true
        }
        return false
    }

    function resetGame(size: number) {
        setHistory([Array<SquareProps['value']>(size * size).fill('empty')])
        setCurrentMove(0)
        setPlayerTurn('black')
        setGameState('playing')
    }

    // Changing board size resets the game.
    function changeBoardSize(newSize: number) {
        setBoardSize(newSize)
        resetGame(newSize)
    }

    // returns an array of numbers where each numbers index corresponds to the turn that the square was played.
    function createSquareHistory(historyArr: Array<Array<SquareProps['value']>>): Array<number> {
        const hArr = historyArr.slice()
        const squareHistory: Array<number> = []
        for (let i = 0; i < hArr.length; i++) {
            const squares = hArr[i]
            for (let j = 0; j < squares.length; j++) {
                const square = squares[j]
                if (square !== 'empty' && squareHistory[j] === undefined) {
                    squareHistory[j] = i
                    break
                }
            }
        }
        return squareHistory
    }

    function createBoardProps(): BoardProps {
        return {
            boardSize: boardSize,
            squares: currentSquares,
            onPlay: handleClick,
            playerTurn: playerTurn,
            squaresNumber: props.readonly ? createSquareHistory(history) : []
        }
    }

    function getHeaderText(): string {
        if (gameState === 'playing') {
            return `Current Player: ${playerTurn.charAt(0).toUpperCase() + playerTurn.slice(1)}`
        } else if (gameState === 'draw') {
            return 'Draw!'
        } else if (gameState === 'blackWin') {
            return 'Black Wins!'
        } else if (gameState === 'whiteWin') {
            return 'White Wins!'
        }
        return ''
    }

    // Returns undefined if game is not finished.
    function createGameLog(): GameLog | undefined {
        if (gameState === 'playing') return
        return {
            boardSize: boardSize,
            date: new Date(),
            gameOutcome: gameState,
            gameHistory: history
        }
    }


    // If game is not finished, navigate to homepage.
    // If game is finished, store a GameLog in local storage and then navigate to GameLogPage
    async function handleLeave() {
        if (gameState === 'playing') {
            navigate('/')
            return
        }
        const gameLog = createGameLog()
        if (gameLog) {
            //saveGameLog(gameLog)
            await saveGameLogDB(gameLog)
        }
        navigate('/games')
    }

    return (
        <>
            <h1 className={style['game-header-text']}>{getHeaderText()}</h1>
            <div style={ {textAlign:'center'}}> Turns: {currentMove}</div>
            <Board {...createBoardProps()} />
            { !props.readonly &&
                <div className={style.footerButtonsContainer}>
                    <button className={style.footerButtons} onClick = {() => resetGame(boardSize)}>Restart</button>
                    <button className={style.footerButtons} onClick = {() => handleLeave()}>Leave</button>
                </div>
            }
            { props.readonly &&
            <>
                <div className={style.sliderContainer}>
                    <p>Current Move: {sliderValue}</p>
                    <input type="range" min="0" max={history.length-1} value={sliderValue} onChange={(e) => { 
                        setSliderValue(parseInt(e.target.value))
                        setCurrentMove(parseInt(e.target.value))
                    }}/>
                </div>
                <div className={style.footerButtonsContainer}>
                    <button className={style.footerButtons} onClick = {() => navigate('/games')}>Back</button>
                </div>
            </>
            }
        </>
    )
}
