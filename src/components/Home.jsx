import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
// import '../css/style.css'

export default function Home() {

    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token) {
            localStorage.removeItem('token')
            navigate('/login')
        }
    }, [])

    const [message, setMessage] = useState(``)
    async function sendMessage(event) {
        event.preventDefault()
        const response = await fetch('http://localhost:4000/chat/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message
            })
        })
        const data = await response.json()
        console.log(data)
    }

    return (
        <div>
            <h1 id='heading'>DM-Chat</h1>
            <div className="display">
            </div>
            <form action="">
                <label htmlFor="send-message">Message</label>
                <input 
                value={message}
                type="text"
                id="send-message" 
                onChange={e => setMessage(e.target.value)}
                />
                <button type="submit">Send</button>
                <br /> <br />
                <label htmlFor="room">Room</label>
                <input type="text" name="room" id="room" />
                <button type="submit">Join</button>
            </form>
        </div>
    )
}