import style from './Game.module.css'

import { SquareProps } from './Square';

export function GamePiece({ pieceColor, text }: { pieceColor: SquareProps['value'], text: string }) {

    // get the right class for the game piece
    function getGamePieceClass() {
        let gamePieceClass = style['game-piece'];
        switch (pieceColor) {
            case 'empty':
                return gamePieceClass + ' ' + style['game-piece-empty'];
            case 'black':
                return gamePieceClass + ' ' + style['game-piece-black'];
            case 'white':
                return gamePieceClass + ' ' + style['game-piece-white'];
        }
    }

    return (
        <div className={getGamePieceClass()}>{text}</div>
    );
}

