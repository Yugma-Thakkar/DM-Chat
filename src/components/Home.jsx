import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
// import '../css/style.css'

export default function Home() {

    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        if(!token) {
            localStorage.removeItem('accessToken')
            navigate('/login')
        }
    }, [])

    async function userLogout(event) {
        event.preventDefault()
        const response = await axios({
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

    const [message, setMessage] = useState(``)
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