import style from './Header.module.css'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { useContext } from 'react'

export default function Header() {
    const navigate = useNavigate()
    const { user } = useContext(UserContext)

    const getActions = () => {
        if (user) {
            return (
                <h2 onClick={() => navigate('/games')} >Previous Games</h2>
            )
        } else {
            return (
                <h2 onClick={() => navigate('/login')} >Login</h2>
            )
        }
    }

    return (
        <div className={style.header}>
            <div className={style['header-left']} onClick={() => navigate('/')}>
                <h1>
                    Gomoku
                </h1>
            </div>
            <div className={style['header-right']}>
                {getActions()}
            </div>
        </div>
    )
}