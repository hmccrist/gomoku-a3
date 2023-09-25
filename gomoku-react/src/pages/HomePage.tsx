import style from './HomePage.module.css';
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { useContext, useState } from 'react';

export default function HomePage() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [boardSize, setBoardSize] = useState(12);
    
    function handleBoardSizeChange(e: React.ChangeEvent<HTMLInputElement>) {
        const min = 3;
        const max = 20;
        // clamp between 5 and 20
        let value = parseInt(e.target.value);
        if (value < min) {
            value = min;
        }
        else if (value > max) {
            value = max;
        }
        setBoardSize(value);
    }

    return (
        <div className={style.homePage}>
            <div className={style.topRow}>
                <h2>Board Size: </h2>
                <input type="number" id="boardSize" name="boardSize" className={style.input} value={boardSize} onChange={(e) => handleBoardSizeChange(e)} />
            </div>
            <button 
                className={style.button} 
                onClick={() => {
                    if (user) {
                        navigate('/game', { state: { boardSize } })
                    }
                    else {
                        navigate('/login')
                    }
                }}
            >Start Game</button>
        </div>
    )
}

