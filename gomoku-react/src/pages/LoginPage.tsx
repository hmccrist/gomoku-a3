import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import style from './LoginPage.module.css'
import users from '../data/users.json'
import { UserContext } from '../context/UserContext'

export default function LoginPage() {
    const { login } = useContext(UserContext)
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isCredentialInvalid, setIsCredentialInvalid] = useState(false)

    const handleLogin = () => {
        const user = users.find(
            (user) => user.username === username && user.password === password
        )
        if (user) {
            console.log('Login successful')
            login(username)
            navigate('/')
        } else {
            console.log('Login failed')
            setIsCredentialInvalid(true)
        }
    }

    return (
        <form 
        className={style.loginPage} 
        onSubmit={ (e) => {
            e.preventDefault()
            handleLogin()
            }}
        >
            {isCredentialInvalid && <p className={style.error}>Invalid username or password.</p>}
            <input
                name='username'
                placeholder='Username'
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value)
                    setIsCredentialInvalid(false)
                }}
            />
            <input
                name='password'
                type="password"
                placeholder='Password'
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value)
                    setIsCredentialInvalid(false)
                }}
            />
            <button type='submit' className={style.button}>Login</button>
        </form>
    )
}