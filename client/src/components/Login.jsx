import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {Container, FloatingLabel} from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    async function reRouteRegister(event) {
        event.preventDefault()
        navigate('/register')
    }

    async function reRouteHome(event) {
        event.preventDefault()
        navigate('/')
    }

    async function userLogin(event) {
        event.preventDefault()
        const response = await axios({
            method: 'post',
            url: `http://localhost:4000/user/`,
            data: {
                username: username,
                password: password
            }
        })
        console.log(response.data)
        if (response.data.status === 'OK') {
            reRouteHome(event)
        }
    }

    return (
        <Container className="align-items-center d-flex flex-column" style= {{ height: '100vh' }}> 
            <h1 className="me-5">Login</h1>
            <Form className="w-100" onSubmit={userLogin}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    {/* <Form.Label>Username</Form.Label> */}
                    <FloatingLabel 
                        controlId="floatingInputUsername"
                        label="Username"
                        className="mb-3"
                    >
                    <Form.Control 
                        value={username}
                        type="text" 
                        // id="username"
                        onChange={e => setUsername(e.target.value)}
                        placeholder="Enter Username" 
                        autoComplete="off"
                        required
                    />
                    </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    {/* <Form.Label>Password</Form.Label> */}
                    <FloatingLabel
                        controlId="floatingInputPassword"
                        label="Password"
                    >
                        <Form.Control 
                            value={password}
                            type="password"
                            // id="password"
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Password"
                            autoComplete="off" 
                            required
                        />
                    </FloatingLabel>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button> <br /> <br /> <br />
                <Button variant="secondary" onClick={reRouteRegister}> 
                    Register
                </Button>
            </Form>
        </Container>
    )
}