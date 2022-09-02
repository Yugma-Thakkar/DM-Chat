import React, { useState } from "react"

export default function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    async function userLogin(event) {
        event.preventDefault()

        const response = await fetch('http://localhost:4000/user/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })

        const data = await response.json()

        if (data.user) {
            alert(`${data.user} logged in!`)
        }
        else {
            alert(`Please check your username and password`)
        }

        console.log(data)
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={userLogin}>
                <label htmlFor="username">Username:</label>
                <input
                    value={username}
                    type="text" 
                    id="username" 
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter Username" />

                <label htmlFor="password">password:</label>
                <input 
                value={password}
                type="password" 
                id="password" 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password" />

                <input type="submit" value="Login" />
            </form>
        </div>
    )
}