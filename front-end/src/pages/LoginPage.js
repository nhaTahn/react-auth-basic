import { useState } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"
import { useToken } from "../auth/useToken"
export const LoginPage = () => {
    const [token, setToken] = useToken()

    const [errorMessage, setErrorMessage] = useState('')
    const [emailValue, setEmailValue] = useState("")
    const [passwordValue, setPasswordValue] = useState("")

    const onLoginClick = async () => {
        const res = await axios.post('/api/login', {
            email: emailValue,
            password: passwordValue,
        })
        const { token } = res.data
        setToken(token)
        history.push('/')
    }

    const history = useHistory();
    return (
        <div class="content-container">
            <h1>Log In</h1>
            {errorMessage && <div class="fail">{errorMessage}</div>}
            <input
                type="text"
                value={emailValue}
                onChange={e => setEmailValue(e.target.value)}
                placeholder="Enter your Email"></input>
            <input type="password"
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                placeholder="Enter your password"></input>
            <hr />
            <button
                disabled={!emailValue | !passwordValue}
                onClick={onLoginClick}>Log in</button>
            <button
                onClick={() => history.push('/forgot-password')}>Forget your password?</button>
            <button onClick={() => history.push('/signup')}> Don't have account? Sign up</button>
        </div >
    )
}