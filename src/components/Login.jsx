import React from "react"

export default function Login() {
    return (
        <div>
            <h1>Login</h1>
            <form action="">
                <label htmlFor="username">Username:</label>
                <input
                    type="text" 
                    name="username" 
                    id="username" 
                    placeholder="Enter Username" />

                <label htmlFor="password">password:</label>
                <input type="password" name="password" id="password" placeholder="Enter Password" />

                <input type="submit" value="Login" />
            </form>
        </div>
    )
}