import { useState } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"
import { useToken } from "../auth/useToken"
export const SignUpPage = () => {
    const [token, setToken] = useToken()

    const [errorMessage, setErrorMessage] = useState('')
    const [emailValue, setEmailValue] = useState("")
    const [passwordValue, setPasswordValue] = useState("")
    const [confirmPasswordValue, setConfirmPasswordValue] = useState("")

    const history = useHistory();

    const onSignupClick = async () => {
        const response = await axios.post('/api/signup', {
            email: emailValue,
            password: passwordValue,
        });
        const { token } = response.data
        setToken(token)
        history.push('/')
    }

    return (
        <div class="content-container">
            <h1>Sign Up</h1>
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
            <input type="password"
                value={confirmPasswordValue}
                onChange={e => setConfirmPasswordValue(e.target.value)}
                placeholder="Confirm your password"></input>
            <hr />
            <button
                disabled={!emailValue | !passwordValue || confirmPasswordValue !== passwordValue}
                onClick={onSignupClick}>Sign up</button>

            <button onClick={() => history.push('/login')}>Log In</button>
        </div >
    )
}