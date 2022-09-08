import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
// import '../css/style.css'

export default function Home() {

    const [accessToken, setAccessToken] = useState('')
    const [refreshToken, setRefreshToken] = useState('')
    const [username, setUsername] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        if(!token) {
            localStorage.removeItem('accessToken')
            navigate('/login')
        }
    }, [])

    const refreshTokens = async () => {
        try {
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:4000/user/refresh',
                data: {
                    token: localStorage.getItem('refreshToken')
                }
            })
            // setAccessToken(response.data.accessToken)
            // setRefreshToken(response.data.refreshToken)
            localStorage.setItem('accessToken', response.data.accessToken)
            localStorage.setItem('refreshToken', response.data.refreshToken)
            return response.data
        }   
        catch (error) {
            console.error(error.message)
        }
    }

    const axiosJWT = axios.create()
    
    axiosJWT.interceptors.request.use(
        async (config) => {
            let currentDate = new Date()
            const decodedToken = jwt_decode(localStorage.getItem('accessToken'))
            if (decodedToken.exp * 1000 < currentDate.getTime()) {
                const data = await refreshTokens()
                config.headers['authorization'] = `Bearer ${data.accessToken}`

            }
            return config
        }, (error) => {
            console.error(error.message)
            return Promise.reject(error)
        }
    )

    // console.log(jwt_decode(localStorage.getItem('accessToken')))

    async function userLogout(event) {
        event.preventDefault()
        const response = await axiosJWT({
            method: 'POST',
            url: 'http://localhost:4000/user/logout',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }, 
            data: {
                token: localStorage.getItem('refreshToken')
            }
        })
        console.log(response)
        if (response.data.status === 'OK') {
            localStorage.removeItem('accessToken')
            navigate('/login')
        }
    }

    async function sendMessage(event) {
        event.preventDefault()
        const response = await axios({
            method: 'POST',
            url: 'http://localhost:4000/user/message',
            data: {
                message: message
            }
        })
        console.log(response.data)
    }

    return (
        <div>
            <h1 id='heading'>DM-Chat</h1>
            <div className="display">
            </div>
            <form onSubmit={sendMessage}>
                <label htmlFor="send-message">Message</label>
                <input 
                value={message}
                type="text"
                id="send-message" 
                onChange={e => setMessage(e.target.value)}
                />
                <input type="submit" value="Send" />
                {/* <br /> <br />
                <label htmlFor="room">Room</label>
                <input type="text" name="room" id="room" />
                <button type="submit">Join</button> */}
            </form>
            <button onClick={userLogout}>Logout</button>
        </div>
    )
}