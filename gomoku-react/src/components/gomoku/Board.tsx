import { Square, SquareProps } from './Square';

import style from './Game.module.css';

export type BoardProps = {
    boardSize: number;
    squares: Array<SquareProps['value']>;
    squaresNumber?: Array<number>;
    onPlay: (squareClicked: number) => void;
    playerTurn: 'white' | 'black';
}

export default function Board(props: BoardProps) {

    // Create the props for a square given its index
    function createSquareProps(i: number): SquareProps {
        return {
            value: props.squares[i],
            onSquareClick: () => props.onPlay(i),
            currentPlayer: props.playerTurn,
            squareNumber: props.squaresNumber ? props.squaresNumber[i] : undefined
        }
    }

    // Create the board by creating rows with squares and then returning the JSX.
    function createBoard(size: number) {
        const boardJSX: Array<JSX.Element> = [];
        for (let i = 0; i < size; i++) {
            const rowJSX: Array<JSX.Element> = [];
            for (let j = 0; j < size; j++) {
                const squareID = i * size + j;
                rowJSX.push( <Square {...createSquareProps(squareID)} key={squareID} /> );  // Square JSX
            }
            boardJSX.push(
                <div className="board-row" key={i}> {rowJSX} </div>     // Row JSX
            );
        }
        return boardJSX;
    }

    return (
        <div className={style['game-container']}>
            {createBoard(props.boardSize)}
        </div>
    )
}