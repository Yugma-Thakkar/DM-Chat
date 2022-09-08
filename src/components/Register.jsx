import React, {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"

export default function Register() {

    // useEffect(() => {
    //     const token = localStorage.getItem('token')
    //     if (token) {
    //         navigate('/')
    //     }
    // })
    
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [repassword, setRepassword] = useState('')

    const navigate = useNavigate()

    async function reRouteLogin(event) {
        event.preventDefault()
        navigate('/login')
    }

    async function userRegister(event) {
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
                }),
       })
       const data = await response.json()
       console.log(data)
       if (data.status === 'OK') {
            //redirect to login page
            // alert('User registered successfully')
            navigate('/login')
       }
       else {
            // display error message
            alert('User registration failed')
       }
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={userRegister}>
                <input
                    value={email}
                    type="email"
                    id="email"
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email"
                    autoComplete="off"
                /> <br /> <br />
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
                <input
                    value={repassword}
                    type="password"
                    id="repassword"
                    onChange={e => setRepassword(e.target.value)}
                    placeholder="Re-Password"
                    autoComplete="off"
                /> <br /> <br />
                <input type="submit" value="Register" />
                <br /><br /><br /><br />
            </form>
            <button onClick={reRouteLogin}>Log In</button>
        </div>
    )
}