import style from './Game.module.css'

import { GamePiece } from './GamePiece';

export type SquareProps = {
    value: 'empty' | 'black' | 'white';
    onSquareClick: () => void;
    currentPlayer: 'black' | 'white';
    squareNumber?: number
}

export function Square(props: SquareProps) {

    return (
        <div className={style['game-square']} onClick={props.onSquareClick}>
            <GamePiece pieceColor={props.value} text={props.squareNumber?.toString() ?? ''} />
        </div>
    );
}

