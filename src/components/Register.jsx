import React, {useState} from "react"

export default function Register() {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [repassword, setRepassword] = useState('')

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
       const data = response.json()
       console.log(data)
    //    if (data.status === 'OK') {
    //         alert('User registered successfully')
    //    }
    //    else {
    //         alert('User registration failed')
    //    }
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
            </form>
        </div>
    )
}