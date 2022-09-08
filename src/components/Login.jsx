import axios from "axios"
import React, {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function Login() {

    // useEffect(() => {
    //     const token = localStorage.getItem('accessToken')
    //     if (token) {
    //         navigate('/')
    //     }
    // })
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    async function reRouteRegister(event) {
        event.preventDefault()
        navigate('/register')
    }

    async function userLogin(event) {
        event.preventDefault()

        const response = await axios({
            method: 'POST',
            url: 'http://localhost:4000/user/',
            data: {
                username: username,
                password: password
            }
        })
        console.log(response.data)
        
        
        if(response.data.status === 'OK') {
            //store token to localstorage
            localStorage.setItem('accessToken', response.data.accessToken)
            localStorage.setItem('refreshToken', response.data.refreshToken)
            //redirect to home page
            navigate('/')
        }
        else {
            // display error message
            alert('Login failed')
        }
    }
    
    return (
        <div> 
            <h1>Login</h1>
            <form onSubmit={userLogin}>
                <input 
                    value={username}
                    type="text" 
                    id="username" 
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Username"
                    autoComplete="off"
                /> <br /> <br />
                <input
                    value={password}
                    type="password"
                    id="password"
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                    autoComplete="off"
                /> <br /> <br />
                <input type="submit" value="Login" />
                <br /><br /><br /><br />
            </form>
            <button onClick={reRouteRegister}>Register</button>
        </div>
    )
}