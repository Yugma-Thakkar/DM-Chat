import React, { useState } from "react"

function Register() {

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [repassword, setRepassword] = useState("")

    async function registerUser(event) {
        event.preventDefault()

        const response = await fetch('http://localhost:4000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                username,
                password,
                repassword
            })
        })

        const data = response.json()
        console.log(data)
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={registerUser}>
                <label htmlFor="email">Email:</label>
                <input 
                    value={email}
                    type="email" 
                    id="email" 
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Email ID" 
                    autoComplete="off"
                />

                <label htmlFor="username">Username:</label>
                <input 
                    value={username}
                    type="text" 
                    id="username" 
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter Username" 
                    autoComplete="off"
                />

                <label htmlFor="password">Password:</label>
                <input 
                    value={password}
                    type="password" 
                    id="password" 
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password" 
                    autoComplete="off"
                />

                <label htmlFor="repassword">Re-enter Password:</label>
                <input 
                value={repassword}
                type="password" 
                id="repassword" 
                onChange={(e) => setRepassword(e.target.value)}
                placeholder="Enter Password again" 
                autoComplete="off"
                />

                <input type="submit" value="Register" />
            </form>
        </div>
    )
}

export default Register