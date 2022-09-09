import axios from "axios"
import React, {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"
import {Container} from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function Register() {

    const navigate = useNavigate()

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken')
        if (accessToken) {
            navigate('/')
        }
    })
    
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [repassword, setRepassword] = useState('')

    async function reRouteLogin(event) {
        event.preventDefault()
        navigate('/login')
    }

    async function userRegister(event) {
        event.preventDefault()

        const response = await axios({
            method: 'POST',
            url: 'http://localhost:4000/register',
            data: {
                email: email,
                username: username,
                password: password,
                repassword: repassword
            }
        })
       console.log(response.data)
       if (response.data.status === 'OK') {
            //redirect to login page
            navigate('/login')
       }
       else {
            // display error message
            alert('User registration failed')
       }
    }

    return (

        <Container className="align-items-center d-flex" style= {{ height: '100vh' }}>
            <Form className="w-100" onSubmit={userRegister}> 
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        value={email}
                        type="email"
                        placeholder="Enter Email ID"
                        onChange={(event) => setEmail(event.target.value)}
                        autocomplete = "off"
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicUsername"> 
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        value={username}
                        type="text"
                        placeholder="Enter Username"
                        onChange={(event) => setUsername(event.target.value)}
                        autocomplete = "off"
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        value={password}
                        type="password"
                        placeholder="Enter Password"
                        onChange={(event) => setPassword(event.target.value)}
                        autocomplete = "off"
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicRePassword">
                    <Form.Label>Re-Enter Password</Form.Label>
                    <Form.Control
                        value={repassword}
                        type="password"
                        placeholder="Re-Enter Password"
                        onChange={(event) => setRepassword(event.target.value)}
                        autocomplete = "off"
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Register
                </Button> <br /> <br /> <br />
                <Button variant="primary" onClick={reRouteLogin}>
                    Login
                </Button>
            </Form>
        </Container>
    )
}