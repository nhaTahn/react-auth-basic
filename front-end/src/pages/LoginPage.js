import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"
import { useQueryParams } from '../util/useQueryParams';
import { useToken } from "../auth/useToken"
export const LoginPage = () => {
    const [, setToken] = useToken()

    const [errorMessage, setErrorMessage] = useState('')
    const [emailValue, setEmailValue] = useState("")
    const [passwordValue, setPasswordValue] = useState("")

    const [googleOauthUrl, setGoogleOauthUrl] = useState('');
    const { token: oauthToken } = useQueryParams();
    const history = useHistory();
    useEffect(() => {
        if (oauthToken) { // If there's a token, that means we were just redirected back here from Oauth
            setToken(oauthToken);
            history.push('/');
        }
    }, [oauthToken, setToken, history]);

    useEffect(() => {
        const loadOauthUrl = async () => {
            try {
                const response = await axios.get('/auth/google/url');
                const { url } = response.data;
                setGoogleOauthUrl(url);
            } catch (e) {
                console.log(e);
                setErrorMessage(e.message);
            }
        }

        loadOauthUrl();
    }, []);

    const onLoginClick = async () => {
        try {
            const res = await axios.post('/api/login', {
                email: emailValue,
                password: passwordValue,
            })
            const { token } = res.data
            setToken(token)
            history.push('/')
        } catch (e) {
            console.log(e);
            setErrorMessage(e.message);
        }
    }


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
            <button
                disabled={!googleOauthUrl}
                onClick={() => { window.location.href = googleOauthUrl; }}
            >
                Log in with Google
            </button>
        </div >
    )
}